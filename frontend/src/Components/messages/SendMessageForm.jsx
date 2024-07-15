import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Toast } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import { addMessage } from '../../slices/messagesSlice';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';

const SendMessageForm = () => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { currentChannelId } = useSelector((state) => state.channels);
  const { username } = JSON.parse(localStorage.getItem('userId'));
 
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
    return {};
  } 
const formik = useFormik ({
  initialValues: { messageInput: '' },
  onSubmit: async (values,{ setSubmitting, resetForm } ) => {
    if (values.messageInput !== '') {
      const message = {
        body: filter.clean(values.messageInput),
        username: username,
       channelId: currentChannelId,
      };
      try {
        const response = await axios.post('/api/v1/messages', message, { headers: getAuthHeader() });
          resetForm(); 
          dispatch(addMessage(response.data));
      } catch (error) {
        Toast.error((t('errors.unknown')));
      } finally {
        setSubmitting(false);
      }
    }
  },
});

  return (
    <div className="mt-auto px-5 py-3">
    <Form onSubmit={formik.handleSubmit} noValidate
        className="py-1 border rounded-2">
      <div className="input-group has-validation">
      <Form.Group className="input-group">
          <Form.Control
            placeholder="Message"
            aria-label="Chat message"
            name="messageInput"
            id="enterMessage"
            value={formik.values.messageInput}
            onChange={formik.handleChange}
            ref={inputRef}
            required
          />
          <Button className="border-0" variant="light" type="submit">
          <span className="visually-hidden">{t('chatPage.sendMessage')}</span>
          </Button>
          </Form.Group>
      </div>
    </Form>
    </div>
  );
};

export default SendMessageForm;
