import jwt from 'jsonwebtoken';
import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient("mongodb://localhost:27017");
const db = client.db("AH20232CP1");
const tokens = db.collection("Tokens");

// Clave secreta para firmar los tokens
const SECRET_KEY = "dwt4av"

export async function crearToken(cliente) {
    const token = jwt.sign({...cliente, password: undefined, passwordConfirm: undefined}, SECRET_KEY, {
        expiresIn: "2h"
    })

    await client.connect()

    await tokens.insertOne({ token: token, cliente_id: cliente._id })

    const payload = jwt.verify(token, SECRET_KEY)
    console.log(payload.exp, new Date().getTime() / 1000)

    return token
}

export async function validarToken(token) {
    try {        
        const payload = jwt.verify(token, SECRET_KEY)
        const sessionActiva = await tokens.findOne({ token, cliente_id: new ObjectId(payload._id) })
        if( !sessionActiva ) throw new Error("Token invalido")

        if( payload.exp < (new Date().getTime() / 1000) ) throw new Error("Token expirado")
        
        return payload
    } catch (error) {
        throw new Error("Token invalido")
    }
}