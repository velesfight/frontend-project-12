import axios from 'axios';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useRef, useState, useEffect } from 'react';
import { useAuth }  from '../contexts/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import routes from './routes.js';

const LoginPage = () => {
const validationSchema = Yup.object().shape({
    username: Yup.string().required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
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
        setAuthFailed(true);
        inputRef.current.select();
        return;
      }
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
          <Form.Label htmlFor="username">Имя</Form.Label>
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
          <Form.Label htmlFor="password">Пароль</Form.Label>
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
          <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="outline-primary">Войти</Button>
      </fieldset>
    </Form>
    <div className="card-footer p-4">
              <div className="text-center">
                <span>{'нет аккаунта?'}</span>
                {' '}
                <Link to={routes.signUpPage}>{('Зарегестрироваться')}</Link>
              </div>
            </div>
  </div>
</div>
</div>
  )
  };

export default LoginPage;
