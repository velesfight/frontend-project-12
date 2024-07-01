import React from 'react';
import { Button, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import routes from './routes';

const HeaderChat = () => {
  const { logOut, user } = useAuth();


  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <BootstrapNavbar.Brand as={Link} to={routes.chatPage}>
          {('Hexlet Chat')}
        </BootstrapNavbar.Brand>
        {user !== null ? <Button onClick={logOut}>{('Выйти')}</Button> : null}
      </div>
    </BootstrapNavbar>
  );
};

export default HeaderChat;