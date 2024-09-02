import { createSlice, createEntityAdapter  } from '@reduxjs/toolkit';
import routes from '../Components/routes/routes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import  getAuthToken  from '../Components/AuthProvider';

  const fetchMessages = createAsyncThunk(
    'messages/fetchMessages',
    async (currentChannelId) => {
      const response = await axios.get(routes.messagesPath(currentChannelId), { headers:  { Authorization: `Bearer ${getAuthToken()}`, timeout: 10000  }});
      console.log('res', response.data)
      return response.data;
    }
  );

const messagesAdapter = createEntityAdapter();
export const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
    removeMessagesByChannelId: (state, action) => {
      const channelId = action.payload;
      const remainingMessages = Object.values(state.entities).filter(message => message.channelId !== channelId);
      messagesAdapter.setAll(state, remainingMessages);
    },
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchMessages.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
        .addCase(fetchMessages.fulfilled, (state, payload) => {
          messagesAdapter.addMany(state, payload.messages);
          console.log(payload.message)
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
export { fetchMessages }
export default messagesSlice.reducer;
