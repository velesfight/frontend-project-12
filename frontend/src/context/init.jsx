import { createContext } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessage } from '../Components/slices/messagesSlice';

const socket = io.connect();

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const dispatch = useDispatch();
const getNewMessage = (newMessage) =>
    socket.emit('newMessage', newMessage, (response) => {
      if (response.status !== 'ok') {
        console.log(response.status);
      }
    });
    socket.on('newMessage', (newMessage) => {
      dispatch(addMessage(newMessage)); // Добавление сообщения в store с помощью dispatch
    });

    console.log(response)
  const apiContextValue = {
    socket,
    getNewMessage,
  }; 

return (
  <ApiContext.Provider value={apiContextValue}>
    {children}
  </ApiContext.Provider>
);
};
export default ApiProvider;
