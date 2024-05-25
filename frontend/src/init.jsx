import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addChannel, removeChannel } from './Components/slices/channelsSlice';
import { useEffect } from 'react';
import ApiContext  from './Components/contexts/ApiContext';

const socket = io.connect();

export const ApiProvider = ({ socket, children }) => {
    const dispatch = useDispatch();

    const addNewCh = socket.on('newChannel', (newChannel) => {
      dispatch(addChannel(newChannel));
    });
    const removeChannel = socket.on('removeChannel', (removeChannnel) => {
      dispatch(removeChannel(removeChannnel))
    });
  };

  const apiContextValue = {
    addChannel,
    removeChannel,
    children,
  }; 


return (
  <ApiContext.Provider value={apiContextValue}>
    {children}
  </ApiContext.Provider>
);
};
export default ApiProvider;

