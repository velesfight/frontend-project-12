import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    setChannels: channelsAdapter.addMany,
     },
  });

export const { setChannels } = channelsSlice.actions;

export default channelsSlice.reducer;
