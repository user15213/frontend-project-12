import { Formik, Form, Field } from "formik";

export default function Login() {
  const initialValues = { username: "", password: "" };
  const onSubmit = (values) => {
    console.log("Значения формы:", values);

  };

  return (
    <div>
      <h1>Вход в систему</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <div>
            <label htmlFor="username">Имя пользователя</label>
            <Field id="username" name="username" placeholder="Введите логин" />
          </div>
          <div>
            <label htmlFor="password">Пароль</label>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="Введите пароль"
            />
          </div>
          <button type="submit">Войти</button>
        </Form>
      </Formik>
    </div>
  );
}
