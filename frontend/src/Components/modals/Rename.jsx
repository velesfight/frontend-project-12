
import React, { useEffect, useRef} from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../slices/uiSlisec';
import { Modal, FormGroup, FormControl, Form, Button } from 'react-bootstrap';
import { selectors, updateChannel } from '../../slices/channelsSlice';
import * as Yup from 'yup';
import axios from 'axios';


const Rename = () => {
const dispatch = useDispatch();
const inputEl = useRef();


useEffect(() => {
    if (inputEl.current) {
      inputEl.current.select();
    }
  }, []);

  const channels = useSelector(selectors.selectAll);
  const channelId = useSelector((state) => state.modal.channelId);
  //const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const curChannel = channels.find((ch) => ch.id === channelId);


  const validationSchema = Yup.object().shape({
    name: Yup
      .string()
      .min(3)
      .max(20)
      .notOneOf((channels), 'Add.unique')
      .required(),
  });
  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
    return {};
  }

  const formik = useFormik({
    initialValues: {
      name: curChannel ? curChannel.name : '',
    },
    validationSchema,
    onSubmit: async (values) =>{
      try {
        await axios.patch(`/api/v1/channels/${channelId}`,  { name: values.name }, { headers: getAuthHeader() });
        dispatch(updateChannel({ id: channelId, changes: { name: values.name } }));
        dispatch(hideModal());
        } catch (error) {
        console.error(error.response.status);
        }
        },
      });


  

  const handleClose = () => {
    dispatch(hideModal());
  };
    
      return (
        <Modal show centered onHide={handleClose}>
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Rename</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
              <form onSubmit={formik.handleSubmit}>
                <FormGroup className="form-group">
                  <FormControl
                    name="name"
                    type="text"
                    disabled={formik.isSubmitting}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    ref={inputEl}
                    data-testid="input-body"
                    isInvalid={formik.errors.name}
                    required
                  />
                   <Form.Control.Feedback type="invalid">
              {(formik.errors.name)}
            </Form.Control.Feedback>
                </FormGroup>
                <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={formik.isSubmitting} variant="primary">
              Send
            </Button>
          </div>
              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal>
      );
    }
    
    export default Rename;