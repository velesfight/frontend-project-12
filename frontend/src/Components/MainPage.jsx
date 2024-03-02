import axios from 'axios';
import React, { useState, useSelector, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setChannels } from './slices/channelsSlice';
import { setMessages } from './slices/messagesSlice';

const MainPage = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels);
  const messages = useSelector((state) => state.messages);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
 const resChan = await axios.get('/api/v1/channels', { headers: { Authorization: `Bearer ${localStorage.token}`, } });
 dispatch(setChannels(resChan.data));
 const resMes = await axios.get('/api/v1/messages', { headers: { Authorization: `Bearer ${localStorage.token}`, } });
 dispatch(setMessages(resMes.data));

 setLoading(false);
  } catch (err) {
    setError(err.message);
    setLoading(false);
 console.log(err)
  }
}

getData();
}, [dispatch]);

if (loading) {
  return <p>Loading...</p>;
}

if (error) {
  return <p>Error: {error}</p>;
}

return (
  <div>
    <h1>Channels:</h1>
    <ul>
      {channels.map(channel => (
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
