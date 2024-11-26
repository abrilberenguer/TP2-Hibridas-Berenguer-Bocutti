import { json } from "express";
import * as service from "../../services/destinos.service.js";

// Get destinos
function getDestinos(req, res) {
    const filtros = req.query
    service.getDestinos(filtros)
        .then((destinos) => res.status(200).json(destinos))
}
// Get destino id
function getDestinoId(req, res) {
    const id = req.params.id
    service.getDestinoId(id)
        .then(destino => res.status(200).json(destino))
}
// Agregar destino 
function agregarDestino(req, res) {
    service.agregarDestino(req.body)
        .then((destino) => res.status(201).json(destino))
        .catch((error) => res.status(400).json({ message: error.message }));
}
// Reemplazar destino 
function reemplazarDestino(req, res) {
    const id = req.params.id
    service.modificarDestino(id, req.body)
        .then((destino) => res.status(201).json(destino))
}
// Actualizar destino 
function actualizarDestino(req, res) {
    const id = req.params.id
    service.actualizarDestino(id, req.body)
        .then(destino => {
            if( destino ) {
                res.status(201).json(destino);
            } else{
                res.status(404).json({error: { message: "No se encuentra el destino" }})
            }
        })
}
// Borrar destino 
function borrarDestino (req, res) {
    const id = req.params.id
    service.eliminarDestino(id)
        .then((id) => res.status(202).json(id))
}

export async function getDestinosByCliente(req, res) {
    const clienteId = req.user.id; 
    try {
        const destinos = await service.getDestinos({ clienteId }); 
        res.status(200).json(destinos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los destinos" });
    }
}

export async function getDestinosByGuias(req, res) {
    const guiaId = req.user.id;
    try {
        const destinos = await service.getDestinos({ guiaId });
        res.status(200).json(destinos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los destinos" });
    }
}


export {
    getDestinos,
    getDestinoId,
    agregarDestino,
    reemplazarDestino,
    actualizarDestino,
    borrarDestino,
}