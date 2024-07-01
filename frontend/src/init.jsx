
import React from 'react';
import axios from 'axios';
import { addChannels, setCurrentChannel, setCurrentChannelId, updateChannel, removeChannel } from './slices/channelsSlice'
import { addMessages } from './slices/messagesSlice'
import ApiContext  from './contexts/ApiContext';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './App';
import ru from './locales/index';
import { Provider } from 'react-redux';
import store from './Components/store';
import currentChannelId from './slices/channelsSlice';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources: { ru },
      fallbackLng: 'ru',
    });
   

    const getAuthHeader = () => {
      const userId = JSON.parse(localStorage.getItem('userId'));
      if (userId && userId.token) {
        return { Authorization: `Bearer ${userId.token}` };
      }
      return {};
    };
  
    try {
      const channelsResponse = await axios.get('/api/v1/channels', { headers: getAuthHeader() });
      store.dispatch(addChannels(channelsResponse.data));
      store.dispatch(setCurrentChannel(channelsResponse.data));
      store.dispatch(setCurrentChannelId(channelsResponse.data));
      store.dispatch(removeChannel(channelsResponse.data));
      store.dispatch(updateChannel(channelsResponse.data));
      const messagesResponse = await axios.get(`/api/v1/channels/${currentChannelId}/messages`, { headers: getAuthHeader() });
      store.dispatch(addMessages(messagesResponse.data));
    } catch (error) {
      console.error(error);
    }

  return (
    <div>
    <Provider store={store}>
          <ApiContext.Provider value={null}>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </ApiContext.Provider>
        </Provider>
      </div>
    );
};


export default init;