import { Body, CircleImg, Information } from "@tryrolljs/design-system";
import React from "react";
import { SessionContext } from "./sessionManager";

export default function UserInfo() {
  const session = React.useContext(SessionContext);

  const userImage =
    session.user.media && session.user.media[0]
      ? session.user.media[0].link
      : undefined;

  return (
    <div style={{ maxWidth: "100%", width: 200, padding: 16 }}>
      <CircleImg uri={userImage} />
      <br />
      <Information>
        <Information.Item
          key="username"
          label="Username"
          value={<Body>{session.user.username}</Body>}
        />
        <Information.Item
          key="name"
          label="Name"
          value={<Body>{session.user.name}</Body>}
        />
      </Information>
    </div>
  );
}
