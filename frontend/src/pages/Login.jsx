import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/auth/authSlice'

const loginSchema = Yup.object({
  username: Yup.string().required('Введите имя пользователя'),
  password: Yup.string().required('Введите пароль'),
})

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token, status, error } = useSelector(state => state.auth)


  useEffect(() => {
    if (token) {
      navigate('/', { replace: true })
    }
  }, [token, navigate])

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(loginUser(values))
      .unwrap()
      .catch(() => {})
      .finally(() => setSubmitting(false))
  }

  return (
    <div style={{ maxWidth: 320, margin: '2rem auto' }}>
      <h1>Вход</h1>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="username">Имя пользователя</label>
              <Field id="username" name="username" />
              <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
            </div>

            <div style={{ marginTop: 12 }}>
              <label htmlFor="password">Пароль</label>
              <Field
                id="password"
                name="password"
                type="password"
              />
              <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
            </div>

            {status === 'failed' && (
              <div style={{ color: 'red', marginTop: 12 }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={isSubmitting} style={{ marginTop: 20 }}>
              {status === 'loading' ? 'Загрузка...' : 'Войти'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
