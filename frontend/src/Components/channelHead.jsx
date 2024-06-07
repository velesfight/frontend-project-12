import { Dropdown, Button, ButtonGroup, Col, Nav } from 'react-bootstrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannelId } from '../slices/channelsSlice';
import { selectors } from '../slices/channelsSlice';
import { showModal } from '../slices/uiSlisec';
import cn from 'classnames';


const ChannelOptions = () => {
    const dispatch = useDispatch();
    const channels = useSelector(selectors.selectAll);
    const { currentChannelId } = useSelector((state) => state.channels);
 const changeChannel = (channelId) => {;
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
      <b>{('channels')}</b>
      <Button type="button" text="+" className="p-0 text-primary"
      onClick={() => dispatch(showModal({ modalType: 'adding', channelId: null }))}
    >
       <span className="visually-hidden">+</span>
      </Button>
      </div>
  
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        { channels.map((channel) => {
          return channel.removable
          ? (
            <Nav.Item key={channel.id}>
            <div role="group" className="nav flex-column nav-pills nav-fill px-2 h-100 d-block">
              <Dropdown as={ButtonGroup} className="w-100">
                <button onClick={() => changeChannel(channel.id)} className={`w-100 rounded-0 text-start text-truncate`} type="button" variant={channel.id === currentChannelId ? 'secondary' : null}>
                  <span className="me-1">#</span>
                  {channel.name}
                </button>
  
                <Dropdown.Toggle split variant={channel.id === currentChannelId ? 'secondary' : 'light'} className="flex-grow-0 dropdown-toggle-split" id="dropdown-split-basic">
                  <span className="visually-hidden">{('variant')}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark">
                  <Dropdown.Item
                    onClick={() => dispatch(showModal({ modalType: 'renaming', channelId: channel.id }))}
                  >
                    {('channels.rename')}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(showModal({ modalType: 'removing', channelId: channel.id }))}
                  >
                    {('channels.remove')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Nav.Item>
        )
        : (
          <Nav.Item key={channel.id}>
            <button type="button" variant={channel.id === currentChannelId ? 'secondary' : 'light'} onClick={() => changeChannel(channel.id)} className={btnClass}>
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
