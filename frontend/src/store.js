import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './slices/apiSlice';
import messagesReducer from './slices/messagesSlice';
import modalSliceReducer from './slices/uiSlice';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalSliceReducer,
  },
});

export default store;
