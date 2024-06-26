import axios from 'axios';
import React, { useEffect  }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../contexts/useAuth';
import { selectors, addChannels, setCurrentChannel } from '../slices/channelsSlice';
import { selectors1, addMessages } from '../slices/messagesSlice';
import SendMessageForm from './SendMessageForm';
import ChannelOptions from './channelHead';
import getModalComponent from './modals/typeModals';

const MainPage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const channels = useSelector(selectors.selectAll);
  const messages = useSelector(selectors1.selectAll);
  const modalType = useSelector((state) => state.modal.modalType);
const { currentChannelId } = useSelector((state) => state.channels);
const currentChannel = channels.find((channel) => channel.id === currentChannelId);
console.log(currentChannelId)

useEffect(() => {
const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
  return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
  };
    const getData = async () => {
      try {
 const channelsResponse = await axios.get('/api/v1/channels', { headers: getAuthHeader() });
dispatch(addChannels(channelsResponse.data));
dispatch(setCurrentChannel(channelsResponse.data[0].id))
console.log('rfyfk', channelsResponse.data)
 const messagesResponse = await axios.get('/api/v1/messages', { headers: getAuthHeader() });
 dispatch(addMessages(messagesResponse.data));
  } catch (error) {
 if(error.isAxiosError) {
  console.log(error.response.status);
 }
    if (error.response && error.response.status === 401) {
auth.logOut();
    }
  }
}
getData();
}, [dispatch, auth]);


return (
  <div className='col p-0 h-100'>
  <div className="d-flex flex-column h-100">
    <div className=".bg-light.mb-4.p-3.shadow-sm.small">
      <div className="col-md-3">
        <p className="m-0">
          <b>
           #{currentChannel ? currentChannel.name : ''}
          </b>
        </p>
      </div>
      <div id="messages-box" className="text-break mb-2">
          {messages.map((message) => (
            <li key={message.id} className="mb-2" style={{ wordBreak: 'break-all' }}>
              <b>{message.username}</b>: {message.body}
            </li>
          ))}
          </div>
          <ChannelOptions />
          {getModalComponent(modalType)}
          <SendMessageForm />
    </div>
  </div>
  </div>
);
          };
export default MainPage;
