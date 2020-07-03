import React from "react";
import rollAPI from "../api";

export const SessionContext = React.createContext({ isLoggedIn: false });

export default function SessionManager({ children }) {
  const [state, setState] = React.useState({
    isLoggedIn: false,
    user: { media: [{}] },
  });

  // if any authentication fails, update application state as necessary
  const handleFail = () => {
    console.log("failed to authenticate");
    setState({ isLoggedIn: false });
  };

  React.useEffect(() => {
    // get user data with valid authToken
    // update application state as necessary
    const handleSuccess = () => {
      console.log("successfully authenticated");
      rollAPI.user
        .getMe()
        .then((user) => {
          console.log("got user data: ", user);
          setState({ isLoggedIn: true, user });
        })
        .catch((err) => console.error(err));
    };

    // check for the existance of the code parameter in the url.
    // if the code param exists, pass the url into the initializeSession function along
    // with custom success and failure callbacks.
    const handleInitializeSession = () => {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has("code")) {
        rollAPI.authentication.initializeSession(
          window.location.search,
          handleSuccess,
          handleFail
        );
      }
    };

    if (!state.isLoggedIn) {
      // if the user is not logged in, attempt to refresh tokens from cache.
      // if there are no cached tokens, the onFail callback will be invoked.
      rollAPI.authentication.refreshFromCache(
        handleSuccess,
        handleInitializeSession
      );
    }
  }, [state.isLoggedIn]);

  return (
    <SessionContext.Provider value={state}>
      {React.cloneElement(children)}
    </SessionContext.Provider>
  );
}
