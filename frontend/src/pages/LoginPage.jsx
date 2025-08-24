import axios from 'axios';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth.ts';
import apiRoutes from '../routes/apiRoutes';
import appRoutes from '../routes/appRoutes';
import avatar from '../assets/avatar.jpg';

const LoginPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(t('validation.required')),
    password: Yup.string().required(t('validation.required')),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(apiRoutes.loginPath(), values);
        auth.logIn(res.data);
        navigate(appRoutes.chatPage());
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          toast.error(t('errors.unknown'));
          return;
        }
        toast.error(t('errors.network'));
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={avatar}
                  className="rounded-circle"
                  alt={t('logIn.alt')}
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('logIn.submit')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder={t('logIn.username')}
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={formik.errors.username && formik.touched.username}
                    required
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">{t('logIn.username')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder={t('logIn.password')}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={authFailed}
                    required
                  />
                  <Form.Label htmlFor="password">{t('logIn.password')}</Form.Label>
                  {authFailed && (
                    <Form.Control.Feedback type="invalid" tooltip>
                      {t('validation.loginFailed')}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">
                  {t('logIn.submit')}
                </Button>
              </Form>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>{t('logIn.noAccount')}</span>
                  {' '}
                  <Link to={apiRoutes.signUpPath()}>{t('logIn.register')}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
