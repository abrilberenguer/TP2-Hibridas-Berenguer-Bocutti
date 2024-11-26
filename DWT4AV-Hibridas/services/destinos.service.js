import { readFile, writeFile } from "fs/promises"
import { resolve } from "path"
import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb://localhost:27017");
const db = client.db("AH20232CP1");

// Get destinos
async function getDestinos(filtros = {}) {
    const filterMongo = { eliminado: { $ne: true } };

    if (filtros.clienteId) {
        filterMongo.clienteId = new ObjectId(filtros.clienteId);
    }

    if (filtros.guiaId) {
        filterMongo.guiaId = new ObjectId(filtros.guiaId);
    }

    if (filtros.tematica !== undefined) {
        filterMongo.tematica = { $eq: filtros.tematica };
    }
    if (filtros.puntuacionMayorQue !== undefined || filtros.puntuacionMenorQue !== undefined) {
        filterMongo.$and = [
            { puntuacion: { $gt: parseInt(filtros.puntuacionMayorQue) } },
            { puntuacion: { $lt: parseInt(filtros.puntuacionMenorQue) } },
        ];
    }

    await client.connect();
    return db.collection("Destinos").find(filterMongo).toArray();
}
// Get destino id
async function getDestinoId(id){
    await client.connect()
    return db.collection("Destinos").findOne({_id: new ObjectId(id)});
}
// Agregar destino
async function agregarDestino(destino) {
    await client.connect();

    const nuevoDestino = { ...destino, clienteId: new ObjectId(destino.clienteId), guiaId: new ObjectId(destino.guiaId) };
    const resultado = await db.collection("Destinos").insertOne(nuevoDestino);

    await db.collection("Clientes").updateOne(
        { _id: new ObjectId(destino.clienteId) },
        { $addToSet: { destinos: resultado.insertedId } } 
    );

    await db.collection("Guias").updateOne(
        { _id: new ObjectId(destino.guiaId) },
        { $addToSet: { destinos: resultado.insertedId } } 
    );

    return nuevoDestino; 
}
// Eliminar destino
async function eliminarDestino(id){
    await client.connect();
    const destinoEliminado = await db.collection("Destinos").findOne({ _id: new ObjectId(id) });
    await db.collection("Destinos").updateOne({ _id: new ObjectId(id) }, { $set: { eliminado: true } });
    return destinoEliminado;
}
// Modificar destino 
const modificarDestino = async (id, destinoActualizado) => {
    await client.connect()
    await db.collection("Destinos").replaceOne({ _id: new ObjectId(id) }, destinoActualizado)
    return destinoActualizado
}
// Actualizar destino 
const actualizarDestino = async (id, destinoActualizado) => {
    await client.connect();
    const destinoActual = await db.collection("Destinos").findOne({ _id: new ObjectId(id) });

    const destinoFinal = {
        ...destinoActual,
        ...destinoActualizado 
    };

    await db.collection("Destinos").updateOne({ _id: new ObjectId(id) }, { $set: destinoActualizado });
    return destinoFinal;
}
// Relacionar guías con un destino
async function relacionarGuiaDestino(destinoId, guiaId) {
    await client.connect();
    const result = await db.collection("Destinos").updateOne(
        { _id: new ObjectId(destinoId) },
        { $addToSet: { guias: new ObjectId(guiaId) } }
    );
    return result;
}
// Obtener un destino con guías relacionadas
async function getDestinoConGuias(id) {
    await client.connect();
    return db.collection("Destinos").aggregate([
        { $match: { _id: new ObjectId(id), eliminado: { $ne: true } } },
        {
            $lookup: {
                from: "Guias",
                localField: "guiaId",
                foreignField: "_id",
                as: "guiasRelacionadas"
            }
        }
    ]).toArray();
}


export {
    getDestinoId,
    getDestinos,
    agregarDestino,
    eliminarDestino,
    modificarDestino,
    actualizarDestino,
    getDestinoConGuias,
    relacionarGuiaDestino
}
