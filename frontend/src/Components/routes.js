const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  loginPage: () => ['/', 'login'].join(''),
  chatPage: () => '/',
};

export default routes;
