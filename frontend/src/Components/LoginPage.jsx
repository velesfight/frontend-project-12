import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';

const LoginPage = () => {
const validationSchema = Yup.object().shape({
    username: Yup.string().required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
  });

  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik =  useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ username, password }) => {
      setAuthFailed(false);
    try {
      const res = await axios.post(routes.loginPath(),  { username, password }) 
      localStorage.setItem('token', res.data);
      auth.logIn();
      const { from } = location.state || { from: { pathname: '/' } };
      navigate(from);
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