const apiPath = '/api/v1';

type ApiRoutes = {
  loginPath: () => string;
  signUpPath: () => string;
  dataPath: () => string;
  channelsPath: () => string;
  channelsPath1: (id: string | number) => string;
  messagesPath: () => string;
  messagesPath1: (id: string | number) => string;
};

const apiRoutes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  channelsPath1: (id: string | number) => [apiPath, 'channels', id].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  messagesPath1: (id: string | number) => [apiPath, 'messages', id].join('/'),
};

export default apiRoutes;
