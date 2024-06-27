import React, { useEffect } from 'react';
import axios from 'axios';
import { addChannel } from '../../slices/channelsSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../slices/uiSlisec'
import { Modal, Form, Button } from 'react-bootstrap';
import { selectors } from '../../slices/channelsSlice';



const Add = () => {
    const dispatch = useDispatch();
    const inputEl = useRef();
    const channels = useSelector(selectors.selectAll);


useEffect(() => {
  if (inputEl.current) {
    inputEl.current.focus();
  }
}, []);

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
      name: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const newChannel = { name: values.name, removable: true };
      try {
        const response = await axios.post('/api/v1/channels', newChannel, { headers: getAuthHeader() });
        dispatch(addChannel(response.data));
        dispatch(hideModal());
      } catch (error) {
        console.log(error.response.status);
      }
    },
  });

  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
    return {};
  }

  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label>Channel Name</Form.Label>
            <Form.Control
            required
              type="text"
              name="name"
              ref={inputEl}
              id="name"
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
          <Button variant="primary" type="submit">
            Add
          </Button>
          <Button variant="secondary" onClick={handleClose} className="ms-2" disabled={formik.isSubmitting}>
            Cancel
          </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};


export default Add;
