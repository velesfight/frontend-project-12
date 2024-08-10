const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
  loginPage: () => ['/', 'login'].join(''),
  signUpPage: () => ['/', 'signup'].join(''),
  chatPage: () => '/',
  dataPath: () => [apiPath, 'data'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  
};

export default routes;
