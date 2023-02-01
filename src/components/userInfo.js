import { Body, Information, padding } from "@tryrolljs/design-system";
import React from "react";
import { SessionContext } from "./sessionManager";

export default function UserInfo() {
  const session = React.useContext(SessionContext);

  const pic =
    session.user.media && session.user.media[0]
      ? session.user.media[0].link
      : "";

  return (
    <div style={{ maxWidth: "100%", width: 200, padding: 16 }}>
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
