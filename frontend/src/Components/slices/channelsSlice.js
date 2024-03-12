import { createSlice } from '@reduxjs/toolkit';

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    setChannels: (state, action) => {
      return state = action.payload;
    },
  },
});

export const { setChannels } = channelsSlice.actions;

export default channelsSlice.reducer;
