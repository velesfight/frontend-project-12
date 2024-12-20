import axios from 'axios';
import React, { useEffect } from 'react';
import { animateScroll } from 'react-scroll';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { selectors, addChannels, setCurrentChannelId } from '../slices/apiSlice';
import { selectors1, addMessages } from '../slices/messagesSlice';
import SendMessageForm from '../Components/messages/SendMessageForm';
import ChannelList from '../Components/channels/ChannelsList';
import getModalComponent from '../Components/modals/typeModals';
import apiRoutes from '../routes/apiRoutes';
import appRoutes from '../routes/appRoutes';
import getAuthHeaders from '../headers';

const MainPage1 = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAuthToken } = useAuth();
  const channels = useSelector(selectors.selectAll);
  const messages = useSelector(selectors1.selectAll);
  const modalType = useSelector((state) => state.modal.modalType);
  const { currentChannelId } = useSelector((state) => state.channels);
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const filteredMessages = messages.filter((message) => message.channelId === currentChannelId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelsResponse = await axios.get(
          apiRoutes.channelsPath(),
          getAuthHeaders(getAuthToken()),
        );
        dispatch(addChannels(channelsResponse.data));
        dispatch(setCurrentChannelId(channelsResponse.data[0].id));
        const messagesResponse = await axios.get(
          apiRoutes.messagesPath(),
          getAuthHeaders(getAuthToken()),
        );
        dispatch(addMessages(messagesResponse.data));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error(t('errors.network'));
          navigate(appRoutes.loginPage());
        }
        console.error('Fetch error:', error);
      }
    };
    fetchData();
  }, [dispatch, t, getAuthToken, navigate]);

  useEffect(() => {
    const argument = { containerId: 'messages-box', delay: 0, duration: 0 };
    animateScroll.scrollToBottom(argument);
  }, [messages.length]);
  useEffect(() => {
    const argument = { containerId: 'channels-box', delay: 0, duration: 0 };
    const lastChannel = channels[channels.length - 1];
    const generalChannel = channels.find((channel) => channel.name === 'general');
    if (currentChannelId === generalChannel?.id) {
      animateScroll.scrollToTop(argument);
    } else if (currentChannelId === lastChannel?.id) {
      animateScroll.scrollToBottom(argument);
    }
  }, [currentChannelId, channels]);

  return (
    <>
      {getModalComponent(modalType)}
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <ChannelList />
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b>
                    #
                    {currentChannel ? currentChannel.name : ''}
                  </b>
                </p>
                <span className="text-muted">
                  {`${t('countMessage.messages', { count: filteredMessages.length })}`}
                </span>
              </div>
              <div id="messages-box" className="chat-messages overflow-auto px-5">
                {filteredMessages.map((message) => (
                  <div key={message.id} className="text-break mb-2">
                    <b>{message.username}</b>
                    :
                    {message.body}
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
