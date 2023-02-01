import React from "react";
import {
  Banner,
  Button,
  LargeHeader,
  padding,
  Surface,
} from "@tryrolljs/design-system";
import { SessionContext } from "./sessionManager";
import config from "../config";

const isProduction = (url) => url.indexOf("api.tryroll.com") !== -1;

const TopNavigation = () => {
  const session = React.useContext(SessionContext);

  return (
    <React.Fragment>
      {isProduction(config.apiURL) && (
        <Banner
          variant="warning"
          title="You are currently interacting with a production environment. Use at your
      own risk."
        />
      )}
      <Surface
        style={[
          {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          },
          padding.p24,
        ]}
      >
        <LargeHeader>Roll OAUTH Example</LargeHeader>
        {session.user ? (
          <Button onPress={session.logOut} title="Log Out" />
        ) : (
          <Button onPress={session.logIn} title="Log In" />
        )}
      </Surface>
    </React.Fragment>
  );
};

export default TopNavigation;
