import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
const db = client.db("AH20232CP1");

// Obtener todas las guías
async function getEventos(eliminadas = false) {
    await client.connect();
    return db.collection("Eventos").find({ eliminado: { $ne: !eliminadas } }).toArray();
}

// Obtener guía por ID
async function getEventoId(id) {
    await client.connect();
    return db.collection("Eventos").findOne({ _id: new ObjectId(id) });
}

// Obtener destinos vinculados a una guía específica
async function getDestinosEvento(idEvento) {
    await client.connect();

    const eventoExiste = await db.collection("Eventos").findOne({ _id: new ObjectId(idEvento) });
    if (!eventoExiste) {
        throw new Error("Evento no encontrado");
    }

    const destinos = await db.collection("Destinos").find({ eventoId: new ObjectId(idEvento) }).toArray();

    return destinos;
}

// Agregar una nueva guía
async function agregarEvento(evento) {
    await client.connect();
    return db.collection("Eventos").insertOne(evento);
}

// Modificar una guía existente
async function modificarEvento(id, eventoActualizada) {
    await client.connect();
    await db.collection("Eventos").updateOne(
        { _id: new ObjectId(id) },
        { $set: eventoActualizada }
    );
    return eventoActualizada;
}

// Get destinos eventos
async function getDestinosEventos(idEvento) {
    await client.connect();

    const eventoExiste = await db.collection("Eventos").findOne({ _id: new ObjectId(idEvento) });
    if (!eventoExiste) {
        throw new Error("Evento no encontrado");
    }

    const destinos = await db.collection("Destinos").find({ eventoId: idEvento }).toArray();

    return destinos;
}

export {
    getEventos,
    getEventoId,
    getDestinosEvento,
    agregarEvento,
    modificarEvento,
    getDestinosEventos
};
