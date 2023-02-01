import { user } from "@tryrolljs/api";
import { Body, Header, Result, SubHeader } from "@tryrolljs/design-system";
import React from "react";
import { apiClient } from "../api";
import { SessionContext } from "../components/sessionManager";

function ThirdParty({ serviceName, info }) {
  return (
    <div>
      <SubHeader>{serviceName}</SubHeader>
      <Body>{`name: ${info.name}`}</Body>
      <Body>{`username: ${info.username}`}</Body>
    </div>
  );
}

function ThirdPartyProfiles() {
  const session = React.useContext(SessionContext);
  const [profiles, setProfiles] = React.useState({ third_parties: {} });
  const [error, setError] = React.useState();

  // pass in the user's userID to get information on which third party applications have been connected to their roll account
  React.useEffect(() => {
    user
      .getThridPartyProfile({ userId: session.user.userID }, apiClient)
      .then((profiles) => setProfiles(profiles))
      .catch((e) => {
        console.log(e);
        setError(e);
      });
  }, [session.user.userID]);

  return (
    <div style={{ padding: 16 }}>
      <Header>Third Party Profiles</Header>
      {error && (
        <Result
          variant="error"
          title="Something went wrong"
          description={error.message}
        />
      )}
      {Object.keys(profiles.third_parties).map((key, i) => {
        return (
          <ThirdParty
            key={key}
            serviceName={key}
            info={profiles.third_parties[key]}
          />
        );
      })}
    </div>
  );
}

export default ThirdPartyProfiles;
