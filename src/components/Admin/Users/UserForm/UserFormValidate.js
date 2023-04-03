import * as Yup from "yup";

export function initialValues(user) {
  return {
    avatar: user?.avatar || "",
    fileAvatar: null,
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    role: user?.role || "",
    password: "",
  };
}

export function ValidationSchema(user) {
  return Yup.object({
    firstName: Yup.string().required(true),
    lastName: Yup.string().required(true),
    email: Yup.string().email("El email no es válido").required(true),
    role: Yup.string().required(true),
    password: user ? Yup.string() : Yup.string().required(true),
  });
}
