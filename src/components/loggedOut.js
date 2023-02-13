import { Header } from "@tryrolljs/design-system";

const LoggedOut = () => (
  <div style={{ padding: 24, textAlign: "center" }}>
    <Header>
      You are not logged in.
      <br />
      Use the button in the top right corner to log in.
    </Header>
  </div>
);

export default LoggedOut;
