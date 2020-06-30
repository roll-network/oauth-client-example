const config = {
  apiURL: "https://api.sandbox.tryroll.com",
  clientID: "example",
  issuerURL: "https://oauth.sandbox.tryroll.com/oauth2",
  redirectURL: window.location.origin,
  scopes: ["offline", "openid", "base", "read-tx", "write-tx"],
};

export default config;
