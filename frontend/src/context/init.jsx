import { createContext } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessage } from '../Components/slices/messagesSlice';

const socket = io.connect();

const ApiContext = createContext();
export const ApiProvider = ({ children }) => {
    const dispatch = useDispatch();
    
useEffect(() => {

const getNewMessage = (newMessage) => {
    socket.emit('newMessage', newMessage, (response) => {
        console.log(response.status);
    });
socket.on('newMessage', (response) => {
    dispatch(addMessage(response));
  });
}

const getNewChannel = (newChannel) => {
  socket.emit('newChannel', newChannel, (response) => {
console.log(response.status)
  })
  socket.on('newChannel', (response) => {
    dispatch(addChannel(response))
  })
}

return {
    getNewMessage, getNewChannel,
  };
}, [dispatch]);

const apiContextValue = {
    socket,
  }; 

return (
  <ApiContext.Provider value={apiContextValue}>
    {children}
  </ApiContext.Provider>
);
};

export default SocketContext;