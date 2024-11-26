import yup from "yup";

export const destinoSchema = yup.object({
    lugar: yup
        .string()
        .required("El lugar es obligatorio.")
        .min(2, "El lugar debe tener al menos 2 caracteres."),
    imagen: yup
        .string()
        .required("La imagen es obligatoria."),
    descripcion: yup
        .string()
        .required("La descripción es obligatoria.")
        .min(10, "La descripción debe tener al menos 10 caracteres."),
    atracciones_principales: yup
        .array()
        .of(yup.string().required("Cada atracción principal debe ser válida.")),
    link: yup
        .string()
        .url("El link debe ser una URL válida."),
    tematica: yup
        .string()
        .required("La temática es obligatoria."),
    puntuacion: yup
        .number()
        .required("La puntuación es obligatoria.")
        .positive("La puntuación debe ser un número positivo.")
        .integer("La puntuación debe ser un número entero.")
        .min(1, "La puntuación debe ser al menos 1.")
        .max(10, "La puntuación no puede ser mayor a 10."),
    clienteId: yup
        .array()
        .of(yup.string()),
    guiaId: yup 
    .string(),
    eventoId: yup 
    .string()
});
