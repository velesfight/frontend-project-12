import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from '../slices/apiSlece';
import messagesReducer from '../slices/messagesSlice';
import modalSliceReducer from '../slices/uiSlisec';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalSliceReducer,
  },
});

export default store;
