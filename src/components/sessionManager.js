import React from "react";
import rollAPI from "../api";

export const SessionContext = React.createContext({ isLoggedIn: false });

export default function SessionManager({ children }) {
  const [state, setState] = React.useState({
    isLoggedIn: false,
    user: { media: [{}] },
  });

  const handleFail = () => {
    console.log("failed to authenticate");
    setState({ isLoggedIn: false });
  };

  React.useEffect(() => {
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
