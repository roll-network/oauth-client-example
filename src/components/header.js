import React from "react";
import Button from "./button";
import rollAPI from "../api";
import { SessionContext } from "./sessionManager";
import config from "../config";

const isProduction = (url) => url.indexOf("api.tryroll.com") !== -1;

const Header = () => {
  const session = React.useContext(SessionContext);

  return (
    <div className='header-container'>
      <h3>Roll OAUTH Example</h3>
      {isProduction(config.apiURL) && <Warning />}
      {session.isLoggedIn ? <LogoutButton /> : <LoginButton />}
    </div>
  );
};

const LogoutButton = () => {
  return (
    <Button
      onClick={() => {
        const url = rollAPI.authentication.getLogoutURL();
        console.log(url);
        window.location.href = url;
      }}>
      Log Out
    </Button>
  );
};

const LoginButton = () => {
  return (
    <Button
      onClick={() => {
        const url = rollAPI.authentication.getLoginURL();
        console.log(url);
        window.location.href = url;
      }}>
      Log In
    </Button>
  );
};

const Warning = () => {
  return (
    <div className='warning-container'>
      <p>
        You are currently interacting with a production environment. Use at your
        own risk.
      </p>
    </div>
  );
};

export default Header;
