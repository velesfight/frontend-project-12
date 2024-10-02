
import React from 'react';
 import  { addChannel, removeChannel, updateChannel } from './slices/apiSlece'
import ApiContext  from './contexts/apiContext';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './App';
import resources from './locales/index.js';
import { Provider } from 'react-redux';
import store from './Components/store';
import filter from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
//import { fetchData } from './slices/apiSlece';
import { addMessage } from './slices/messagesSlice';
import { io } from 'socket.io-client';
import SocketContext from './contexts/useSocket';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });
    
    filter.add(filter.getDictionary('ru'));
    filter.add(filter.getDictionary('en'));


  
const rollbarConfig = {
  accessToken: process.env.POST_CLIENT_ITEM_ACCESS_TOKEN,
  environment: 'production',
};

  
    const socket = io();
    socket.on('newMessage', (payload) => store.dispatch(addMessage(payload)));
    socket.on('newChannel', (payload) => store.dispatch(addChannel(payload)));
    socket.on('removeChannel', (payload) => store.dispatch(removeChannel(payload.id)));
    socket.on('renameChannel', (payload) => store.dispatch(updateChannel({ id: payload.id, changes: { name: payload.name } })))

  return (
       <RollbarProvider config={rollbarConfig}>
       <ErrorBoundary>
    <Provider store={store}>
    <SocketContext.Provider value={socket}>
    <ApiContext.Provider value={null}>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
            </ApiContext.Provider>
            </SocketContext.Provider>
        </Provider>
        </ErrorBoundary>
        </RollbarProvider>
    );
};


export default init;