export default class RollUserAPI {
  constructor(getAuthToken, request) {
    this.getAuthToken = getAuthToken;
    this.request = request;

    this.getMe = this.getMe.bind(this);
    this.hasBalance = this.hasBalance.bind(this);
    this.getThirdPartyProfiles = this.getThirdPartyProfiles.bind(this);
  }

  getMe() {
    return this.request.authenticated("/v2/users/session", "GET");
  }

  hasBalance(userID, symbol, amount) {
    return this.request.authenticated(
      `/v1/users/${userID}/hasbalance/${symbol}/${amount}`,
      "GET"
    );
  }

  getThirdPartyProfiles(userID) {
    return this.request.authenticated(
      `/v1/users/${userID}/profile/thirdparties`,
      "GET"
    );
  }
}
