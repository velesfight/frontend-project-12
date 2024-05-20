import { createSlice, createEntityAdapter  } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
    },
  });

export const { addMessages } = messagesSlice.actions;
export const { addMessage } = messagesSlice.actions;
export const selectors1 = messagesAdapter.getSelectors((state) => state.messages);

export default messagesSlice.reducer;
