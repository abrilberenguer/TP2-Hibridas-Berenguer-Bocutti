import { clienteSchema, loginSchema } from "../schemas/clientes.validate.js";

export async function validateCliente(req, res, next){
    try {
        const datosValidados = await clienteSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        req.body = datosValidados
        next()
    } catch (error) {
        res.status(400).json({ message: error.errors })
    }
}

export async function login(req, res, next) {
    try {
        const datosValidados = await loginSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        req.body = datosValidados
        next()
    } catch (error) {
        res.status(400).json({ message: error.errors })
    }
}