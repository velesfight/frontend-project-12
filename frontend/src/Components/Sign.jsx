import React from 'react';
import { Button, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import routes from './routes';
import { useTranslation } from 'react-i18next';

const HeaderChat = () => {
  const { logOut, user } = useAuth();
  const { t } = useTranslation();

  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <BootstrapNavbar.Brand as={Link} to={routes.chatPage}>
        {t('logIn.hexletChat')}
        </BootstrapNavbar.Brand>
        {user !== null ? <Button onClick={logOut}>{t('logIn.logOut')}</Button> : null}
      </div>
    </BootstrapNavbar>
  );
};

export default HeaderChat;