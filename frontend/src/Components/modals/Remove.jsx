import React from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, showModal } from '../../slices/uiSlisec';
import { removeChannel } from '../../slices/channelsSlice';

const Remove = () => {
    const dispatch = useDispatch();
    //const channelId = useSelector((state) => state.modal.channelId);
    const channelId = useSelector((state) => state.modal.channelId);

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
dispatch(removeChannel({ channelId: channelId }));
dispatch(hideModal())
} catch (error) {
  console.error(error.response.status);
  };
};
const handleClose = () => dispatch(hideModal());

return (
      <Modal show={showModal} centered>
      <Modal.Dialog>
        <Modal.Header closeButton onHide={handleClose}>
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