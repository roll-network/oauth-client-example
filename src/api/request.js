export default class RollRequest {
  constructor(getAuthToken, apiURL) {
    this.getAuthToken = getAuthToken;
    this.authenticated = this.authenticated.bind(this);
    this.open = this.open.bind(this);
    this.apiURL = apiURL;
  }

  authenticated(endpoint, method) {
    return this.executeRequest(endpoint, {
      method,
      headers: {
        Authorization: this.getAuthToken(),
      },
    });
  }

  open(endpoint, method) {
    return this.executeRequest(endpoint, { method });
  }

  executeRequest(endpoint, options) {
    const url = `${this.apiURL}${endpoint}`;
    console.log(`exectuting request ${options.method} ${url}...`);
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then(async (r) => {
          const body = await r.json();
          if (!r.ok) {
            reject(body);
          } else {
            resolve(body);
          }
        })
        .catch((err) => reject(err));
    });
  }
}
