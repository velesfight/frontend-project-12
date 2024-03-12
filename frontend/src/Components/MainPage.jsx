import axios from 'axios';
import React from 'react';
import { useEffect  } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setChannels } from './slices/channelsSlice.js';
import { setMessages } from './slices/messagesSlice.js';

const MainPage = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels) || [];
  const messages = useSelector((state) => state.messages) || [];

  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
  
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
  
    return {};
  };

  useEffect(() => {
    const getData = async () => {
      try {
 const resChan = await axios.get('/api/v1/channels', { headers: getAuthHeader(), });
 dispatch(setChannels(resChan.data));
 const resMes = await axios.get('/api/v1/messages', { headers: getAuthHeader() });
 dispatch(setMessages(resMes.data));
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
