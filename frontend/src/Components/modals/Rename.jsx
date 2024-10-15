import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Modal, FormGroup, FormControl, Form, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';

import { hideModal } from '../../slices/uiSlisec';
import { selectors, updateChannel } from '../../slices/apiSlece';
import useAuth from '../../contexts/useAuth';
import routes from '../routes/routes';

const Rename = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputEl = useRef();
  const { getAuthToken } = useAuth();

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.select();
    }
  }, []);

  const channels = useSelector(selectors.selectAll);
  const channelId = useSelector((state) => state.modal.channelId);
  const curChannel = channels.find((ch) => ch.id === channelId);
  const isOpened = useSelector((state) => state.modal.isOpen);

  const validationSchema = Yup.object().shape({
    name: Yup
      .string()
      .min(3, (t('validation.length')))
      .max(20, (t('validation.length')))
      .notOneOf(channels.map((ch) => ch.name), (t('validation.unique')))
      .required(t('validation.required')),
  });

  const formik = useFormik({
    initialValues: {
      name: curChannel ? curChannel.name : '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.patch(routes.channelsPath1(channelId), { name: filter.clean(values.name) }, { headers: { Authorization: `Bearer ${getAuthToken()}` } });
        dispatch(updateChannel({ id: channelId, changes: { name: filter.clean(values.name) } }));
        dispatch(hideModal());
        toast.success(t('modals.doneRename'));
      } catch (error) {
        toast.error(t('errors.unknown'));
      }
    },
  });

  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <Modal show={isOpened} centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              name="name"
              id="name"
              type="text"
              disabled={formik.isSubmitting}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              ref={inputEl}
              className="mb-2"
              isInvalid={formik.errors.name && formik.touched.name}
              required
            />
            <Form.Label className="visually-hidden" htmlFor="name">{t('modals.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </FormGroup>
          <Modal.Footer>
            <Button className="me-2 btn btn-secondary" onClick={handleClose}>
              {t('modals.cancel')}
            </Button>
            <Button type="submit" disabled={formik.isSubmitting} className="btn btn-primary">
              {t('modals.send')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
