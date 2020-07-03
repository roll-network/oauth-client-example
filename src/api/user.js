export default class RollUserAPI {
  constructor(getAuthToken, request) {
    this.getAuthToken = getAuthToken;
    this.request = request;

    this.getMe = this.getMe.bind(this);
    this.hasBalance = this.hasBalance.bind(this);
    this.getThirdPartyProfiles = this.getThirdPartyProfiles.bind(this);
  }

  // retrieve user data based on authToken
  getMe() {
    return this.request.authenticated("/v2/users/session", "GET");
  }

  // check whether or not a user has a balance of a particular token. resolves to { hasbalance: boolean }
  hasBalance(userID, symbol, amount) {
    return this.request.authenticated(
      `/v1/users/${userID}/hasbalance/${symbol}/${amount}`,
      "GET"
    );
  }

  // get information on which third party applications a user has connected to their roll account
  getThirdPartyProfiles(userID) {
    return this.request.authenticated(
      `/v1/users/${userID}/profile/thirdparties`,
      "GET"
    );
  }
}
