import yup from "yup";

export const guiasSchema = yup.object({
    nombre: yup
        .string()
        .required("El nombre es obligatorio.")
        .min(2, "El nombre debe tener al menos 2 caracteres."),
    destinoId: yup
        .string()
        .required("El destino es obligatorio."),
    imagen: yup
        .string()
        .required("La imagen es obligatoria."),
    descripcion: yup
        .string()
        .required("La descripción es obligatoria.")
        .min(10, "La descripción debe tener al menos 10 caracteres."),
    precio: yup
        .number()
        .required("El precio es obligatorio.")
        .positive("El precio debe ser un número positivo.")
        .min(1, "El precio debe ser al menos 1."),
    puntuacion: yup
        .number()
        .positive("La puntuación debe ser un número positivo.")
        .integer("La puntuación debe ser un número entero.")
        .min(1, "La puntuación debe ser al menos 1.")
        .max(10, "La puntuación no puede ser mayor a 10."),
    link: yup
        .string()
        .url("El link debe ser una URL válida."),
});
