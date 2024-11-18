import React from 'react';
import { Button, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';
import appRoutes from '../../routes/appRoutes';

const HeaderChat = () => {
  const { logOut, user } = useAuth();
  const { t } = useTranslation();

  return (
    <BootstrapNavbar className="shadow-sm navbar-expand-lg navbar-light bg-white navbar navbar-expand navbar-light">
      <div className="container">
        <BootstrapNavbar.Brand as={Link} to={appRoutes.chatPage()}>
          {t('logIn.hexletChat')}
        </BootstrapNavbar.Brand>
        {user !== null ? <Button type="button" className="btn btn-primary" onClick={logOut}>{t('logIn.logOut')}</Button> : null}
      </div>
    </BootstrapNavbar>
  );
};

export default HeaderChat;
