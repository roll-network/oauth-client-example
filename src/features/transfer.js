import React from "react";
import { SessionContext } from "../components/sessionManager";
import Button from "../components/button";
import rollAPI from "../api";

// IMPORTANT - currently all roll production tokens have 4 decimals. Do not assume this in production. Use the decimal value of a particular token to perform any conversions.
const TOKEN_DECIMALS = 4;

export default function Transfer() {
  const session = React.useContext(SessionContext);

  const [inputs, setInputs] = React.useState({
    symbol: "",
    amount: "",
    username: "",
  });

  const [response, setResponse] = React.useState({ success: "", error: "" });

  const updateInputs = (value, id) => {
    setInputs({
      ...inputs,
      [id]: value,
    });
  };

  const handleSend = async () => {
    let n = Number(inputs.amount);

    // user must provide a valid number
    if (isNaN(n)) {
      setResponse({ ...response, error: "please provide a valid amount" });
      return;
    }

    // perform basic validation
    if (n === 0) {
      setResponse({ ...response, error: "amount must be greater than 0" });
      return;
    }

    if (!inputs.symbol) {
      setResponse({ ...response, error: "please provide a symbol" });
      return;
    }

    if (!inputs.username) {
      setResponse({ ...response, error: "please provide a username" });
      return;
    }

    // multiply the user input number by 10^TOKEN_DECIMALS. round the result to account for potential JS floating point error
    // n = Math.round(n * 10 ** TOKEN_DECIMALS);

    try {
      // pass in the user's userID, the token symbol, the converted amount to be sent, the token decimals, and the recipient username
      // this will perform an internal transaction on roll
      const resp = await rollAPI.transaction.internal(
        session.user.userID,
        inputs.symbol,
        n,
        inputs.username,
        "this was a third party transfer"
      );

      console.log("transfer response: ", resp);

      setResponse({
        success: `Successfully transfered ${resp.floatAmount} ${resp.token.symbol}`,
        error: "",
      });
    } catch (err) {
      setResponse({ success: "", error: err.message });
    }
  };

  return (
    <div className='transfer-container'>
      <h3>Transfers</h3>
      <input
        placeholder='amount'
        value={inputs.amount}
        onChange={(e) => updateInputs(e.target.value, "amount")}
      />
      <input
        placeholder='symbol'
        value={inputs.symbol}
        onChange={(e) => updateInputs(e.target.value.toUpperCase(), "symbol")}
      />
      <input
        placeholder='recipient username'
        value={inputs.username}
        onChange={(e) => updateInputs(e.target.value, "username")}
      />
      <Button onClick={handleSend}>Send</Button>
      <p>{response.error || response.success}</p>
    </div>
  );
}
