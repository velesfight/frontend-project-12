import React from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../slices/uiSlisec';
import { selectors, removeChannel, setCurrentChannelId } from '../../slices/channelsSlice';
import { removeMessagesByChannelId } from '../../slices/messagesSlice';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const Remove = () => {
  const { t } = useTranslation();
    const dispatch = useDispatch();
    const channelId = useSelector((state) => state.modal.channelId);
    const { currentChannelId } = useSelector((state) => state.channels);
    const isOpened = useSelector((state) => state.modal.isOpen);
    
    const channels = useSelector(selectors.selectAll);
    console.log(channelId, currentChannelId, channels)

    const getAuthHeader = () => {
      const userId = JSON.parse(localStorage.getItem('userId'));
      if (userId && userId.token) {
        return { Authorization: `Bearer ${userId.token}` };
      }
      return {};
    }


  const handleRemove = async () => {
try {
await axios.delete(`/api/v1/channels/${channelId}`, { headers: getAuthHeader() });
dispatch(removeChannel(channelId));
dispatch(removeMessagesByChannelId(channelId));
toast.success(t('modals.doneRemove'));
if (channelId === currentChannelId) {
  const generalChannel = channels.find((channel) => channel.name === 'general');
  dispatch(setCurrentChannelId(generalChannel.id));
}
dispatch(hideModal())
} catch (error) {
  toast.error(t('errors.unknown'));
  };
};

const handleClose = () => dispatch(hideModal());

return (
      <Modal show={isOpened} onHide={handleClose} centered>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p className="lead">{t('modals.sure')}</p>
        <div className="d-flex justify-content-end">
            <Button variant="danger" type="submit" onClick={handleRemove}>
            {t('modals.remove')}
          </Button>
          <Button variant="secondary" onClick={handleClose} className="ms-2">
          {t('modals.cancel')}
          </Button>
          </div>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
      );
}
export default Remove;