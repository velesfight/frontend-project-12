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
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/useAuth';


const Add = () => {
    const dispatch = useDispatch();
    const inputEl = useRef();
    const channels = useSelector(selectors.selectAll);
    const { t } = useTranslation();
    const { getAuthToken } = useAuth();

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
        const response = await axios.post('/api/v1/channels', newChannel,  { headers:  { Authorization: `Bearer ${getAuthToken()}` }});
        dispatch(addChannel(response.data));
        dispatch(hideModal());
        toast.success(t('modals.doneChannel'));
      } catch (error) {
      toast.error(t('errors.unknown'));
      }
    },
  });

 // const getAuthHeader = () => {
   // const userId = JSON.parse(localStorage.getItem('userId'));
   // if (userId && userId.token) {
    //  return { Authorization: `Bearer ${userId.token}` };
   // }
   // return {};
  //}

  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label>{t('modals.channelName')}</Form.Label>
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
          <Button onClick={handleClose} className="ms-2 btn btn-secondary" disabled={formik.isSubmitting}>
          {t('modals.cancel')}
          </Button>
          <Button className="ms-2 btn btn-primary" type="submit">
          {t('modals.send')}
          </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};


export default Add;
