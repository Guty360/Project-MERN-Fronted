import React, { useState } from "react";
import "./RegisterForm.scss";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { auth } from "../../../../api";
import { RegisterFormvalidations } from "./RegisterForm.validations" //validaciones del formulario

function initialDatas(){
    return {
        email: "",
        password: "",
        repeatpassword: "",
        conditionsAccepted: false
    }
}

const authController = new auth();

export function RegisterForm(props) {

  const { openLogin } = props;
  
  const [error, seterror] = useState("");

  const formik = useFormik({
    initialValues: initialDatas(),
    validationSchema: RegisterFormvalidations(),
    validateOnChange: false, //esto es para que se valida al enviar los datos y no mientras el usuario escribe
    onSubmit: async (formValue) => {
        try {
          seterror("");
          await authController.register(formValue);
          openLogin();
        } catch (error) {
         seterror("Error al registrar un usuario!")
        }
      },
  });

  return (
    <Form className="register-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="email"
        placeholder="Correo Electrónico 'ej: 123@gmail.com'"
        onChange={ formik.handleChange }
        value={ formik.values.email }
        error={ formik.errors.email } //manejo de la excepcion del fallo 
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        value={formik.values.password}//asignar el valor del campo y poder guardarlo
        error={ formik.errors.password }
      />
      <Form.Input
        name="repeatpassword"
        type="password"
        placeholder="Repetir Contraseña"
        onChange={formik.handleChange}
        value={ formik.values.repeatpassword }
        error={ formik.errors.repeatpassword }
      />
      <Form.Checkbox
        name="conditionsAccepted"
        label="He leído y acepto las políticas de privacidad"
        onChange={ (_, data) => 
                formik.setFieldValue("conditionsAccepted", data.checked)
        }
        checked={formik.values.conditionsAccepted}
        error={ formik.errors.conditionsAccepted }
      />
      <Form.Button type="submit" primary fluid loading={ formik.isSubmitting } >
        Crear Cuenta
      </Form.Button>

      <p className="register-form__error">{error}</p>
    </Form>
  );
}
