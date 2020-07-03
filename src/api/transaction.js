const TRANSFER = "transfer";

export default class RollTransactionAPI {
  constructor(getAuthToken, request) {
    this.getAuthToken = getAuthToken;
    this.request = request;
  }

  // send social money to a roll user
  // amount must be converted using token decimals.
  // Example:
  // decimals = 4
  // user input amount = 1.00
  // converted amount = 10000
  internal(userID, symbol, amount, decimals, recipientUsername, message) {
    const form = {
      amount,
      decimals,
      toUser: recipientUsername,
      message,
      type: TRANSFER,
      token: symbol,
    };
    const endpoint = `/v1/transactions`;
    return this.request.authenticated(endpoint, "POST", form);
  }
}
