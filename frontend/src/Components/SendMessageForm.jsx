import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { addMessage } from '../slices/messagesSlice';
import { useSocket } from '../contexts/useAuth'


const SendMessageForm = () => {
  const [messageInput, setMessageInput] = useState('');
  const inputRef = useRef(null);
  const { currentChannelId } = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const socket = useSocket();
  const  username = JSON.parse(localStorage.getItem('userId')).username;

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const handleChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if(messageInput !== '') {
    const message = {
      body: messageInput,
      username: username,
      channelId: currentChannelId,
    };
    console.log(message)
    socket.emit('addMessage', message, (response) => {
      if (response.status !== 'ok') {
        console.log(response.status);
      dispatch(addMessage(message));
      setMessageInput('');
      } else {
        console.log('error')
      }
    })
  };
}

  return (
    <Form onSubmit={handleSendMessage}>
      <div className="input-group has-validation">
        <InputGroup>
          <Form.Control
            placeholder="Message"
            aria-label="Chat message"
            name="enterMessage"
            id="enterMessage"
            value={messageInput}
            onChange={handleChange}
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