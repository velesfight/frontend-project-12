import axios from 'axios';
import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../contexts/useAuth';
import { selectors, addChannels, setCurrentChannelId,setCurrentChannel } from '../slices/apiSlece';
import { selectors1, addMessages } from '../slices/messagesSlice';
import SendMessageForm from './messages/SendMessageForm';
import ChannelList from './channels/ChannelsList';
import getModalComponent from './modals/typeModals';
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify';
import routes from './routes/routes';
import { useNavigate } from 'react-router-dom';


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
      const authHeader = { Authorization: `Bearer ${getAuthToken()}` };
      const channelsResponse = await axios.get(routes.channelsPath(), { headers: authHeader });
      dispatch(addChannels(channelsResponse.data));
      dispatch(setCurrentChannelId(channelsResponse.data[0].id));
      dispatch(setCurrentChannel(channelsResponse.data.id));

      const messagesResponse = await axios.get(routes.messagesPath(), { headers: authHeader });
      dispatch(addMessages(messagesResponse.data));
     
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error(t('errors.network'));
        navigate(routes.loginPage());
      }
      console.error('Fetch error:', error);
    }
  };

  fetchData();
}, [dispatch, t, getAuthToken, navigate]);
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
                  {`${t('countMessage.messages', { count: filteredMessages.length })}`}
                </span>
              </div>
              <div id="messages-box" className="chat-messages overflow-auto px-5">
                {filteredMessages.map((message) => (
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
