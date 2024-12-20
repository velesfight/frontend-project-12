import React from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { hideModal } from '../../slices/uiSlice';
import { selectors, removeChannel, setCurrentChannelId } from '../../slices/apiSlice';
import { removeMessagesByChannelId } from '../../slices/messagesSlice';
import useAuth from '../../hooks/useAuth';
import apiRoutes from '../../routes/apiRoutes';
import getAuthHeaders from '../../headers';

const Remove = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channelId = useSelector((state) => state.modal.channelId);
  const { currentChannelId } = useSelector((state) => state.channels);
  const isOpened = useSelector((state) => state.modal.isOpen);
  const { getAuthToken } = useAuth();
  const channels = useSelector(selectors.selectAll);

  const handleClose = () => dispatch(hideModal());

  const handleRemove = async () => {
    try {
      await axios.delete(apiRoutes.channelsPath1(channelId), getAuthHeaders(getAuthToken()));
      await axios.delete(apiRoutes.messagesPath1(channelId), getAuthHeaders(getAuthToken()));

      dispatch(removeChannel(channelId));
      dispatch(removeMessagesByChannelId(channelId));
      toast.success(t('modals.doneRemove'));

      if (channelId === currentChannelId) {
        const generalChannel = channels.find((channel) => channel.name === 'general');
        if (generalChannel) {
          dispatch(setCurrentChannelId(generalChannel.id));
        }
      }

      dispatch(hideModal());
    } catch (error) {
      toast.error(t('errors.unknown'));
    }
  };

  return (
    <Modal show={isOpened} centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.sure')}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={handleClose} variant="secondary">
            {t('modals.cancel')}
          </Button>
          <Button variant="danger" type="submit" onClick={handleRemove}>
            {t('modals.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
