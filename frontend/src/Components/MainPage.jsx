import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect  } from 'react';
import { useDispatch } from 'react-redux';

  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
  
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
  
    return {};
  };

  const MainPage = () => {
    const dispatch = useDispatch();
    const [channels, setChannels] = useState([]);
    const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
 const { channels } = await axios.get('/api/v1/channels', { headers: getAuthHeader(), });
 dispatch(setChannels(channels));
 const { messages } = await axios.get('/api/v1/messages', { headers: getAuthHeader() });
 dispatch(setMessages(messages));
  } catch (error) {
 console.log(error)
  }
}
getData();
}, [dispatch]);

return (
  <div>
    <h1>Channels:</h1>
    <ul>
      {channels.map(({ channel }) => (
        <li key={channel.id}>{channel.name}</li>
      ))}
    </ul>

    <h1>Messages:</h1>
    <ul>
      {messages.map(message => (
        <li key={message.id}>{message.text}</li>
      ))}
    </ul>
  </div>
);
};
export default MainPage;
