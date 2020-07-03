This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Change Oauth Client Configuration

Modify the values in `src/config.js` to connect to your applications OAUTH client.

## Authentication example

Check the `src/api/authentication file` for an example of authentication with Roll

## Session Manager

the Session manager component found in `src/components/sessionManager` provides an example of initializing a roll session and refreshing authTokens with the RollAPI class example.

## Features

The feature folder contains examples of interacting with different Roll endpoints.

- user to user transactions (`transfer.js`)
- check user balance (`hasBalance.js`)
- check third party profiles (`thirdPartyProfiles.js`)
