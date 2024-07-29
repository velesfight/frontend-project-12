import axios from 'axios';
import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from './contexts/useAuth';
import { selectors, addChannels, setCurrentChannelId, setCurrentChannel } from '../slices/channelsSlice';
import { selectors1, addMessages } from '../slices/messagesSlice';
import SendMessageForm from './messages/SendMessageForm';
import ChannelList from './channels/ChannelsList';
import getModalComponent from './modals/typeModals';
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify';

const MainPage1 = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useAuth();
  const channels = useSelector(selectors.selectAll);
  const messages = useSelector(selectors1.selectAll);
  const modalType = useSelector((state) => state.modal.modalType);
const { currentChannelId } = useSelector((state) => state.channels);
const currentChannel = channels.find((channel) => channel.id === currentChannelId);

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
  return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
  };

useEffect(() => {

  axios.get('/api/v1/channels', { headers: getAuthHeader() })
  .then((channelsResponse) => {
    dispatch(addChannels(channelsResponse.data));
    dispatch(setCurrentChannelId( channelsResponse.data[0].id));
    dispatch(setCurrentChannel( channelsResponse.data));
  })
  .catch((error) => {
    if (error.response && error.response.status === 401) {
    toast.error(t('errors.network'));
      auth.logOut();
    }
  });

axios.get('/api/v1/messages', { headers: getAuthHeader() })
  .then((messagesResponse) => {
    dispatch(addMessages(messagesResponse.data));
  })
  .catch((error) => {
    if (error.response && error.response.status === 401) {
      toast.error(t('errors.network'));
      auth.logOut();
    }
  });
}, [dispatch, auth, t]);


return (
    <>
      {getModalComponent(modalType)}
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className='row h-100 bg-white flex-md-row'>
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <ChannelList />
          </div>
          <div className="col p-0 h-100 ">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b>#{currentChannel ? currentChannel.name : ''}</b>
                </p>
                <span className="text-muted">
                  {`${t('countMessage.messages', { count: messages.length })}`}
                </span>
              </div>
              <div id="messages-box" className="chat-messages overflow-auto px-5">
                {messages.map((message) => (
                  <div key={message.id} className="text-break mb-2">
                    <b>{message.username}</b>: {message.body}
                  </div>
                ))}
              </div>
              <SendMessageForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

      export default MainPage1;
