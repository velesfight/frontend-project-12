import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const modalAdapter = createEntityAdapter();

const initialState =  {
    isOpen: false,
    modalType: null,
    channelId: null
  };

  export const modalsSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal: (state, action) => {
          state.isOpen = true;
          state.channelId = action.payload.channelId;
          state.modalType = action.payload.modalType
        },
        hideModal: (state) => {
          state.modalType = null;
          state.channelId = null;
          state.isOpen = false;
        },
      },
    });
  
    
    export const selectors = modalAdapter.getSelectors((state) => state.modal);
export const { showModal, hideModal } = modalsSlice.actions;
export const { actions } = modalsSlice;
    export default modalsSlice.reducer;
    