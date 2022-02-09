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
  internal(userID, symbol, amount, recipientUsername, message) {
    const form = {
      amount,
      toUser: recipientUsername,
      message,
      type: TRANSFER,
      symbol,
      fromUser: userID,
    }
    const endpoint = `/v3/transactions`;
    return this.request.authenticated(endpoint, "POST", form);
  }
}
