import { eventosSchema } from "../schemas/eventos.validate.js";

export async function validateEventos(req, res, next){
    try {
        const datosValidados = await eventosSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        req.body = datosValidados
        next()
    } catch (error) {
        res.status(400).json({ message: error.errors })
    }
}