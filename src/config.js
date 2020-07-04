const config = {
  apiURL: "https://api.tryroll.com",
  clientID: "example",
  issuerURL: "https://oauth.tryroll.com/oauth2",
  redirectURL: window.location.origin,
  scopes: ["offline", "openid", "base", "read-tx", "write-tx"],
};

export default config;
