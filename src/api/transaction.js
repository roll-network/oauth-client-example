const TRANSFER = "transfer";

export default class RollTransactionAPI {
  constructor(getAuthToken, request) {
    this.getAuthToken = getAuthToken;
    this.request = request;
  }

  internal(userID, symbol, amount, decimals, recipientUsername, message) {
    const form = {
      amount,
      decimals,
      toUser: recipientUsername,
      message,
      type: TRANSFER,
    };
    const endpoint = `/v1/transactions`;
    return this.request.authenticated(endpoint, "POST", form);
  }
}
