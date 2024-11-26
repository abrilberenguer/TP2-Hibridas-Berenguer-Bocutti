import { json } from "express";
import * as service from "../../services/guias.services.js";

// Obtener todas las guías turísticas
function getGuias(req, res) {
    const filtros = req.query;
    service.getGuias(filtros)
        .then((guias) => res.status(200).json(guias))
        .catch((error) => res.status(500).json({ message: 'Error al obtener guías', error }));
}

// Obtener una guía turística por ID
function getGuiaId(req, res) {
    const id = req.params.id
    service.getGuiaId(id)
        .then(destino => res.status(200).json(destino))
}

// Agregar nueva guía turística
function agregarGuia(req, res) {
    service.agregarGuia(req.body)
        .then((guia) => res.status(201).json(guia))
        .catch((error) => res.status(400).json({ message: error.message }));
}

// Reemplazar una guía turística
function reemplazarGuia(req, res) {
    const id = req.params.id;
    service.modificarGuia(id, req.body)
        .then((guia) => res.status(201).json(guia))
        .catch((error) => res.status(500).json({ message: 'Error al reemplazar guía', error }));
}

// Actualizar información de una guía turística
function actualizarGuia(req, res) {
    const id = req.params.id;
    service.actualizarGuia(id, req.body)
        .then(guia => {
            if (guia) {
                res.status(201).json(guia);
            } else {
                res.status(404).json({ error: { message: "No se encuentra la guía" } });
            }
        })
        .catch((error) => res.status(500).json({ message: 'Error al actualizar la guía', error }));
}

// Borrar una guía turística
function borrarGuia(req, res) {
    const id = req.params.id;
    service.eliminarGuia(id)
        .then((guia) => res.status(202).json(guia))
        .catch((error) => res.status(500).json({ message: 'Error al eliminar guía', error }));
}

// Obtener destinos de un cliente por id
function getDestinosGuias(req, res) {
    const idGuias = req.params.id;

    service.getDestinosGuias(idGuias)
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

// Relacionar destino con guía
function relacionarDestinoGuia(req, res) {
    const { guiaId, destinoId } = req.body;
    service.relacionarDestinoGuia(guiaId, destinoId)
        .then(() => res.status(200).json({ message: "Destino relacionado con guía exitosamente" }))
        .catch(error => res.status(500).json({ message: "Error al relacionar destino con guía", error }));
}


export {
    getGuias,
    getGuiaId,
    agregarGuia,
    reemplazarGuia,
    actualizarGuia,
    borrarGuia,
    getDestinosGuias,
    relacionarDestinoGuia
};
