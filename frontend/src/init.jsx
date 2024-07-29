
import React from 'react';
import axios from 'axios';
import { addChannels, setCurrentChannel, setCurrentChannelId, removeChannel, updateChannel } from './slices/channelsSlice'
import { addMessages, removeMessagesByChannelId } from './slices/messagesSlice'
import ApiContext  from './Components/contexts/ApiContext';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './App';
import resources from './locales/index.js';
import { Provider } from 'react-redux';
import store from './Components/store';
import currentChannelId from './slices/channelsSlice';
import filter from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

    filter.loadDictionary('ru');

const rollbarConfig = {
  accessToken: process.env.POST_CLIENT_ITEM_ACCESS_TOKEN,
  environment: 'production',
};
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
      store.dispatch(setCurrentChannelId(channelsResponse.data.id));
      store.dispatch(setCurrentChannel(channelsResponse.data));
      store.dispatch(removeChannel(channelsResponse.data));
      store.dispatch(updateChannel(channelsResponse.data));
      const messagesResponse = await axios.get(`/api/v1/channels/${currentChannelId}/messages`, { headers: getAuthHeader() });
      store.dispatch(addMessages(messagesResponse.data));
      store.dispatch(removeMessagesByChannelId(messagesResponse.data.id))
    } catch (error) {
      console.log(error, 'fff');
    }
  return (
       <RollbarProvider config={rollbarConfig}>
       <ErrorBoundary>
    <Provider store={store}>
          <ApiContext.Provider value={null}>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </ApiContext.Provider>
        </Provider>
        </ErrorBoundary>
        </RollbarProvider>
    );
};


export default init;