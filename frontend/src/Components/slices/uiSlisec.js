import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const modalAdapter = createEntityAdapter();

const initialState = {
  modal: {
    modalType: null,
    channelId: null
  }
  };

  export const modalsSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal: (state, action) => {
          state.modalType = action.payload.modalType;
          state.channelId = action.payload.channelId;
        },
        hideModal: (state) => {
          state.modalType = null;
          state.channelId = null;
        },
      },
    });
  
    
    export const selectors = modalAdapter.getSelectors((state) => state.modal);
export const { showModal, hideModal } = modalsSlice.actions;
    export default modalsSlice.reducer;
    