import {  Button } from 'react-bootstrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannelId } from '../../slices/apiSlece';
import { selectors } from '../../slices/apiSlece';
import { showModal } from '../../slices/uiSlisec';
import { useTranslation } from 'react-i18next';
import Channel  from '../channels/Channel';


const ChannelList = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const channels = useSelector(selectors.selectAll);
    const { currentChannelId } = useSelector((state) => state.channels);
 const changeChannel = (channelId) => {
  dispatch(setCurrentChannelId(channelId));
};
const handleRemoveChannel = (id) => dispatch(showModal({ modalType: 'removing', channelId: id }))
const handleRenameChannel = (id) => dispatch(showModal({ modalType: 'renaming', channelId: id }))


return (
    <>
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>{t('chatPage.channels')}</b>
                <Button 
                    type="button" 
                    className="p-0 text-primary btn btn-group-vertical"
                    onClick={() => dispatch(showModal({ modalType: 'adding', channelId: null }))}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="20"
                        height="20"
                        fill="currentColor"
                    >
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                    <span className="visually-hidden">+</span>
                </Button>
            </div>
            <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            handleChoose={changeChannel}
            currentChannelId={currentChannelId}
            handleRemoveChannel={handleRemoveChannel}
            handleRenameChannel={handleRenameChannel}
          />
        ))}
      </ul>
    </>
  );
};
export default ChannelList;