import React from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import "./Login.scss";
import {
  initialValues,
  validationsSchemaLogin,
} from "../LoginForm/LoginValidations";
import { auth } from "../../../../api"
import { useAuth } from "../../../../hooks"

const loginController = new auth();

export function Login() {

  const {login} = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationsSchemaLogin(),
    validateOnChange: false,
    onSubmit: async (formData) => {
      try {
        //para poder probar una forma seria
        // const response = await await loginController.login(formData);
        // console.log(response);

        const response = await loginController.login(formData);
        //se hace el guardado de los tokens de los usuarios para mantener la sesion activa
        // se guarda dentro del localStorage
        loginController.setAccessToken(response.access);
        loginController.setRefreshToken(response.refresh);
        
        login(response.access)
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form className="login__form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="email"
        placeholder="Correo Electrónico 'ej: 123@gmail.com'"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={ formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Entrar
      </Form.Button>
      
    </Form>
  );
}
