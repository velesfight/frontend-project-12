import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store'
import { 
  Dropdown, Button, ButtonGroup, Nav,
} from 'react-bootstrap';
import { setCurrentChannelId } from '../../slices/apiSlice';
import { showModal } from '../../slices/uiSlice';

interface ChannelProps {
  channel: {
    id: number;
    name: string;
    removable: boolean;
  };
  currentChannelId: number;
  handleChoose: (id: number) => void;
  handleRemoveChannel: (id: number) => void;
  handleRenameChannel: (id: number) => void;
}
const Channel: React.FC<ChannelProps> = ({
  channel,
  currentChannelId,
  handleChoose,
  handleRemoveChannel,
  handleRenameChannel,
}) => {
  const { t } = useTranslation();
  const variant: 'secondary' | undefined = channel.id === currentChannelId ? 'secondary' : undefined;
  const dispatch = useDispatch<AppDispatch>();

  const changeChannel = (id: number) => {
    dispatch(setCurrentChannelId(id));
  };

  return (
    <Nav.Item key={channel.id} className="nav-item w-100">
      {channel.removable ? (
        <div role="group" className="d-flex dropdown btn-group">
          <Button
            type="button"
            className="w-100 rounded-0 text-start text-truncate"
            onClick={() => changeChannel(channel.id)}
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
          onClick={() => changeChannel(channel.id)}
          variant={variant}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      )}
    </Nav.Item>
  );
};

export default Channel;
