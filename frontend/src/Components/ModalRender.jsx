import React from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import handleClose from './modals/Add';
import Add from './modals/Add';
import Remove from './modals/Remove';
import Rename from './modals/Rename';

const ModalManager = () => {
  const { isOpen, modalType, channelId } = useSelector((state) => state.modal);

  if (!isOpen) {
    return null;
  }


  const renderModal = () => {
    switch (modalType) {
      case 'adding':
        return <Add />;
      case 'removing':
        return <Remove channelId={channelId} />;
      case 'renaming':
        return <Rename />;
      default:
        return null;
    }
  };

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      {renderModal()}
      </Modal>
  );
};

export default ModalManager;