import axios from 'axios';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useRef, useState, useEffect } from 'react';
import { useAuth }  from '../contexts/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import routes from '../routes/routes';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const { t } = useTranslation();
const validationSchema = Yup.object().shape({
    username: Yup.string().required(t('validation.required')),
    password: Yup.string().required(t('validation.required')),
  });

  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
 
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const formik =  useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);
    try {
      const res = await axios.post(routes.loginPath(), values);
      auth.saveToken(JSON.stringify(res.data));
      auth.logIn();
      navigate(routes.chatPage());
    } catch (err) {
    formik.setSubmitting(false);
      if (err.isAxiosError && err.response.status === 401) {
        toast.error(t('errors.unknown'))
        setAuthFailed(true);
        inputRef.current.select();
        return;
      }
      toast.error(t('errors.network'))
      throw err;
    }
  },
  });
  
return (
<div className="container-fluid">
<div className="row justify-content-center pt-5">
  <div className="col-sm-4">
  <Form onSubmit={formik.handleSubmit} className="p-3">
            <fieldset>
        <Form.Group>
          <Form.Label htmlFor={t('logIn.username')}>Имя</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.username}
            placeholder="username"
            name="username"
            id="username"
            autoComplete="username"
            isInvalid={(formik.errors.username && formik.touched.username)}
            required
            ref={inputRef}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">{t('logIn.password')}</Form.Label>
          <Form.Control
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="password"
            name="password"
            id="password"
            autoComplete="current-password"
            isInvalid={authFailed}
            required
          />
          <Form.Control.Feedback type="invalid" tooltip>{t('validation.loginFailed')}</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="outline-primary">{t('logIn.submit')}</Button>
      </fieldset>
    </Form>
    <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('logIn.noAccount')}</span>
                {' '}
                <Link to={routes.signUpPath()}>{t('logIn.register')}</Link>
              </div>
            </div>
  </div>
</div>
</div>
  )
  };

export default LoginPage;
