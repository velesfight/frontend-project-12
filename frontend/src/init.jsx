import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addChannel, removeChannel } from './Components/slices/channelsSlice';
import { useEffect } from 'react';
import ApiContext  from './Components/contexts/ApiContext';

export const ApiProvider = ({ children }) => {
    const dispatch = useDispatch();

    const socket = io.connect();
    useEffect(() => {
    socket.on('newChannel', (newChannel) => {
      dispatch(addChannel(newChannel));
    });
  
    socket.on('removeChannel', (removeChannnel) => {
      dispatch(removeChannel(removeChannnel))
    });
  }, [dispatch, socket]);


return (
  <ApiContext.Provider value={socket}>
    {children}
  </ApiContext.Provider>
);

};
export default ApiProvider;

