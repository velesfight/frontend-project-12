
import React from 'react';
import io from 'socket.io-client';
import { addChannel, removeChannel, updateChannel } from './slices/channelsSlice'
import ApiContext  from './contexts/ApiContext';
import { addMessage } from './slices/messagesSlice';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './App';
import ru from './locales/index.js';
import channelsReducer from './slices/channelsSlice';
import messagesReducer from './slices/messagesSlice'
import modalSliceReducer from './slices/uiSlisec';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources: { ru },
      fallbackLng: 'ru',
    });
  

    const store = configureStore({
      reducer: {
        channels: channelsReducer,
        messages: messagesReducer,
        modal: modalSliceReducer,
      },
    });

    const socket = io.connect();
 
    socket.on('newChannel', (newChannel) => {
      store.dispatch(addChannel(newChannel));
    });
  
    socket.on('removeChannel', (removeChannnel) => {
      store.dispatch(removeChannel(removeChannnel))
    });
    
    socket.on('updateChannel', (updateChannels) => {
      store.dispatch(updateChannel(updateChannels))
    });

    socket.on('addMessage', (newMessage) => {
      store.dispatch(addMessage(newMessage))
    });

  return (
    <Provider store={store}>
          <ApiContext.Provider value={socket}>
            <I18nextProvider i18n={i18n}>
              <App />
              </I18nextProvider>
              </ApiContext.Provider>
                </Provider>
                 );
};


export default init;