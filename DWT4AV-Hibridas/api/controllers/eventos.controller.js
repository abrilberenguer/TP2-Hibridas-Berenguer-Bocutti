import { json } from "express";
import * as service from "../../services/eventos.services.js";

// Obtener todos
function getEventos(req, res) {
    const filtros = req.query;
    service.getEventos(filtros)
        .then((eventos) => res.status(200).json(eventos))
        .catch((error) => res.status(500).json({ message: 'Error al obtener eventos', error }));
}

// Obtener por ID
function getEventoId(req, res) {
    const id = req.params.id
    service.getEventoId(id)
        .then(destino => res.status(200).json(destino))
}

// Agregar nuevo
function agregarEvento(req, res) {
    service.agregarEvento(req.body)
        .then((evento) => res.status(201).json(evento))
        .catch((error) => res.status(400).json({ message: error.message }));
}

// Reemplazar 
function reemplazarEvento(req, res) {
    const id = req.params.id;
    service.modificarEvento(id, req.body)
        .then((evento) => res.status(201).json(evento))
        .catch((error) => res.status(500).json({ message: 'Error al reemplazar evento', error }));
}

// Actualizar 
function actualizarEvento(req, res) {
    const id = req.params.id;
    service.actualizarEvento(id, req.body)
        .then(evento => {
            if (evento) {
                res.status(201).json(evento);
            } else {
                res.status(404).json({ error: { message: "No se encuentra el evento" } });
            }
        })
        .catch((error) => res.status(500).json({ message: 'Error al actualizar el evento', error }));
}

// Borrar 
function borrarEvento(req, res) {
    const id = req.params.id;
    service.eliminarEvento(id)
        .then((evento) => res.status(202).json(evento))
        .catch((error) => res.status(500).json({ message: 'Error al eliminar evento', error }));
}

function getDestinosEventos(req, res) {
    const idEventos = req.params.id;

    service.getDestinosEventos(idEventos)
        .then(destinos => {
            if (destinos.length === 0) {
                return res.status(404).json({ message: "No hay destinos para este cliente." });
            }
            res.status(200).json(destinos);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Error al obtener destinos." });
        });
}

// Relacionar destino con evento
function relacionarDestinoEvento(req, res) {
    const { eventoId, destinoId } = req.body;
    service.relacionarDestinoEvento(eventoId, destinoId)
        .then(() => res.status(200).json({ message: "Destino relacionado con evento exitosamente" }))
        .catch(error => res.status(500).json({ message: "Error al relacionar destino con evento", error }));
}


export {
    getEventos,
    getEventoId,
    agregarEvento,
    reemplazarEvento,
    actualizarEvento,
    borrarEvento,
    getDestinosEventos,
    relacionarDestinoEvento
};
