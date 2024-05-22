import axios from 'axios';
import React, { useEffect  }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../context/useAuth';
import { selectors, setChannels } from './slices/channelsSlice';
import { selectors1, addMessages } from './slices/messagesSlice';
import { setCurrentChannelId } from './slices/channelsSlice';
import cn from 'classnames';
import SendMessageForm from '../SendMessageForm';
import Add from '../Components/modals/Add'



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
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  //const currentChannelMessages = messages
    //.filter((message) => message.channelId === currentChannelId);


  useEffect(() => {
    const getData = async () => {
      try {
 const channelsResponse = await axios.get('/api/v1/channels', { headers: getAuthHeader(), });
 dispatch(setChannels(channelsResponse.data));
 const messagesResponse = await axios.get('/api/v1/messages', { headers: getAuthHeader() });
 dispatch(addMessages(messagesResponse.data));
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
      <div className="col-md-3">
        <p className="m-0">
          <b>
            #{currentChannel ? currentChannel.name : ''}
          </b>
        </p>
        <ul>
          {channels.length > 0 && channels.map((channel) => (
            <li key={channel.id} onClick={() => changeChannel(channel.id)}>
              <button
                type="button"
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
      </div>
      <div className="col-md-9">
        <ul>
          {messages.map((message) => (
            <li key={message.id} className="mb-2" style={{ wordBreak: 'break-all' }}>
              <b>{message.username}</b>: {message.body}
            </li>
          ))}
        </ul>
        <SendMessageForm />
        <Add />
      </div>
    </div>
  </div>
);
          };
export default MainPage;
