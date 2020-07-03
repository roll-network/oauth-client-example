import moment from "moment";
import { toQueryParams } from "./helpers";

const AUTHORIZATION_GRANT = "authorization_code";
const REFRESH_GRANT = "refresh_token";

class RollAuthentication {
  constructor(oauthConfig, authCacheConfig) {
    this.clientID = oauthConfig.clientID;
    this.issuerURL = oauthConfig.issuerURL;
    this.redirectURL = oauthConfig.redirectURL;
    this.scopes = oauthConfig.scopes;
    this.setCache = authCacheConfig.setCache;
    this.getCache = authCacheConfig.getCache;
    this.clearCache = authCacheConfig.clearCache;
    this.authToken = null;
    this.expiresIn = null;
    this.refreshToken = null;
    this.idToken = null;
    this.lastRefresh = null;
    this.exchangeCode = null;

    this.getAuthToken = this.getAuthToken.bind(this);
    this.refreshFromCache = this.refreshFromCache.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.getLoginURL = this.getLoginURL.bind(this);
    this.getLogoutURL = this.getLogoutURL.bind(this);
    this.handleTokenResponse = this.handleTokenResponse.bind(this);
    this.handleCacheTokens = this.handleCacheTokens.bind(this);
    this.initializeSession = this.initializeSession.bind(this);
  }

  getAuthToken() {
    return this.authToken;
  }

  refreshFromCache(onSuccess, onFail) {
    const cached = this.getCache();
    if (!cached) {
      onFail();
      return;
    }
    const oauthTokens = JSON.parse(cached);
    this.authToken = oauthTokens.authToken;
    this.expiresIn = oauthTokens.expiresIn;
    this.refreshToken = oauthTokens.refreshToken;
    this.idToken = oauthTokens.idToken;
    this.exchangeCode = oauthTokens.exchangeCode;
    this.handleRefresh(onSuccess, onFail);
  }

  handleRefresh(onSuccess, onFail) {
    // the code parameter found in the callback url is required to refresh an authToken
    // the refresh token is required to refresh an authToken
    if (!this.exchangeCode || !this.refreshToken) {
      console.log("missing exchangeCode and refreshToken, aborting refresh");
      return;
    }

    console.log("attempting to refresh tokens...");

    // send a request to refresh the authToken with relevant parameters sent as query params
    fetch(`${this.issuerURL}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: toQueryParams({
        code: this.exchangeCode,
        refresh_token: this.refreshToken,
        grant_type: REFRESH_GRANT,
        redirect_uri: this.redirectUrl,
        client_id: this.clientID,
      }),
    })
      .then((r) => r.json())
      .then((oauthTokens) => {
        // use the handleTokenResponse function to store relevant params, check for errors, and handle success/error callbacks
        this.handleTokenResponse(oauthTokens, onSuccess, (e) => {
          this.clearCache(); // if the there is a non successful response, we must clear any cached token values.
          onFail(e); // invoke on fail function passed in by class consumer
        });
      })
      .catch((err) => onFail(err));
  }

  // build login url with state and nonce.
  // the class consumer should navigate to this URL using their own implementation.
  getLoginURL() {
    const params = {
      client_id: this.clientID,
      redirect_uri: this.redirectURL,
      scopes: this.scopes,
      response_type: "code",
      response_mode: "form_post",
      state: crypto.getRandomValues(new Uint8Array(4)).join(""),
      nonce: crypto.getRandomValues(new Uint8Array(4)).join(""),
    };
    return `${this.issuerURL}/auth?${toQueryParams(params)}`;
  }

  // build logout url with redirect uri, state, and idToken
  // the class consumer should navigate to this URL using their own implementation.
  getLogoutURL() {
    this.clearCache();
    const params = {
      post_logout_redirect_uri: this.redirectURL,
      state: crypto.getRandomValues(new Uint8Array(4)).join(""),
      id_token_hint: this.idToken,
    };
    return `${this.issuerURL}/sessions/logout?${toQueryParams(params)}`;
  }

  // pass in the callback url containing the ?code= param
  initializeSession(url, onSuccess, onFail) {
    const urlParams = new URLSearchParams(window.location.search);

    // if user already has an authToken, you are already logged in. Invoke the onSuccess function.
    if (this.authToken) {
      onSuccess();
      return;
    }

    // validate that url contains the code param
    if (!urlParams.has("code")) {
      onSuccess("url does not contain the code parameter");
    }

    // save exchange code
    this.exchangeCode = urlParams.get("code");

    fetch(`${this.issuerURL}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: toQueryParams({
        code: this.exchangeCode,
        grant_type: AUTHORIZATION_GRANT,
        redirect_uri: this.redirectURL,
        client_id: this.clientID,
      }),
    })
      .then((response) => response.json())
      .then(
        (oauthTokens) =>
          this.handleTokenResponse(oauthTokens, onSuccess, onFail) // save relevant params, handle errors, and invoke custom success/error callbacks
      )
      .catch((err) => onFail(err));
  }

  // common function to handle errors and map values from oauth authentication endpoints to the correct class values.
  // invokes success/error callbacks
  // sets timestamps every time user is authenticated
  handleTokenResponse = (oauthTokens, onSuccess, onFail) => {
    if (oauthTokens.error) {
      onFail(oauthTokens);
      return;
    } else {
      this.authToken = `Bearer ${oauthTokens.access_token}`;
      this.expiresIn = oauthTokens.expires_in;
      this.refreshToken = oauthTokens.refresh_token;
      this.idToken = oauthTokens.id_token;
      this.lastRefresh = moment().toISOString();
      this.handleCacheTokens();
      onSuccess(oauthTokens);
    }
  };

  // serialize tokens and pass into custom caching function supplied by class consumer
  handleCacheTokens() {
    this.setCache(
      JSON.stringify({
        lastRefresh: this.lastRefresh,
        authToken: this.authToken,
        expiresIn: this.expiresIn,
        refreshToken: this.refreshToken,
        idToken: this.idToken,
        exchangeCode: this.exchangeCode,
      })
    );
  }
}

export default RollAuthentication;
