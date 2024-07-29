
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannelId } from '../../slices/channelsSlice';
import { showModal } from '../../slices/uiSlisec';
import { Dropdown, Button, ButtonGroup, Nav } from 'react-bootstrap';
import React from 'react';
import cn from 'classnames';

const Channel = ({channel}) => {
 const { t } = useTranslation();
 const { currentChannelId } = useSelector((state) => state.channels);
 const variant = channel.id === currentChannelId ? 'secondary' : null;
 const dispatch = useDispatch();
 //const channels = useSelector(selectors.selectAll);

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
            <Nav.Item key={channel.id} className="nav-item w-100">
              {channel.removable ? (
                          <Dropdown as={ButtonGroup} className="d-flex">
                              <Button
                                  type="button"
                                  className={btnClass}
                                  onClick={() => changeChannel(channel.id)}
                                  variant={variant}
                              >
                                  <span className="me-1">#</span>
                                  {channel.name}
                              </Button>
                              <Dropdown.Toggle split variant={variant} className="flex-grow-0">
                              <span className="visually-hidden">{t('chatPage.menu')}</span>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                  <Dropdown.Item onClick={() => dispatch(showModal({ modalType: 'removing', channelId: channel.id }))}>
                                      {t('modals.removeChannel')}
                                  </Dropdown.Item>
                                  <Dropdown.Item onClick={() => dispatch(showModal({ modalType: 'renaming', channelId: channel.id }))}>
                                      {t('modals.renameChannel')}
                                  </Dropdown.Item>
                              </Dropdown.Menu>
                          </Dropdown>
                  ) : (
                          <Button
                              type="button"
                              className={btnClass}
                              key={channel.id}
                              onClick={() => changeChannel(channel.id)}
                              variant={variant}
                          >
                              <span className="me-1">#</span>
                              {channel.name}
                          </Button>
                  )}
 </Nav.Item>
)};
            
export default Channel;