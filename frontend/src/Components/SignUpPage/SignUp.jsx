import axios from 'axios';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useRef, useState, useEffect } from 'react';
import { useAuth }  from '../contexts/useAuth';
import { useNavigate } from 'react-router-dom';
import routes from '../routes/routes';
import { useTranslation } from 'react-i18next';



const SignUp = () => {
  const { t } = useTranslation();
      const auth = useAuth();
      const [authFailed, setAuthFailed] = useState(false);
      const inputRef = useRef();
      const navigate = useNavigate();
     
      useEffect(() => {
        inputRef.current.focus();
      }, []);

      const validationSchema = Yup.object().shape({
        username: Yup.string().required(t('validation.lenght')).min(3).max(20),
        password: Yup.string().required(t('validation.passwordLength')).min(6),
        passwordConfirmation: Yup.string().required(t('validation.mustMatch')).oneOf([Yup.ref(t('validation.unique'))])
      });
    
      const formik =  useFormik({
        initialValues: {
          username: '',
          password: '',
          passwordConfirmation: '',
        },
        validationSchema,
        onSubmit: async (values) => {
          setAuthFailed(false);
        try {
          const res = await axios.post(routes.signUpPath(), { username: values.username, password: values.password });
          auth.saveToken(JSON.stringify(res.data));
          console.log('resdata', res.data)
          auth.logIn();
          navigate(routes.chatPage());
        } catch (error) {
          if (error.isAxiosError && error.response.status === 409) {
            setAuthFailed(true);
            inputRef.current.select();
            console.log(t('validation.409'))
            return;
          }
          if (error.isAxiosError && error.response.status === 401) {
            setAuthFailed(true);
            console.log(t('errors.unknown'));
          }
          console.log(t('errors.network'))
          throw error;
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
              <Form.Label htmlFor="username">{t('logIn.nameRegistr')}</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                placeholder="username"
                name="username"
                id="username"
                autoComplete="username"
                isInvalid={(formik.errors.username && formik.touched.username) || authFailed}
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
                isInvalid={(formik.errors.password && formik.touched.password) || authFailed}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">{t('logIn.confirmPass')}</Form.Label>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.passwordConfirmation}
                placeholder="confirmPassword"
                name="passwordConfirmation"
                id="confirmPassword"
                autoComplete="new-password"
                isInvalid={
                  (formik.errors.confirmPassword
                  && formik.touched.confirmPassword) || authFailed
                }
                required
              />
              <Form.Control.Feedback type="invalid">{formik.errors.passwordConfirmation}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('logIn.doRegister')}</Button>
          </fieldset>
        </Form>
      </div>
    </div>
    </div>
      )
      };
    
    export default SignUp;
    