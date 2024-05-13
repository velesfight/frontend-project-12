import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const defaultChannelId = 1;

const initialState = channelsAdapter.getInitialState({
  channels: [],
  currentChannelId: defaultChannelId,
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

export const { setChannels, setCurrentChannelId, switchChannel } = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
