import React from "react";
import rollAPI from "../api";
import { SessionContext } from "../components/sessionManager";

function ThirdParty({ serviceName, info }) {
  return (
    <div>
      <h4>{serviceName}</h4>
      <p>{`name: ${info.name}`}</p>
      <p>{`username: ${info.username}`}</p>
    </div>
  );
}

function ThirdPartyProfiles() {
  const session = React.useContext(SessionContext);
  const [profiles, setProfiles] = React.useState({ third_parties: {} });

  React.useEffect(() => {
    rollAPI.user
      .getThirdPartyProfiles(session.user.userID)
      .then((profiles) => setProfiles(profiles))
      .catch((err) => console.error(err));
  }, [session.user.userID]);

  return (
    <div className='third-party-container'>
      <h3>Third Party Profiles</h3>
      {Object.keys(profiles.third_parties).map((key, i) => {
        return (
          <ThirdParty
            key={`profile-${i}`}
            serviceName={key}
            info={profiles.third_parties[key]}
          />
        );
      })}
    </div>
  );
}

export default ThirdPartyProfiles;
