import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useSocket } from '../contexts/useAuth'


const SendMessageForm = () => {
  const [messageInput, setMessageInput] = useState('');
  const inputRef = useRef(null);
  const { currentChannelId } = useSelector((state) => state.channels);
  const socket = useSocket();
  console.log(socket);
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
    
    socket.emit('newMessage', message, (response) => {
      if (response.status === 'ok') {
      setMessageInput('');
      } else {
        console.log(response.status);
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