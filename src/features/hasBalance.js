import { user } from "@tryrolljs/api";
import {
  Button,
  Input,
  Header,
  Result,
  Caption,
} from "@tryrolljs/design-system";
import React from "react";
import { apiClient } from "../api";
import { SessionContext } from "../components/sessionManager";

export default function HasBalance() {
  const session = React.useContext(SessionContext);

  const [inputState, setInputState] = React.useState({
    amount: "",
    symbol: "",
  });

  const [validationError, setValidationError] = React.useState();
  const [error, setError] = React.useState();
  const [response, setResponse] = React.useState();

  const handleSubmit = (e) => {
    setError(undefined);
    setValidationError(undefined);

    let amount = Number(inputState.amount);

    // user must provide a valid number to check balance
    if (isNaN(amount)) {
      setValidationError("please provide a valid number");
      return;
    }

    // pass in the user's userID, the token symbol, and the amount.
    // the amount does not need to be converted. The user input amount can be passed in directly (must be a number type)
    user
      .hasBalance(
        { userId: session.user.userID, symbol: inputState.symbol, amount },
        apiClient
      )
      .then((response_) => setResponse(response_))
      .catch((e) => setError(e));
  };

  return (
    <div style={{ padding: 16 }}>
      <Header>Check if user has amount of a token</Header>
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
          setInputState({
            ...inputState,
            symbol: e.target.value.toUpperCase(),
          })
        }
      />
      {validationError && <Caption color="red">{validationError}</Caption>}
      <br />
      {(response || error) && (
        <Result
          variant={error ? "error" : "success"}
          title={error ? "Something went wrong" : "Successful response"}
          description={
            error ? error.message : response.hasbalance.toString().toUpperCase()
          }
        />
      )}
      <br />
      <Button title="Submit" onPress={handleSubmit} />
    </div>
  );
}
