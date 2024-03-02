import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    setMessages: (state, action) => {
      return action.payload;
    },
  },
});

export const { setMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
