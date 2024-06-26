import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  channels: [],
  currentChannelId: 1,
  activeChannel: 1,
});

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannelId: (state, { payload }) => {
        state.currentChannelId = payload;
      },
      setCurrentChannel: (state, { payload }) => {
        state.activeChannel = payload;
      },
      addChannels: channelsAdapter.addMany,
      addChannel: channelsAdapter.addOne,
      updateChannel: channelsAdapter.updateOne,
      removeChannel: channelsAdapter.removeOne,
  },
  
  });

export const { addChannels, setCurrentChannelId, setCurrentChannel, removeChannel, addChannel, updateChannel } = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
