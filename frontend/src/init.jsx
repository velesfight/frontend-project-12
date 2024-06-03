import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addChannel, removeChannel, updateChannel } from './slices/channelsSlice';
import { useEffect } from 'react';
import ApiContext  from './contexts/ApiContext';
import { addMessage } from './slices/messagesSlice';

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
    
    socket.on('updateChannel', (updateChannels) => {
      dispatch(updateChannel(updateChannels))
    });

    socket.on('addMessage', (newMessage) => {
      dispatch(addMessage(newMessage))
    })
  }, [dispatch, socket]);
  

return (
  <ApiContext.Provider value={socket}>
    {children}
  </ApiContext.Provider>
);

};
export default ApiProvider;

