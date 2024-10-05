const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
  loginPage: () => ['/', 'login'].join(''),
  signUpPage: () => ['/', 'signup'].join(''),
  chatPage: () => '/',
  dataPath: () => [apiPath, 'data'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  channelsPath1: (id) => [apiPath, 'channels', id].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  messagesPath1: (id) => [apiPath, 'messages', id].join('/'),
};

export default routes;
