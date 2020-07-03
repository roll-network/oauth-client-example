import RollAuthentication from "./authentication";
import RollUserAPI from "./user";
import RollRequest from "./request";
import RollTransactionAPI from "./transaction";
import config from "../config";

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

const OAUTH_KEY = "oauthTokens";

// Implement custom functions to cache tokens between sessions
const cacheOauthTokens = (oauthTokens) => {
  localStorage.setItem(OAUTH_KEY, oauthTokens);
};

const getCachedOauthTokens = () => {
  return localStorage.getItem(OAUTH_KEY);
};

const clearCachedOauthTokens = () => {
  localStorage.removeItem(OAUTH_KEY);
};

// update the oauth configuration to log in with a different client
const oauthConfig = {
  clientID: config.clientID,
  issuerURL: config.issuerURL,
  redirectURL: config.redirectURL,
  scopes: config.scopes,
};

// add custom caching implementation to store tokens and refresh user sessions
const authCacheConfig = {
  setCache: cacheOauthTokens,
  getCache: getCachedOauthTokens,
  clearCache: clearCachedOauthTokens,
};

// instantiate RollAPI class with configuration
const rollAPI = new RollAPI({
  apiURL: config.apiURL,
  oauthConfig: oauthConfig,
  authCacheConfig,
});

export default rollAPI;
