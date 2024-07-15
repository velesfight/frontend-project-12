import { Dropdown, Button, ButtonGroup, Col, Nav } from 'react-bootstrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannelId } from '../../slices/channelsSlice';
import { selectors } from '../../slices/channelsSlice';
import { showModal } from '../../slices/uiSlisec';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

const ChannelOptions = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const channels = useSelector(selectors.selectAll);
    const { currentChannelId } = useSelector((state) => state.channels);
 const changeChannel = (channelId) => {
  dispatch(setCurrentChannelId(channelId));
};


const btnClass = cn(
  'w-100',
  'rounded-0',
  'text-start',
  'btn',
  'text-truncate',
);

  return (
    <Col>
      <div className="d-flex mt-1 justify-content-between mb-2 pe-2 p-4">
      <b>{t('chatPage.channels')}</b>
      <Button type="button" text="+" className="p-0 text-primary btn btn-group-vertical"
      onClick={() => dispatch(showModal({ modalType: 'adding', channelId: null }))}>
       <span className="visually-hidden">{t('modals.buttomAdd')}</span>
      </Button>
      </div>
  
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        { channels.map((channel) => {
          return channel.removable ? (
            <Nav.Item key={channel.id}>
            <div role="group" className="nav flex-column nav-pills nav-fill px-2 h-100 d-block">
              <Dropdown as={ButtonGroup} className="w-100 d-flex">
                <button id={channel.id} onClick={() => changeChannel(channel.id)} className={`w-100 rounded-0 text-start text-truncate`} type="button" variant={channel.id === currentChannelId ? 'secondary' : null}>
                  <span className="me-1">#</span>
                  {channel.name}
                </button>
                <Dropdown.Toggle split variant={channel.id === currentChannelId ? 'secondary' : 'light'} className="flex-grow-0 dropdown-toggle-split shoe btn btn-secondary" id="dropdown-split-basic">
                  <span className="visually-hidden">{t('chatPage.menu')}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark">
                  <Dropdown.Item
                    onClick={() => dispatch(showModal({ modalType: 'renaming', channelId: channel.id }))}
                  >
                    {t('modals.renameChannel')}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(showModal({ modalType: 'removing', channelId: channel.id }))}
                  >
                    {t('modals.removeChannel')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Nav.Item>
        )
        : (
          <Nav.Item key={channel.id}>
            <button key={channel.id} type="button" variant={channel.id === currentChannelId ? 'secondary' : 'light'} onClick={() => changeChannel(channel.id)} className={btnClass}>
              #
              {' '}
              {channel.name}
            </button>
          </Nav.Item>
        );
    })}
  </ul>
      </Col>
   )
   }
 export default ChannelOptions;
