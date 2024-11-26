import * as tokenService from "../services/token.service.js"

export async function validateToken(req, res, next){

    try {        
        const token = req.headers["auth-token"]
        if( !token ) return res.status(401).json({ message: "Token no encontrado" })
        const cliente = await tokenService.validarToken(token)
        if( !cliente ) return res.status(401).json({ message: "Token invalido" })
        req.cliente = cliente
        next()
    } catch (error) {
        res.status(401).json({ message: "Token invalido" })
    }

}