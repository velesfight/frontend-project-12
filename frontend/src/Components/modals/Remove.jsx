import React from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../slices/uiSlisec';
import { removeChannel, setCurrentChannelId } from '../../slices/channelsSlice';

const Remove = () => {
    const dispatch = useDispatch();
    const channelId = useSelector((state) => state.modal.channelId);
    const { currentChannelId } = useSelector((state) => state.channels);
    const isOpened = useSelector((state) => state.modal.isOpen);
    console.log(isOpened)

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
if (channelId === currentChannelId) {
  dispatch(setCurrentChannelId(1));
}
dispatch(removeChannel(channelId));
dispatch(hideModal())
} catch (error) {
  console.error(error.response.status);
  };
};
const handleClose = () => dispatch(hideModal());

return (
      <Modal show={isOpened} onHide={handleClose} centered>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>RemoveChannel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p className="lead">are you sure?</p>
        <div className="d-flex justify-content-end">
            <Button variant="danger" type="submit" onClick={handleRemove}>
            Remove
          </Button>
          <Button variant="secondary" onClick={handleClose} className="ms-2">
            Cancel
          </Button>
          </div>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
      );
}
export default Remove;