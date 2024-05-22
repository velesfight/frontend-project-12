import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../slices/uiSlisec';
import { Modal, Form, Button } from 'react-bootstrap';
import { selectors, addChannel } from '../slices/channelsSlice';
import { ApiContext } from '../../context/init';

const Add = () => {
    const dispatch = useDispatch();
    const inputEl = useRef();
    const channels = useSelector(selectors.selectAll);

useEffect(() => {
  if (inputEl.current) {
    inputEl.current.focus();
  }
}, []);

const { socket } = useContext(ApiContext);
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
    onSubmit: (values) => {
      socket.emit('newMessage', values.name, (response) => {
        if (response.status !== 'ok') {
          console.log(response.status);
        }
      });

      dispatch(addChannel({ name: values.name }));
      dispatch(hideModal());
    },
  });

  return (
    <Modal show onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Add Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="channelName">
            <Form.Label>Channel Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
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
          <Button variant="secondary" onClick={() => dispatch(hideModal())} className="ms-2">
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};


export default Add;
