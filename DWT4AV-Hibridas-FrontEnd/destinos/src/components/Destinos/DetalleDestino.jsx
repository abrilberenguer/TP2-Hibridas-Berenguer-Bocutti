import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as serviceDestino from "../../services/destinos.service";
import * as serviceCliente from "../../services/perfil.service";
import * as serviceGuia from "../../services/guias.service"; 
import * as serviceEvento from "../../services/eventos.service";
import "../../index.css";

const DetalleDestino = () => {
    const [destino, setDestino] = useState({});
    const [cliente, setCliente] = useState({});
    const [guia, setGuia] = useState(null);
    const [evento, setEvento] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        serviceDestino
            .getDestino(id)
            .then((destinoData) => {
                setDestino(destinoData);

                if (destinoData.clienteId) {
                    serviceCliente
                        .getCliente(destinoData.clienteId)
                        .then((clienteData) => setCliente(clienteData))
                        .catch((error) => console.error("Error al obtener cliente:", error));
                }

                if (destinoData.guiaId) {
                    serviceGuia
                        .getGuiaId(destinoData.guiaId)
                        .then((guiaData) => setGuia(guiaData))
                        .catch((error) => console.error("Error al obtener la guía:", error));
                } else {
                    setGuia(null);  
                }

                if (destinoData.eventoId) {
                    serviceEvento
                        .getEventoId(destinoData.eventoId)
                        .then((eventoData) => setEvento(eventoData))
                        .catch((error) => console.error("Error al obtener el evento:", error));
                } else {
                    setEvento(null); 
                }
            })
            .catch((error) => console.error("Error al obtener destino:", error));
    }, [id]);

    return (
        <div className="container">
            <div className="d-flex justify-content-center mt-4 row">
                <h1 className="text-center titulo mb-4">
                    <strong>Detalles</strong>
                </h1>
                <div className="card w-75 mb-5">
                    <h2 className="card-title text-center titulo fs-3">
                        <strong>{destino.lugar}</strong>
                    </h2>
                    <p className="card-text text-center">
                        <strong>Temática:</strong> {destino.tematica}
                    </p>
                    <a href={destino.link} className="card-link">
                        Conocé más
                    </a>
                    <img
                        src={`http://localhost:3333/img/${destino.imagen}`}
                        className="destino-imagen"
                        alt={destino.lugar}
                    />
                    <div className="card-body">
                        <p className="card-text text-center">
                            ⭐Calificación: {destino.puntuacion}
                        </p>
                        <p className="card-text">{destino.descripcion}</p>
                        <ul>
                            {destino.atracciones_principales &&
                                destino.atracciones_principales.map((atraccion, index) => (
                                    <li key={index}>{atraccion}</li>
                                ))}
                        </ul>

                        <div className="text-center">
                        <p>
                            <strong>Guía Turistica: </strong>
                            {guia ? (
                                <>
                                    {" "}
                                    <Link to={`/guias/${guia._id}`} className="card-link">
                                        Conocé más sobre: {guia.nombre}
                                    </Link>
                                </>
                            ) : (
                                "Sin guía disponible"
                            )}
                        </p>
                        </div>

                        <div className="text-center">
                        <p>
                            <strong>Evento: </strong>
                            {evento ? (
                                <>
                                    {" "}
                                    <Link to={`/eventos/${evento._id}`} className="card-link">
                                        Conocé más sobre: {evento.nombre}
                                    </Link>
                                </>
                            ) : (
                                "Sin evento disponible"
                            )}
                        </p>
                        </div>

                        <p className="card-text">
                            <strong>Cliente:</strong> {cliente ? cliente.nombre : "Desconocido"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalleDestino;
