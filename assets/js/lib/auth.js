// @flow
import auth0 from 'auth0-js';

const webAuth = new auth0.WebAuth({
  domain: process.env.AUTH0_BASEURL,
  clientID: process.env.AUTH0_APP_ID,
  redirectUri: `${window.location.protocol}//${window.location.host}/login`,
  responseType: 'token',
  scope: 'openid email'
});

export function login() {
  webAuth.authorize();
}

export function logout() {
  webAuth.logout();
}

export function addUser(hash: string) {
  return new Promise((resolve, reject) => {
    webAuth.parseHash(hash, (err, authResult) => {
      if (err) {
        reject(err);
      }

      fetch('/api/public/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: authResult.idToken
        })
      })
        .then(response => {
          if (response.ok) {
            localStorage.setItem('idToken', authResult.idToken);
            localStorage.setItem('accessToken', authResult.accessToken);
            return response.json();
          }
          return Promise.reject(response.statusText);
        })
        .then(({ user, watchlist }) => {
          resolve({
            user,
            watchlist,
            accessToken: authResult.accessToken,
            idToken: authResult.idToken
          });
        })
        .catch(message => {
          reject(message);
        });
    });
  });
}

export function getUserInfo(idToken: string) {
  return fetch('/api/public/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: idToken
    })
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response.statusText);
  });
}

export function getPicture(accessToken: string): Promise<string> {
  return new Promise((resolve, reject) => {
    webAuth.client.userInfo(accessToken, (err, user) => {
      if (!err) {
        resolve(user.picture);
      } else {
        reject(err);
      }
    });
  });
}
