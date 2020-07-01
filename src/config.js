const config = {
  apiURL: "https://api.develop.tryroll.com",
  clientID: "example",
  issuerURL: "https://oauth.develop.tryroll.com/oauth2",
  redirectURL: window.location.origin,
  scopes: ["offline", "openid", "base", "read-tx", "write-tx"],
};

export default config;
