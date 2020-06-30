import React from "react";
import Header from "./components/header";
import SessionManager, { SessionContext } from "./components/sessionManager";
import HasBalance from "./features/hasBalance";
import UserInfo from "./components/userInfo";
import ThirdPartyProfiles from "./features/thirdPartyProfiles";

import "./App.css";

function App() {
  return (
    <SessionManager>
      <Content />
    </SessionManager>
  );
}

const Content = () => {
  const session = React.useContext(SessionContext);

  return (
    <div className='App'>
      <Header />
      {session.isLoggedIn ? (
        <>
          <UserInfo />
          <HasBalance />
          <ThirdPartyProfiles />
        </>
      ) : null}
    </div>
  );
};

export default App;
