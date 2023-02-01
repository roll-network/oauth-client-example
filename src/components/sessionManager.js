import { user as userAPI } from "@tryrolljs/api";
import React from "react";
import { authSdk, apiClient } from "../api";

export const SessionContext = React.createContext({});

export default function SessionManager({ children }) {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    // get user data with valid authToken
    // update application state as necessary
    const loadUserData = async () => {
      try {
        const user = await userAPI.getMe(apiClient);
        setUser(user);
      } catch (e) {
        console.error(e);
      }
    };

    // check for the existance of the code parameter in the url.
    // if the code param exists, pass the url into the makeSession function along
    // with custom success and failure callbacks.
    const initializeNewSession = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const oauthCode = urlParams.get("code");
        if (oauthCode) {
          await authSdk.makeSession(oauthCode);
          await loadUserData();
        }
      } catch (e) {
        setUser(undefined);
      }
    };

    // if the user is not logged in, attempt to refresh tokens from cache.
    // if there are no cached tokens, the onFail callback will be invoked.
    const initialize = async () => {
      try {
        await authSdk.restoreFromCache();
        await loadUserData();
      } catch (e) {
        await initializeNewSession();
      }
    };

    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!user]);

  const logIn = React.useCallback(() => {
    window.location.href = authSdk.getLogInUrl();
  }, []);

  const logOut = React.useCallback(async () => {
    window.location.href = authSdk.getLogOutUrl();
    await authSdk.clear();
  }, []);

  return (
    <SessionContext.Provider value={{ user, logIn, logOut }}>
      {React.cloneElement(children)}
    </SessionContext.Provider>
  );
}
