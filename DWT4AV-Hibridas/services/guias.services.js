import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
const db = client.db("AH20232CP1");

// Obtener todas las guías
async function getGuias(eliminadas = false) {
    await client.connect();
    return db.collection("Guias").find({ eliminado: { $ne: !eliminadas } }).toArray();
}

// Obtener guía por ID
async function getGuiaId(id) {
    await client.connect();
    return db.collection("Guias").findOne({ _id: new ObjectId(id) });
}

// Obtener destinos vinculados a una guía específica
async function getDestinosGuia(idGuia) {
    await client.connect();

    const guiaExiste = await db.collection("Guias").findOne({ _id: new ObjectId(idGuia) });
    if (!guiaExiste) {
        throw new Error("Guía no encontrada");
    }

    const destinos = await db.collection("Destinos").find({ guiaId: new ObjectId(idGuia) }).toArray();

    return destinos;
}

// Agregar una nueva guía
async function agregarGuia(guia) {
    await client.connect();
    return db.collection("Guias").insertOne(guia);
}

// Modificar una guía existente
async function modificarGuia(id, guiaActualizada) {
    await client.connect();
    await db.collection("Guias").updateOne(
        { _id: new ObjectId(id) },
        { $set: guiaActualizada }
    );
    return guiaActualizada;
}

// Get destinos guias
async function getDestinosGuias(idGuia) {
    await client.connect();

    const guiaExiste = await db.collection("Guias").findOne({ _id: new ObjectId(idGuia) });
    if (!guiaExiste) {
        throw new Error("Guia no encontrado");
    }

    const destinos = await db.collection("Destinos").find({ guiaId: idGuia }).toArray();

    return destinos;
}

export {
    getGuias,
    getGuiaId,
    getDestinosGuia,
    agregarGuia,
    modificarGuia,
    getDestinosGuias
};
