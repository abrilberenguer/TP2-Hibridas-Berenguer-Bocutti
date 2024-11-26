import yup from "yup";

export const clienteSchema = yup.object({
    nombre: yup
        .string()
        .min(2, "El nombre debe tener al menos 2 caracteres."),
    email: yup
        .string()
        .required("El email es obligatorio."),
    password: yup
        .string()
        .required("La contraseña es obligatoria.")
        .min(6, "La contraseña debe tener al menos 6 caracteres.")
        .max(12, "La contraseña no debe tener más de 12 caracteres.")
        .matches(/[0-9]/, "La contraseña debe tener al menos un número.")
        .matches(/[A-Z]/, "La contraseña debe tener al menos una mayúscula."),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password")], "Las contraseñas deben coincidir.")
        .required("Las contraseñas deben coincidir."),
    imagen: yup
        .string(),
    descripcion: yup
        .string()
        .min(5, "La descripción debe tener al menos 5 caracteres."),
    destinos: yup
        .array()
        .of(yup.string()),
});

export const loginSchema = yup.object({
    email: yup
        .string()
        .email()
        .required("El email es obligatorio."),
    password: yup
        .string()
        .required("La contraseña es obligatoria.")
        .min(6, "La contraseña debe tener al menos 6 caracteres.")
        .max(12, "La contraseña no debe tener más de 12 caracteres.")
        .matches(/[0-9]/, "La contraseña debe tener al menos un número.")
        .matches(/[A-Z]/, "La contraseña debe tener al menos una mayúscula."),
});