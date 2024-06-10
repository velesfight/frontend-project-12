
import React from 'react';
import { io } from 'socket.io-client';
import { addChannel, removeChannel, updateChannel } from './slices/channelsSlice'
import ApiContext  from './contexts/ApiContext';
import { addMessage } from './slices/messagesSlice';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './App';
import ru from './locales/index.js';
import { Provider } from 'react-redux';
import store from './Components/store';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources: { ru },
      fallbackLng: 'ru',
    });
  

    const socket = io();
 
    socket.on('newChannel', (newChannel) => {
      store.dispatch(addChannel(newChannel));
      console.log(newChannel)
    });
    
  
    socket.on('removeChannel', (removeChannnel) => {
      store.dispatch(removeChannel(removeChannnel))
    });
    
    socket.on('updateChannel', (updateChannels) => {
      store.dispatch(updateChannel(updateChannels))
    });

    socket.on('newMessage', (payload) => store.dispatch(addMessage(payload)));

  return (
    <div>
    <Provider store={store}>
          <ApiContext.Provider value={socket}>
            <I18nextProvider i18n={i18n}>
              <App />
              </I18nextProvider>
              </ApiContext.Provider>
                </Provider>
                </div>
                 );
};


export default init;