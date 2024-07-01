const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  loginPage: () => ['/', 'login'].join(''),
  chatPage: () => '/',
  signUpPath: () => [apiPath, 'signup'].join('/'),
  signUpPage: () => ['/', 'signup'].join(''),
};

export default routes;
