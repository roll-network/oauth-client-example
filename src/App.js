import React from "react";
import { TryrollProvider, injectFonts } from "@tryrolljs/design-system";
import SessionManager, { useSession } from "@tryrolljs/session-manager";
import TopNavigation from "./components/topNavigation";
import HasBalance from "./features/hasBalance";
import UserInfo from "./components/userInfo";
import ThirdPartyProfiles from "./features/thirdPartyProfiles";
import Transfer from "./features/transfer";
import LoggedOut from "./components/loggedOut";
import { apiClient, authSdk } from "./api";

injectFonts();

function App() {
  return (
    <TryrollProvider>
      <SessionManager apiClient={apiClient} authSdk={authSdk}>
        <Entrypoint />
      </SessionManager>
    </TryrollProvider>
  );
}

const Entrypoint = () => {
  const session = useSession();

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
