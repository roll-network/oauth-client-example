import React from "react";
import Button from "./button";
import rollAPI from "../api";
import { SessionContext } from "./sessionManager";

const Header = () => {
  const session = React.useContext(SessionContext);

  return (
    <div className='header-container'>
      <p>Roll OAUTH Example</p>
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

export default Header;
