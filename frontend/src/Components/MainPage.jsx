import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect  } from 'react';
import { useDispatch } from 'react-redux';
import useAuth from '../hooks/useAuth';

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
    const auth = useAuth();

  useEffect(() => {
    const getData = async () => {
      try {
 const channelsResponse = await axios.get('/api/v1/channels', { headers: getAuthHeader(), });
 dispatch(setChannels(channelsResponse.data));
 const messagesResponse = await axios.get('/api/v1/messages', { headers: getAuthHeader() });
 dispatch(setMessages(messagesResponse.data));
  } catch (error) {
    if (error.isAxiosError && error.response.status === 401) {
      auth.logOut();
    }
  }
}
getData();
}, [dispatch, auth]);
return (
  <div>
    <h1>Channels:</h1>
    <ul>
      {channels.length > 0 && channels.map(({ channel }) => (
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
