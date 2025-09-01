import { createSlice, createEntityAdapter, PayloadAction  } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */


export interface ModalState {
  isOpen: boolean;
  modalType: 'adding' | 'removing' | 'renaming' | null;
  channelId: string | number | null;
}

const modalAdapter = createEntityAdapter();

const initialState: ModalState = {
  isOpen: false,
  modalType: null,
  channelId: null,
};

export const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action:PayloadAction<{ modalType: 'adding' | 'removing' | 'renaming'; channelId: string | number }>) => {
      state.isOpen = true;
      state.channelId = action.payload.channelId;
      state.modalType = action.payload.modalType;
    },
    hideModal: (state) => {
      state.modalType = null;
      state.channelId = null;
      state.isOpen = false;
    },
  },
});

export const { showModal, hideModal } = modalsSlice.actions;

export const selectModal = (state: { modal: ModalState }) => state.modal;

export default modalsSlice.reducer;
