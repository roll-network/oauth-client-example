import { auth } from "@tryrolljs/sdk";
import { client } from "@tryrolljs/api";
import config from "../config";

const authSdkConfig = {
  clientId: config.clientID,
  issuerUrl: config.issuerURL,
  redirectUrl: config.redirectURL,
  logoutRedirectUrl: config.redirectURL,
  scopes: config.scopes,
};

const authSdk = new auth.AuthSDK(authSdkConfig, localStorage);

const apiClientConfig = {
  getApiUrl: () => config.apiURL,
  getAuthorization: () => {
    const accessToken = authSdk.getAccessToken();
    return accessToken ? `Bearer ${accessToken}` : undefined;
  },
  getAuthorizationExpired: authSdk.isTokenExpired,
};

const apiClientParsers = {
  error: (response) => {
    if (typeof response.data === "object") {
      return {
        message: response.data.message,
        details: response.data.details || "",
        errorCode: response.data.errorCode || 0,
        status: response.status,
      };
    }

    return { message: response.data, status: response.status };
  },
};

const apiClientHandlers = {
  refresh: authSdk.refreshTokens,
};

const apiClient = new client.Client(
  apiClientConfig,
  apiClientParsers,
  apiClientHandlers
);

export { apiClient, authSdk };
