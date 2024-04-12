import axios from 'axios';
import React, { useEffect  }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth';
import { setChannels } from './slices/channelsSlice';
import { setMessages } from './slices/messagesSlice';


const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
  
    return {};
  };
debugger
  const MainPage = () => {
    const dispatch = useDispatch();
    const auth = useAuth();
    const channels = useSelector(state => state.channels);
    const messages = useSelector(state => state.messages);

  useEffect(() => {
    const getData = async () => {
      try {
 const channelsResponse = await axios.get('/api/v1/channels', { headers: getAuthHeader(), });
 dispatch(setChannels(channelsResponse.data));
 const messagesResponse = await axios.get('/api/v1/messages', { headers: getAuthHeader() });
 dispatch(setMessages(messagesResponse.data));
  } catch (error) {
    if (error.response && error.response.status === 401) {
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
      {channels.length > 0 && channels.map(channel => (
        <li key={channel.id}>{channel.name}</li>
      ))}
    </ul>

    <h1>Messages:</h1>
    <ul>
      {messages.length > 0 && messages.map(message => (
        <li key={message.id}>{message.name}</li>
      ))}
    </ul>
  </div>
);
};
export default MainPage;
