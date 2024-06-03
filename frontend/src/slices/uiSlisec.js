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
        showModal: (state, { payload }) => {
          console.log(payload);
          state.modal.modalType = payload.modalType;
          state.modal.channelId = payload.channelId;
        },
        hideModal: (state) => {
          state.modal.modalType = null;
          state.modal.channelId = null;
        },
      },
    });
  
    
    export const selectors = modalAdapter.getSelectors((state) => state.modal);
export const { showModal, hideModal } = modalsSlice.actions;
export const { actions } = modalsSlice;
    export default modalsSlice.reducer;
    