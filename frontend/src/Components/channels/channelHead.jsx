import { Dropdown, Button, ButtonGroup, Nav } from 'react-bootstrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannelId } from '../../slices/channelsSlice';
import { selectors } from '../../slices/channelsSlice';
import { showModal } from '../../slices/uiSlisec';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

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
  <>
  <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
    <b>{t('chatPage.channels')}</b>
    <Button type="button" text="+" className="p-0 text-primary btn btn-group-vertical"
    onClick={() => dispatch(showModal({ modalType: 'adding', channelId: null }))}>
      <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 16 16"
  width="20"
  height="20"
  fill="currentColor"
>
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
</svg>
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
            <div role="group" className="d-flex dropdown btn-group">
              <Button id={channel.id} onClick={() => changeChannel(channel.id)} className={btnClass} type="button" variant={channel.id === currentChannelId ? 'secondary' : 'light'}>
                <span className="me-1">#</span>
                {channel.name}
              </Button>
              <Dropdown as={ButtonGroup} className="w-100 d-flex">
              <Dropdown.Toggle split variant={channel.id === currentChannelId ? 'secondary' : 'light'} className="flex-grow-0 dropdown-toggle-split" aria-expanded="false">
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
</div>
</>
)}
export default ChannelOptions;
