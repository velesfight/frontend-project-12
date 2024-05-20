import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { addMessage } from './Components/slices/messagesSlice';
import { useDispatch } from 'react-redux';


const SendMessageForm = () => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);
  const { currentChannelId } = useSelector((state) => state.channels);
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      const username = JSON.parse(localStorage.getItem('userId')).username;
      dispatch(addMessage({ body: message, channelId: currentChannelId, username }));
      setMessage('');
    }
  };

  return (
    <Form onSubmit={handleSendMessage}>
      <div className="input-group has-validation">
        <InputGroup>
          <Form.Control
            placeholder="Message"
            aria-label="Chat message"
            name="enterMessage"
            id="enterMessage"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            ref={inputRef}
            required
          />
          <Button variant="outline-secondary" type="submit">
            Send
          </Button>
        </InputGroup>
      </div>
    </Form>
  );
};

export default SendMessageForm;