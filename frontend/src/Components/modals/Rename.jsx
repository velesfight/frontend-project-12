
import React, { useEffect, useRef} from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../slices/uiSlisec';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import updateChannel from '../slices/channelsSlice';
import { useSocket } from '../contexts/useAuth';
import { selectors } from '../slices/channelsSlice';
import * as Yup from 'yup';


const Rename = () => {
const dispatch = useDispatch();
const inputEl = useRef();
const socket = useSocket();

useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  }, []);

const channels = useSelector(selectors.selectAll);
const { modal } = useSelector((state) => state.modal);
const { channelId } = modal;
const curChannel = channels.find((ch) => ch.id === channelId);
console.log(modal)

    const validationSchema = Yup.object().shape({
      name: Yup
        .string()
        .min(3)
        .max(20)
        .notOneOf(channels.map((channel) => channel.name), 'Add.unique')
        .required(),
    });
   
    const formik = useFormik({
      initialValues: {
        name: curChannel,
      },
      validationSchema,
      onSubmit: (values) => {
        const updatedChannel = { id: curChannel.id, name: values.name };
        socket.emit('renameChannel', updatedChannel, (response) => {
            if (response.status !== 'ok') {
              console.log(response.status);
            }
          });
    
          dispatch(updateChannel(updatedChannel));
          dispatch(hideModal());
        },
      });
    
      return (
        <Modal show onHide={() => dispatch(hideModal())}>
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Rename</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
              <form onSubmit={formik.handleSubmit}>
                <FormGroup className="form-group" controlId="body">
                  <FormControl
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    ref={inputEl}
                    data-testid="input-body"
                    required
                  />
                </FormGroup>
    
                <input className="btn btn-primary" type="submit" value="submit" />
              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal>
      );
    }
    
    export default Rename;