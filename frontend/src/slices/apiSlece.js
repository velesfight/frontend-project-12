import routes from '../Components/routes/routes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import getAuthToken  from '../Components/AuthProvider';


const fetchData = createAsyncThunk(
    'channels/fetchData',
    async () => {
        const response = await axios.get(routes.channelsPath(), { headers:  { Authorization: `Bearer ${getAuthToken()}` } });
        console.log(response)
      return response.data;
    }
  );


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
    setCurrentChannelId: (state, action) => {
        state.currentChannelId = action.payload;
      },
     
      addChannels: channelsAdapter.addMany,
      addChannel: (state, { payload }) => {
        channelsAdapter.addOne(state, payload);
        state.currentChannelId = payload.id;
      },
      updateChannel: (state, action) => {
        channelsAdapter.updateOne(state, action.payload);
      },
      removeChannel:(state, action) => {
        channelsAdapter.removeOne(state, action.payload);
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },

  
  });

export const { addChannels, setCurrentChannelId, removeChannel, addChannel, updateChannel } = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export { fetchData };
export default channelsSlice.reducer;

  