import RollAuthentication from "./authentication";
import RollUserAPI from "./user";
import RollRequest from "./request";
import RollTransactionAPI from "./transaction";

import config from "../config";

const OAUTH_KEY = "oauthTokens";

const cacheOauthTokens = (oauthTokens) => {
  localStorage.setItem(OAUTH_KEY, oauthTokens);
};

const getCachedOauthTokens = () => {
  return localStorage.getItem(OAUTH_KEY);
};

const clearCachedOauthTokens = () => {
  localStorage.removeItem(OAUTH_KEY);
};

class RollAPI {
  constructor({ apiURL, oauthConfig, authCacheConfig }) {
    this.authentication = new RollAuthentication(oauthConfig, authCacheConfig);
    const request = new RollRequest(this.authentication.getAuthToken, apiURL);
    this.user = new RollUserAPI(this.authentication.getAuthToken, request);
    this.transaction = new RollTransactionAPI(
      this.authentication.getAuthToken,
      request
    );
  }
}

const oauthConfig = {
  clientID: config.clientID,
  issuerURL: config.issuerURL,
  redirectURL: config.redirectURL,
  scopes: config.scopes,
};

const authCacheConfig = {
  setCache: cacheOauthTokens,
  getCache: getCachedOauthTokens,
  clearCache: clearCachedOauthTokens,
};
const rollAPI = new RollAPI({
  apiURL: config.apiURL,
  oauthConfig: oauthConfig,
  authCacheConfig,
});

export default rollAPI;
