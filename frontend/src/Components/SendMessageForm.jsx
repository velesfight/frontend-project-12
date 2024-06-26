import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import { addMessage } from '../slices/messagesSlice';

const SendMessageForm = () => {
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
        body: values.messageInput,
        username: username,
        channelId: currentChannelId,
      };
      try {
        const response = await axios.post('/api/v1/messages', message, { headers: getAuthHeader() });
        console.log(response);
        if (response.status === 200) {
          resetForm(); // Сбрасываем форму
          dispatch(addMessage(response.data));
         
        } else {
          console.log('Ошибка при отправке сообщения:', response.status);
        }
      } catch (error) {
        console.log('Ошибка при выполнении запроса:', error);
      } finally {
        setSubmitting(false); // Завершаем отправку формы
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
          <span className="visually-hidden">Send</span>
          </Button>
          </Form.Group>
      </div>
    </Form>
    </div>
  );
};

export default SendMessageForm;
