import { createContext } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessage } from '../Components/slices/messagesSlice';

const socket = io.connect('http://localhost:3001');

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

return {
    getNewMessage,
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