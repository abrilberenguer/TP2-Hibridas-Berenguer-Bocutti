import { guiasSchema } from "../schemas/guias.validate.js";

export async function validateGuias(req, res, next){
    try {
        const datosValidados = await guiasSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        req.body = datosValidados
        next()
    } catch (error) {
        res.status(400).json({ message: error.errors })
    }
}