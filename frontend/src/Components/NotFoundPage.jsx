import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import routes from './routes/routes';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <Card className="text-center h-100">
      <Card.Body>
        <Card.Text>{t('errors.notFound')}</Card.Text>
        <Link to={routes.loginPage}>{t('errors.home')}</Link>
      </Card.Body>
    </Card>
  );
};

export default NotFoundPage;
