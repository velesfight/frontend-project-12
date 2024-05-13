import axios from 'axios';
import React, { useEffect  }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../context/useAuth';
import { selectors, setChannels } from './slices/channelsSlice';
import { selectors1, setMessages } from './slices/messagesSlice';
import { setCurrentChannelId } from './slices/channelsSlice';
import cn from 'classnames';


const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
  
    return {};
  };

  const MainPage = () => {
    const dispatch = useDispatch();
    const auth = useAuth();
    const channels = useSelector(selectors.selectAll);
    const messages = useSelector(selectors1.selectAll);
  const { currentChannelId } = useSelector((state) => state.channels);

  useEffect(() => {
    const getData = async () => {
      try {
 const channelsResponse = await axios.get('/api/v1/channels', { headers: getAuthHeader(), });
 dispatch(setChannels(channelsResponse.data));
 const messagesResponse = await axios.get('/api/v1/messages', { headers: getAuthHeader() });
 dispatch(setMessages(messagesResponse.data));
  } catch (error) {
    console.log(error)
    if (error.response && error.response.status === 401) {
      auth.logOut();
    }
  }
}
getData();
}, [dispatch, auth]);

const changeChannel = (channelId) => {;
  dispatch(setCurrentChannelId(channelId));
};


return (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
  <div className="row h-100 bg-white flex-md-row">
    <ul>
      {channels.length > 0 && channels.map((channel) => (
        <li key={channel.id} onClick={() => changeChannel(channel.id)}>
       <button
                  type="button"
                  onClick={() => changeChannel(channel.id)}
                  className={cn('w-100', 'rounded-0', 'text-start', 'text-truncate', 'btn', {
                    'btn-secondary': channel.id === currentChannelId,
                  })}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </button>
      </li>
      ))}
    </ul>

    <h1>Messages:</h1>
    <ul>
      {messages.length > 0 && messages.map(message => (
        <li key={message.id}>{message.text}</li>
      ))}
    </ul>
    </div>
  </div>
);
};
export default MainPage;
