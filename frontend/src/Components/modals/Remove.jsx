import React from 'react';

import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { hideModal, showModal } from '../../slices/uiSlisec';
import { useSocket } from '../../contexts/useAuth';

const Remove = ({ channelId }) => {
    const dispatch = useDispatch();
    //const channels = useSelector(channelsSelectors.selectAll);
    const socket = useSocket();

const handleRemove = (e) => {
  e.preventDefault();
socket.emit('removeChannel', { id: channelId }, (response) => {
  if (response.status === 'ok') {
    dispatch(hideModal());
  } else {
     console.log('error')
  }
})
}


    return (
      <Modal show={showModal} onHide={() => dispatch(hideModal())}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Remove</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Button variant="primary" type="submit" onClick={handleRemove}>
            Remove
          </Button>
          <Button variant="secondary" onClick={() => dispatch(hideModal())} className="ms-2">
            Cancel
          </Button>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
      );
    };


export default Remove;