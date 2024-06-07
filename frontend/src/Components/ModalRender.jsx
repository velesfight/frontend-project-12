import React from 'react';
import { useSelector } from 'react-redux';
import Add from './modals/Add';
import Remove from './modals/Remove';
import Rename from './modals/Rename';

const ModalManager = () => {
  const { isOpen, type, channelId } = useSelector((state) => state.modal);

  if (!isOpen) {
    return null;
  }


  const renderModal = () => {
    switch (type) {
      case 'add':
        return <Add />;
      case 'remove':
        return <Remove channelId={channelId} />;
      case 'rename':
        return <Rename />;
      default:
        return null;
    }
  };

  return (
    <>
      {renderModal()}
    </>
  );
};

export default ModalManager;