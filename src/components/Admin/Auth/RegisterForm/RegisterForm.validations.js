
import * as yup from "yup";

//para la validacion de los datos del formulario se uso yup
export function RegisterFormvalidations() {
  return yup.object({
    email: yup
      .string()
      .email("El email no es valido")
      .required("Campo obligatorio"),
    password: yup.string().required("Campo obligatorio"),
    repeatpassword: yup
      .string()
      .required("Campo obligatorio")
      .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
    conditionsAccepted: yup.bool().isTrue(true)
  });
}
