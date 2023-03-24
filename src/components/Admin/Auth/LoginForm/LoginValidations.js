import * as yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
  };
}

export function validationsSchemaLogin() {
  return yup.object({
    email: yup
      .string()
      .email("El email no es válido")
      .required("Campo Obligatorio"),
    password: yup.string().required("Campo Obligatorio"),
  });
}
