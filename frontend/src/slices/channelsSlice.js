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
      setActiveChannel: (state, { payload }) => {
        state.activeChannel = payload;
      },
      setChannels: channelsAdapter.addMany,
      addChannel: channelsAdapter.addOne,
      updateChannel: channelsAdapter.updateOne,
      removeChannel: (state, { payload }) => {
        channelsAdapter.removeOne(state, payload);
        if (state.currentChannelId === payload.id) {
          state.currentChannelId = 1; // Перемещение в дефолтный канал
        }
      },
  },
  });

export const { setChannels, setCurrentChannelId, setActiveChannel, removeChannel, addChannel, updateChannel } = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
