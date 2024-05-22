import { createContext } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessage } from '../Components/slices/messagesSlice';
import { useEffect } from 'react';

const socket = io.connect();

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(()=> {
    socket.on('newMessage', (newMessage) => {
      dispatch(addMessage(newMessage)); // Добавление сообщения в store с помощью dispatch
    });
  })
  const apiContextValue = {
    socket, ApiProvider
  }; 

return (
  <ApiContext.Provider value={apiContextValue}>
    {children}
  </ApiContext.Provider>
);
};
export default ApiProvider;

