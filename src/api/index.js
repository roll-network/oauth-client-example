import RollAuthentication from "./authentication";
import RollUserAPI from "./user";
import RollRequest from "./request";

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
  constructor(oauthConfig, authCacheConfig) {
    this.authentication = new RollAuthentication(oauthConfig, authCacheConfig);
    const request = new RollRequest(
      this.authentication.getAuthToken,
      "https://api.sandbox.tryroll.com"
    );
    this.user = new RollUserAPI(this.authentication.getAuthToken, request);
  }
}

const clientID = "example";
const issuerURL = "https://oauth.sandbox.tryroll.com/oauth2";
const redirectURL = window.location.origin;
const scopes = ["offline", "openid", "base", "read-tx", "write-tx"];

const oauthConfig = { clientID, issuerURL, redirectURL, scopes };

const authCacheConfig = {
  setCache: cacheOauthTokens,
  getCache: getCachedOauthTokens,
  clearCache: clearCachedOauthTokens,
};
const rollAPI = new RollAPI(oauthConfig, authCacheConfig);

export default rollAPI;
