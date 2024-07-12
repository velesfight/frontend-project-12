import { createSlice, createEntityAdapter  } from '@reduxjs/toolkit';

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
  });

export const { addMessages, addMessage, removeMessagesByChannelId } = messagesSlice.actions;
export const selectors1 = messagesAdapter.getSelectors((state) => state.messages);

export default messagesSlice.reducer;
