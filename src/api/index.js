import { auth } from "@tryrolljs/sdk";
import Client from "@tryrolljs/api-client";
import config from "../config";

const authSdk = new auth.AuthSDK(
  {
    clientId: config.clientID,
    issuerUrl: config.issuerURL,
    redirectUrl: config.redirectURL,
    logoutRedirectUrl: config.redirectURL,
    scopes: config.scopes,
  },
  localStorage
);

const apiClient = new Client({ baseUrl: config.apiURL }, authSdk);

export { apiClient, authSdk };
