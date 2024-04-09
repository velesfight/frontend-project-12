import { createSlice, createEntityAdapter  } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    setMessages: messagesAdapter.addMany,
    },
  });

export const { setMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
