import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const modalAdapter = createEntityAdapter();

const initialState = {
  modal: {
    isOpen: false,
    modalType: null,
    channelId: null
  }
  };

  export const modalsSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal: (state, action) => {
          state.modal.isOpen = true;
          state.modal.channelId = action.payload.channelId;
          state.modal.modalType = action.payload.modalType
        },
        hideModal: (state) => {
          state.modal.modalType = null;
          state.modal.channelId = null;
          state.modal.isOpen = false;
        },
      },
    });
  
    
    export const selectors = modalAdapter.getSelectors((state) => state.modal);
export const { showModal, hideModal } = modalsSlice.actions;
export const { actions } = modalsSlice;
    export default modalsSlice.reducer;
    