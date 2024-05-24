import React, { useEffect} from 'react';
import { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, modalsSlice, showModal } from '../slices/uiSlisec';
import { ApiContext } from '../../context/init';
import { removeChannel } from '../slices/channelsSlice';

const Remove = () => {
    const dispatch = useDispatch();
    const channels = useSelector(channelsSelectors.selectAll);
    const { socket } = useContext(ApiContext);
    const { hideModal, showModal } = modalsSlice;
};
const handleRemove = (channelId) => {
socket.emit('removeChannel', { id: channelId }, (response) => {
  if (response.status === 'ok') {
    dispatch(removeChannel({id: channelId}));
    dispatch(hideModal());
  } else {
     console.log('error')
  }
});


    return (
      <Modal show={showModal} onHide={hideModal}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Remove</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleRemove({ channelId })}>
            <FormGroup className="form-group">
              <input className="btn btn-danger" type="submit" value="remove" />
            </FormGroup>
          </form>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
      );
    };
export default Remove;