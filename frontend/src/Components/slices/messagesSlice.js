import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    setMessages: (state, actions) => {
      return state = actions.payload;
    },
  },
});

export const { setMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
