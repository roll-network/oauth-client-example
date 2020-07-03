import React from "react";
import { SessionContext } from "./sessionManager";

export default function UserInfo() {
  const session = React.useContext(SessionContext);

  const pic =
    session.user.media && session.user.media[0]
      ? session.user.media[0].link
      : "";

  return (
    <div className='user-info-container'>
      <img src={pic} alt='roll-user-profile-pic' className='profile-pic' />
      <div>
        <p>username: {`${session.user.username}`}</p>
        <p>name: {`${session.user.name}`}</p>
      </div>
    </div>
  );
}
