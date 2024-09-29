import React from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../slices/uiSlisec';
import { selectors, deleteChannel, setCurrentChannelId, fetchData } from '../../slices/apiSlece';
import { removeMessagesByChannelId } from '../../slices/messagesSlice';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/useAuth';
import routes from '../routes/routes';

const Remove = () => {
  const { t } = useTranslation();
    const dispatch = useDispatch();
    const channelId = useSelector((state) => state.modal.channelId);
    const { currentChannelId } = useSelector((state) => state.channels);
    const isOpened = useSelector((state) => state.modal.isOpen);
    const { getAuthToken } = useAuth();
    const channels = useSelector(selectors.selectAll);


  const handleRemove = async () => {
try {
  await axios.delete(routes.channelsPath(channelId),  { headers:  { Authorization: `Bearer ${getAuthToken()}` }});
dispatch(deleteChannel(channelId));
dispatch(removeMessagesByChannelId(channelId));
toast.success(t('modals.doneRemove'));
if (channelId === currentChannelId) {
  const generalChannel = channels.find((channel) => channel.name === 'general');
  dispatch(setCurrentChannelId(generalChannel.id));
}
dispatch(fetchData());
dispatch(hideModal())
} catch (error) {
  toast.error(t('errors.unknown'));
  };
};

const handleClose = () => dispatch(hideModal());

return (
      <Modal show={isOpened} centered>
        <Modal.Header closeButton onHide={handleClose}>
          <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p className="lead">{t('modals.sure')}</p>
        <div className="d-flex justify-content-end">
        <Button  onClick={handleClose} variant="secondary">
          {t('modals.cancel')}
          </Button>
            <Button variant="danger" type="submit" onClick={handleRemove}>
            {t('modals.remove')}
          </Button>
          </div>
          </Modal.Body>
    </Modal>
      );
}
export default Remove;