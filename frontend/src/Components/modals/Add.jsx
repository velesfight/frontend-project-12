import React, { useEffect } from 'react';
import axios from 'axios';
import { addChannel } from '../../slices/apiSlece';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../slices/uiSlisec'
import { Modal, Form, Button } from 'react-bootstrap';
import { selectors, setCurrentChannel } from '../../slices/apiSlece';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/useAuth';
import filter from 'leo-profanity';
import routes from '../routes/routes';

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
      .min(3, (t('validation.length')))
      .max(20, (t('validation.length')))
      .notOneOf(channels.map((channel) => channel.name), 'Add.unique')
      .required(),
  });
  console.log(getAuthToken())
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const newChannel = { name: filter.clean(values.name), removable: true };
      try {
        const response = await axios.post(routes.channelsPath(), newChannel,  { headers:  { Authorization: `Bearer ${getAuthToken()}` }});
        dispatch(addChannel(response.data));
        dispatch(setCurrentChannel(response.data.id));
        //dispatch(setCurrentChannelId(response.data.id));
        dispatch(hideModal());

        toast.success(t('modals.doneChannel'));
      } catch (error) {
      toast.error(t('errors.unknown'));
      }
    },
  });

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
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
          <Button onClick={handleClose}  disabled={formik.isSubmitting}>
          {t('modals.cancel')}
          </Button>
          <Button  type="submit">
          {t('modals.send')}
          </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};


export default Add;
