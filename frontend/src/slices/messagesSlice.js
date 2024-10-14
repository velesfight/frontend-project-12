import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../Components/routes/routes';
import getAuthToken from '../Components/AuthProvider';
/* eslint-disable no-param-reassign */

const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    const response = await axios.get(routes.messagesPath(), { headers: { Authorization: `Bearer ${getAuthToken()}` } });
    return response.data;
  },
);

const messagesAdapter = createEntityAdapter();
export const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  loadingStatus: 'idle',
  error: null,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
    removeMessagesByChannelId: (state, action) => {
      const channelId = action.payload;
      const remainingMessages = Object.values(state.entities)
        .filter((message) => message.channelId !== channelId);
      messagesAdapter.setAll(state, remainingMessages);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        messagesAdapter.addMany(state, action.payload);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const { addMessages, addMessage, removeMessagesByChannelId } = messagesSlice.actions;
export const selectors1 = messagesAdapter.getSelectors((state) => state.messages);
export { fetchMessages };
export default messagesSlice.reducer;
