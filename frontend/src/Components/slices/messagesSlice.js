import { createSlice, createEntityAdapter  } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    setMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
    },
  });

export const { setMessages } = messagesSlice.actions;
export const { addMessage } = messagesSlice.actions;
export const selectors1 = messagesAdapter.getSelectors((state) => state.messages);

export default messagesSlice.reducer;
