import routes from '../Components/routes/routes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';


const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
    return {};
  };


const fetchData = createAsyncThunk(
    'channels/fetchData',
    async () => {
        const response = await axios.get(routes.channelsPath(), { headers: getAuthHeader() });
      return response.data;
    }
  );
  console.log(fetchData)

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
      removeChannel:(state, action) => {
        channelsAdapter.removeOne(state, action.payload);
      },
  },
  extraReducers: (builder) => {
    builder
      // Вызывается прямо перед выполнением запроса
      .addCase(fetchData.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      // Вызывается, если запрос успешно выполнился
      .addCase(fetchData.fulfilled, (state, action) => {
        // Добавляем пользователя
        channelsAdapter.addMany(state, action);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      // Вызывается в случае ошибки
      .addCase(fetchData.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
        state.error = action.error;
      });
  },

  
  });

export const { addChannels, setCurrentChannelId, setCurrentChannel, removeChannel, addChannel, updateChannel } = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export { fetchData };
export default channelsSlice.reducer;

  