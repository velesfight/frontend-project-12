import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { addMessage } from '../../slices/messagesSlice';
import useFilter from '../../hooks/useFilter';
import useAuth from '../../hooks/useAuth';
import apiRoutes from '../../routes/apiRoutes';
import getAuthHeaders from '../../headers';

const SendMessageForm = () => {
  const { t } = useTranslation();
  const { getAuthToken, user } = useAuth();
  const filterWords = useFilter();
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const formik = useFormik({
    initialValues: { messageInput: '' },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (values.messageInput !== '') {
        const message = {
          body: filterWords(values.messageInput),
          username: user.username,
          channelId: currentChannelId,
        };

        try {
          const response = await axios.post(
            apiRoutes.messagesPath(),
            message,
            getAuthHeaders(getAuthToken()),
          );
          dispatch(addMessage(response.data));
          resetForm();
        } catch (error) {
          toast.error(t('errors.unknown'));
        } finally {
          setSubmitting(false);
        }
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId, dispatch]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2">
        <Form.Group className="input-group">
          <Form.Control
            placeholder={t('chatPage.sendMessage')}
            aria-label={t('chatPage.newMessage')}
            name="messageInput"
            id="enterMessage"
            value={formik.values.messageInput}
            onChange={formik.handleChange}
            ref={inputRef}
            className="border-0 p-0 ps-2"
            required
          />
          <Button
            className="btn btn-group-vertical border-0"
            variant="light"
            type="submit"
            disabled={formik.isSubmitting}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />
            </svg>
            <span className="visually-hidden">{t('chatPage.sendMessage')}</span>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SendMessageForm;
