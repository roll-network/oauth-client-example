import React from "react";
import { TryrollProvider, injectFonts } from "@tryrolljs/design-system";
import TopNavigation from "./components/topNavigation";
import SessionManager, { SessionContext } from "./components/sessionManager";
import HasBalance from "./features/hasBalance";
import UserInfo from "./components/userInfo";
import ThirdPartyProfiles from "./features/thirdPartyProfiles";
import Transfer from "./features/transfer";
import LoggedOut from "./components/loggedOut";

injectFonts();

function App() {
  return (
    <TryrollProvider>
      <SessionManager>
        <Entrypoint />
      </SessionManager>
    </TryrollProvider>
  );
}

const Entrypoint = () => {
  const session = React.useContext(SessionContext);

  return (
    <>
      <TopNavigation />
      {session.user ? (
        <>
          <UserInfo />
          <HasBalance />
          <ThirdPartyProfiles />
          <Transfer />
        </>
      ) : (
        <LoggedOut />
      )}
    </>
  );
};

export default App;
