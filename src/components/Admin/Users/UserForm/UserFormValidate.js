import * as Yup from "yup";

export function initialValues() {
  return {
    avatar: "",
    fileAvatar: null,
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    password: "",
  };
}

export function ValidationSchema() {
  return Yup.object({
    firstname: Yup.string().required(true),
    lastname: Yup.string().required(true),
    email: Yup.string().email("El email no es válido").required(true),
    role: Yup.string().required(true),
    password: Yup.string().required(true),
  });
}
