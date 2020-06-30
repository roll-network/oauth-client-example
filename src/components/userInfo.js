import React from "react";
import { SessionContext } from "./sessionManager";

export default function UserInfo() {
  const session = React.useContext(SessionContext);

  return (
    <div className='user-info-container'>
      <img
        src={session.user.media[0].link}
        alt='roll-user-profile-pic'
        className='profile-pic'
      />
      <div>
        <p>username: {`${session.user.username}`}</p>
        <p>name: {`${session.user.name}`}</p>
      </div>
    </div>
  );
}
