import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannelId } from '../../slices/apiSlece';
import { showModal } from '../../slices/uiSlisec';
import { Dropdown, Button, ButtonGroup, Nav } from 'react-bootstrap';
import React from 'react';


const Channel = ({channel}) => {
 const { t } = useTranslation();
 const { currentChannelId } = useSelector((state) => state.channels);
 const variant = channel.id === currentChannelId ? 'secondary' : null;
 console.log('hhh', currentChannelId)
 const dispatch = useDispatch();

const changeChannel = (id) => {
dispatch(setCurrentChannelId(id));
};


return (
            <Nav.Item key={channel.id} className="nav-item w-100">
              {channel.removable ? (
                <div role="group" className="d-flex dropdown btn-group">
                              <Button
                                  type="button"
                                  className="w-100 rounded-0 text-start text-truncate"
                                  onClick={() => dispatch(changeChannel(channel.id))}
                                  variant={variant}
                              >
                                  <span className="me-1">#</span>
                                  {channel.name}
                              </Button>
                              <Dropdown as={ButtonGroup} className="d-flex">
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
                          </div>
                  ) : (
                          <Button
                              type="button"
                              className="w-100 rounded-0 text-start"
                              key={channel.id}
                              onClick={() => dispatch(changeChannel(channel.id))}
                              variant={variant}
                          >
                              <span className="me-1">#</span>
                              {channel.name}
                          </Button>
                  )}
 </Nav.Item>
)};
            
export default Channel;