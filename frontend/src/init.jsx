import React from 'react';
import { io } from 'socket.io-client';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import filter from 'leo-profanity';
import App from './App';
import store from './Components/store';
import resources from './locales/index.js';
import ApiContext from './hooks/apiContext';
import FilterProvider from './contexts/filterContext';
import SocketContext from './hooks/useSocket';
import { addChannel, removeChannel, updateChannel } from './slices/apiSlece';
import { addMessage, removeMessagesByChannelId } from './slices/messagesSlice';

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
  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload.id));
    store.dispatch(removeMessagesByChannelId(payload.id));
  });
  socket.on('renameChannel', (payload) => store.dispatch(updateChannel({ id: payload.id, changes: { name: payload.name } })));

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <ReduxProvider store={store}>
          <SocketContext.Provider value={socket}>
            <ApiContext.Provider value={null}>
              <FilterProvider>
                <I18nextProvider i18n={i18n}>
                  <App />
                </I18nextProvider>
              </FilterProvider>
            </ApiContext.Provider>
          </SocketContext.Provider>
        </ReduxProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
