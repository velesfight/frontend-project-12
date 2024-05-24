import { createContext } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addChannel, removeChannel } from '../Components/slices/channelsSlice';
import { useEffect } from 'react';


const socket = io.connect();

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(()=> {
    socket.on('newChannel', (newChannel) => {
      dispatch(addChannel(newChannel));
    });
    socket.on('removeChannel', (removeChannnel) => {
      dispatch(removeChannel(removeChannnel))
    });
  }, [dispatch]);

  const apiContextValue = {
    socket, ApiProvider
  }; 
  console.log(socket)

return (
  <ApiContext.Provider value={apiContextValue}>
    {children}
  </ApiContext.Provider>
);
};
export default ApiContext;

