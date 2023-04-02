import React, { useCallback } from "react";
import { Form, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { initialValues, ValidationSchema } from "./UserFormValidate";
import { image } from "../../../../assets";
import { Users } from "../../../../api";
import { useAuth } from "../../../../hooks";
import "./UserFrom.scss";

const userController = new Users();

export function UserForm(props) {
  const { close, onReload, user } = props;
  const { accesToken } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: ValidationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userController.createUser(accesToken, formValue);
        close();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    formik.setFieldValue("avatar", URL.createObjectURL(file));
    formik.setFieldValue("fileAvatar", file);
  });

  const getAvatar = () => {
    if (formik.values.fileAvatar) {
      return formik.values.avatar;
    }
    return image.noAvatar;
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop,
  });
  return (
    <Form className="user-form" onSubmit={formik.handleSubmit}>
      <div className="user-form__avatar" {...getRootProps()}>
        <input {...getInputProps()} />
        <Image avatar size="small" src={getAvatar()} />
      </div>
      <Form.Group widths={"equal"}>
        <Form.Input
          name="firstName"
          placeholder="Nombre"
          onChange={formik.handleChange}
          value={formik.values.firstName}
          error={formik.errors.firstName}
        ></Form.Input>
        <Form.Input
          name="lastName"
          placeholder="Apellidos"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          error={formik.errors.lastName}
        ></Form.Input>
      </Form.Group>

      <Form.Group widths={"equal"}>
        <Form.Input
          name="email"
          placeholder="Correo Electrónico"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        ></Form.Input>
        <Form.Dropdown
          placeholder="Selecciona Un Rol"
          options={roleOptions}
          selection
          onChange={(_, data) => formik.setFieldValue("role", data.value)}
          value={formik.values.role}
          error={formik.errors.role}
        ></Form.Dropdown>
      </Form.Group>

      <Form.Input
        type="password"
        name="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <Form.Button
        type="submit"
        primary
        animated
        fluid
        loading={formik.isSubmitting}
      >
        {user ? "Actualizar Usuario" : "Crear Usuario"}
      </Form.Button>
    </Form>
  );
}

const roleOptions = [
  {
    key: "user",
    text: "Usuario",
    value: "user",
  },
  {
    key: "admin",
    text: "Administrador",
    value: "admin",
  },
];
