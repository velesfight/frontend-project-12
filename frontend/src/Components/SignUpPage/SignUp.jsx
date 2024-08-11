import axios from 'axios';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useRef, useState, useEffect } from 'react';
import { useAuth }  from '../contexts/useAuth';
import { useNavigate } from 'react-router-dom';
import routes from '../routes/routes';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';



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
        username: Yup.string().required(t('validation.required')).min(3, (t('validation.length'))).max(20, (t('validation.length'))),
        password: Yup.string().required(t('validation.required')).min(6, (t('validation.passwordLength'))),
        passwordConfirmation: Yup.string().required(t('validation.required')).oneOf([Yup.ref('password'), null], t('validation.mustMatch')),
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
          auth.logIn();
          navigate(routes.chatPage());
        } catch (error) {
          if (error.response.status === 409) {
            setAuthFailed(true);
            inputRef.current.select();
            toast.error(t('validation.409'))
          }
          if (error.isAxiosError && error.response.status === 401) {
            setAuthFailed(true);
            toast.error(t('errors.unknown'));
          }
          console.log(t('errors.network'))
          throw error;
        }
      },
      });


    return (
     <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div>
                <img
                  src="https://github.com/hexlet-components/js-react-hexlet-chat/blob/main/frontend/src/assets/avatar_1.jpg?raw=true"
                  className="rounded-circle"
                  alt={t('signup.header')}
                />
              </div>
      <Form onSubmit={formik.handleSubmit} className="w-50">
      <h1 className="text-center mb-4">{t('logIn.register')}</h1>
            <Form.Group className="form-floating mb-3">
              <Form.Control
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                placeholder={t('validation.length')}
                name="username"
                id="username"
                autoComplete="username"
                isInvalid={(formik.errors.username && formik.touched.username)|| authFailed}
                required
                ref={inputRef}
              />
               <Form.Label htmlFor="username">{t('logIn.nameRegistr')} </Form.Label>
               <Form.Control.Feedback
                   type="invalid"
                   tooltip>
                     {formik.errors.username}
                  </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="form-floating mb-3">
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                placeholder={t('logIn.passwordLength')}
                name="password"
                id="password"
                autoComplete="current-password"
                isInvalid={(formik.errors.password && formik.touched.password) || authFailed}
                required
              />
               <Form.Label htmlFor="password">{t('logIn.password')}</Form.Label>
               <Form.Control.Feedback 
               type="invalid"
               tooltip>
                {formik.errors.password}
               </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="form-floating mb-4">
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirmation}
                placeholder={t('logIn.mustMatch')}
                name="passwordConfirmation"
                id="confirmPassword"
                autoComplete="new-password"
                isInvalid={
                  (formik.errors.passwordConfirmation
                  && formik.touched.passwordConfirmation) || authFailed
                }
                required
              />
              <Form.Label htmlFor="password">{t('logIn.confirmPass')}</Form.Label>
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.passwordConfirmation}
                </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('logIn.doRegister')}</Button>
        </Form>
        </div>
        </div>
      </div>
    </div>
    </div>
      )
      };
    
    export default SignUp;
    