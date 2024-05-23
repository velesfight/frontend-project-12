import { createContext } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addChannel } from '../Components/slices/channelsSlice';
import { useEffect } from 'react';


const socket = io.connect();

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(()=> {
    socket.on('newMessage', (newMessage) => {
      dispatch(addChannel(newMessage)); // Добавление сообщения в store с помощью dispatch
    });
  }, [dispatch]);

  const apiContextValue = {
    socket
  }; 

return (
  <ApiContext.Provider value={apiContextValue}>
    {children}
  </ApiContext.Provider>
);
};
export default ApiContext;

