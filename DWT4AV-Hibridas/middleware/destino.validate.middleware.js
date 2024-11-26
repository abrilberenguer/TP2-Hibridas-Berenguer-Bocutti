import { destinoSchema } from "../schemas/destinos.validate.js";

export async function validateDestino(req, res, next){
    try {
        const datosValidados = await destinoSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        req.body = datosValidados
        next()
    } catch (error) {
        res.status(400).json({ message: error.errors })
    }
}