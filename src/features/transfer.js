import React from "react";
import {
  Button,
  Caption,
  Header,
  Input,
  Result,
} from "@tryrolljs/design-system";
import { transaction } from "@tryrolljs/api";
import { SessionContext } from "../components/sessionManager";
import { apiClient } from "../api";

// IMPORTANT - currently all roll production tokens have 4 decimals. Do not assume this in production. Use the decimal value of a particular token to perform any conversions.
// const TOKEN_DECIMALS = 4;

export default function Transfer() {
  const session = React.useContext(SessionContext);

  const [inputState, setInputState] = React.useState({
    symbol: "",
    amount: "",
    username: "",
  });

  const [validationError, setValidationError] = React.useState();
  const [response, setResponse] = React.useState();
  const [error, setError] = React.useState();

  const handleSend = async () => {
    let amount = Number(inputState.amount);

    // user must provide a valid number
    if (isNaN(amount)) {
      setValidationError("please provide a valid amount");
      return;
    }

    // perform basic validation
    if (amount === 0) {
      setValidationError("amount must be greater than 0");
      return;
    }

    if (!inputState.symbol) {
      setValidationError("please provide a symbol");
      return;
    }

    if (!inputState.username) {
      setValidationError("please provide a username");
      return;
    }

    // multiply the user input number by 10^TOKEN_DECIMALS. round the result to account for potential JS floating point error
    // n = Math.round(n * 10 ** TOKEN_DECIMALS);

    try {
      // pass in the user's userID, the token symbol, the converted amount to be sent, the token decimals, and the recipient username
      // this will perform an internal transaction on roll
      const response_ = await transaction.send(
        {
          fromUserId: session.user.userID,
          symbol: inputState.symbol,
          amount,
          toUsername: inputState.username,
          message: "This was a third party transfer",
        },
        apiClient
      );

      setResponse(response_);
    } catch (e) {
      setError(e);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <Header>Transfers</Header>
      <br />
      <br />
      <Input
        placeholder="Amount"
        value={inputState.amount}
        onChange={(e) =>
          setInputState({ ...inputState, amount: e.target.value })
        }
      />
      <br />
      <Input
        placeholder="Symbol"
        value={inputState.symbol}
        onChange={(e) =>
          setInputState({ ...inputState, symbol: e.target.value.toUpperCase() })
        }
      />
      <br />
      <Input
        placeholder="Recipient Username"
        value={inputState.username}
        onChange={(e) =>
          setInputState({ ...inputState, username: e.target.value })
        }
      />
      {validationError && <Caption color="red">{validationError}</Caption>}
      <br />
      {(response || error) && (
        <Result
          variant={error ? "error" : "success"}
          title={error ? "Something went wrong" : "Successful response"}
          description={
            error
              ? error.message
              : `Successfully transfered ${response.floatAmount} ${response.token.symbol}`
          }
        />
      )}
      <br />
      <Button title="Send" onPress={handleSend} />
    </div>
  );
}
