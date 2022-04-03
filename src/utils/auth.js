const AUTH_CONF = {
  client_id: '<CLIENT_ID_GOES_HERE>',
  scope: 'email'
};

export const auth2Init = () => window.gapi.auth2.init(AUTH_CONF);
