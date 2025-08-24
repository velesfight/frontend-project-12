import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiRoutes from '../routes/apiRoutes';
import getAuthToken from '../contexts/AuthContext';
import { RootState } from '../store';
/* eslint-disable no-param-reassign */

export interface Channel {
  id: number;
  name: string;
  removable: boolean;
}

export const fetchData = createAsyncThunk(
  'channels/fetchData',
  async (token: string) => {
    const response = await axios.get(apiRoutes.channelsPath(), {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data as Channel[];
  }
);

const channelsAdapter = createEntityAdapter<Channel>();

// Начальное состояние с типами
interface ChannelsState {
  currentChannelId: number;
  loadingStatus: 'idle' | 'loading' | 'failed';
  error: any;
}

const initialState = channelsAdapter.getInitialState<ChannelsState>({
  currentChannelId: 1,
  loadingStatus: 'idle',
  error: null,
});

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannelId: (state, action: PayloadAction<number>) => {
      state.currentChannelId = action.payload;
    },
    addChannels: channelsAdapter.addMany,
    addChannel: (state, { payload }: PayloadAction<Channel>) => {
      channelsAdapter.addOne(state, payload);
    },
    updateChannel: (state, action: PayloadAction<{ id: number; changes: Partial<Channel> }>) => {
      channelsAdapter.updateOne(state, action.payload);
    },
    removeChannel: (state, { payload }: PayloadAction<number>) => {
      if (state.currentChannelId === payload) {
        const newCurrentChannelId = state.ids.find((id) => id !== payload);
        if (newCurrentChannelId) {
          state.currentChannelId = newCurrentChannelId as number;
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
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<Channel[]>) => {
        channelsAdapter.setAll(state, action.payload);
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

export const selectors = channelsAdapter.getSelectors<RootState>(
  (state) => state.channels,
);

export default channelsSlice.reducer;
