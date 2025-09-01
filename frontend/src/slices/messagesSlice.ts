import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import routes from '../routes/apiRoutes';
import { AuthContext } from '../contexts/AuthContext';
import { RootState } from '../store';
/* eslint-disable no-param-reassign */

interface Message {
  id: string | number;
  channelId: string | number;
  username: string;
  body: string;
}

const messagesAdapter = createEntityAdapter<Message>();

interface MessagesState {
  loadingStatus: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const fetchMessages = createAsyncThunk<Message[]>(
  'messages/fetchMessages',
  async () => {
     const token = JSON.parse(localStorage.getItem('userId') || '{}')?.token;
    if (!token) {
      throw new Error('No auth token');
    }
  // вызываем функцию, чтобы получить токен
    const response = await axios.get<Message[]>(routes.messagesPath(), {
       headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
);
const initialState = messagesAdapter.getInitialState<MessagesState>({
  loadingStatus: 'idle',
  error: null,
});

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
    removeMessagesByChannelId: (state, action: PayloadAction<string | number>) => {
      const channelId = action.payload;
      const remainingMessages = Object.values(state.entities)
        .filter((message) => message?.channelId !== channelId);
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
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export const { addMessages, addMessage, removeMessagesByChannelId } = messagesSlice.actions;
export const selectors1 = messagesAdapter.getSelectors<RootState>((state) => state.messages);
export { fetchMessages };
export default messagesSlice.reducer;
