import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';

const LoginPage = () => {
const validationSchema = Yup.object().shape({
    username: Yup.string().required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
  });

return (
<Formik
  initialValues={{ username: "", password: "" }}
  validationSchema={validationSchema}>
  {() => (
    <Form>
        <h1>Войти</h1>
      <div className="form-group">
        <label htmlFor="username">Имя</label>
        <Field
          type="username"
          name="username"
          className="form-control"
        />
        <ErrorMessage component="div" name="username" className="invalid-feedback"/>
      </div>
      <div className="form-group">
        <label htmlFor="password">Пароль</label>
        <Field
          type="password"
          name="password"
          className="form-control"
        />
        <ErrorMessage component="div" name="email" className="invalid-feedback"/>
      </div>
      <Button type="submit" >
        Войти
      </Button>
    </Form>
  )}
</Formik>
)
}


export default LoginPage;