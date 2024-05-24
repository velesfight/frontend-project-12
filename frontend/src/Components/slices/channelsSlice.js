import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  channels: [],
  currentChannelId: 1,
});

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannelId: (state, { payload }) => {
        state.currentChannelId = payload;
      },
      setChannels: channelsAdapter.addMany,
      addChannel: channelsAdapter.addOne,
      updateChannel: channelsAdapter.updateOne,
      removeChannel: channelsAdapter.removeOne,
      switchChannel: (state, action) => {
      state.currentChannelId = action.payload.id;
    },
  },
  });

export const { setChannels, setCurrentChannelId, removeChannel, addChannel } = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
