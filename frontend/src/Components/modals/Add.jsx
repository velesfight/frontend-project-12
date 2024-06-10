import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../slices/uiSlisec'
import { Modal, Form, Button } from 'react-bootstrap';
import { selectors } from '../../slices/channelsSlice';
import { useSocket } from '../../contexts/useAuth'
import _ from 'lodash';

const Add = () => {
    const dispatch = useDispatch();
    const inputEl = useRef();
    const channels = useSelector(selectors.selectAll);
    const socket = useSocket();

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
    onSubmit:(values) => {
      const newChannel = { id: _.uniqueId(), name: values.name, removable: true };
      socket.emit('newChannel', newChannel, (response) => {
        console.log(newChannel)
        if (response.status !== 'ok') {
          console.log(response.status);
        }
      });
      dispatch(hideModal());
    },
  });
  const handleClose = () => {
    dispatch(hideModal());
  }

  return (
    <Modal show>
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
          <Button variant="primary" type="submit">
            Add
          </Button>
          <Button variant="secondary" onClick={handleClose} className="ms-2">
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};


export default Add;
