import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes/appRoutes';
import getAuthToken from '../contexts/AuthContext';
/* eslint-disable no-param-reassign */

const fetchData = createAsyncThunk(
  'channels/fetchData',
  async () => {
    const response = await axios.get(routes.channelsPath(), { headers: { Authorization: `Bearer ${getAuthToken()}` } });
    return response.data;
  },
);

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  channels: [],
  currentChannelId: 1,
});

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addChannels: channelsAdapter.addMany,
    addChannel: (state, { payload }) => {
      channelsAdapter.addOne(state, payload);
    },
    updateChannel: (state, action) => {
      channelsAdapter.updateOne(state, action.payload);
    },
    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        const newCurrentChannelId = state.ids.find((id) => id !== payload);
        if (newCurrentChannelId) {
          state.currentChannelId = newCurrentChannelId;
        }
      }
      channelsAdapter.removeOne(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action.payload);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const {
  addChannels, setCurrentChannelId, removeChannel, addChannel, updateChannel,
} = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export { fetchData };
export default channelsSlice.reducer;
