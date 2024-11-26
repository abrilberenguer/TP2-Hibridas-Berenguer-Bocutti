import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { crearToken } from "../services/token.service.js"

const client = new MongoClient("mongodb://localhost:27017");
const db = client.db("AH20232CP1");

// Clave secreta para firmar los tokens
const SECRET_KEY = "dwt4av";

// Get Clientes
async function getClientes(eliminados = false){
    await client.connect()
    return db.collection("Clientes").find({ "eliminado": { "$ne": !eliminados } }).toArray();
}
// Get clientes id
async function getClienteId(id){
    await client.connect()
    return db.collection("Clientes").findOne({_id: new ObjectId(id)});
}
// Agregar clientes
async function agregarCliente(cliente) {
    console.log(cliente);
    
    await client.connect();
    const existe = await db.collection("Clientes").findOne({ email: cliente.email });

    if (existe) {
        throw new Error("El email ya está en uso.");
    }
    const nuevoCliente = {...cliente, passwordConfirm: undefined };
    nuevoCliente.password = await bcrypt.hash(cliente.password, 10);

    await db.collection("Clientes").insertOne(nuevoCliente);
    
    return {...nuevoCliente, password: undefined};
}
//Login
export async function login(cliente) {
    await client.connect();
    const existe = await db.collection("Clientes").findOne({ email: cliente.email });

    if (!existe)  throw new Error("No se pudo loguear.")

    const esValido = await bcrypt.compare(cliente.password, existe.password);
    if (!esValido) throw new Error("No se pudo loguear.") 

    const token = await crearToken(existe)

    return {...existe, token: token, password: undefined, passwordConfirm: undefined};
}
// Eliminar cliente
async function eliminarCliente(id){
    await client.connect();
    const clienteEliminado = await db.collection("Clientes").findOne({ _id: new ObjectId(id) });
    await db.collection("Clientes").updateOne({ _id: new ObjectId(id) }, { $set: { eliminado: true } });
    return clienteEliminado;
}
// Modificar cliente
const modificarCliente = async (id, clienteActualizado) => {
    await client.connect()
    await db.collection("Clientes").replaceOne({ _id: new ObjectId(id) }, clienteActualizado)
    return clienteActualizado
}
// Actualizar cliente
const actualizarCliente = async (id, clienteActualizado) => {
    await client.connect();
    const clienteActual = await db.collection("Clientes").findOne({ _id: new ObjectId(id) });

    const clienteFinal = {
        ...clienteActual,
        ...clienteActualizado 
    };

    await db.collection("Clientes").updateOne({ _id: new ObjectId(id) }, { $set: clienteActualizado });
    return clienteFinal;
}
// Get destinos clientes
async function getDestinosCliente(idCliente) {
    await client.connect();

    const clienteExiste = await db.collection("Clientes").findOne({ _id: new ObjectId(idCliente) });
    if (!clienteExiste) {
        throw new Error("Cliente no encontrado");
    }

    const destinos = await db.collection("Destinos").find({ clienteId: idCliente }).toArray();

    return destinos;
}
// Get Client
export async function getClient(id) {
    await client.connect()

    const existe = await db.collection("Clientes").findOne({ _id: new ObjectId(id) });

    if(!existe) throw new Error("No se pudo obtener el usuario")
    
    return {...existe, password: undefined}
}
// Get Profile
export async function getProfile(id) {
    await client.connect();
    
    const cliente = await db.collection("Clientes").findOne({ _id: new ObjectId(id) });
    if (!cliente) throw new Error("No se pudo obtener el usuario");

    const destinos = await db.collection("Destinos").find({ clienteId: new ObjectId(id) }).toArray();

    return { ...cliente, destinos }; 
}


export {
    getClientes,
    getClienteId,
    agregarCliente,
    eliminarCliente,
    modificarCliente,
    actualizarCliente,
    getDestinosCliente
}