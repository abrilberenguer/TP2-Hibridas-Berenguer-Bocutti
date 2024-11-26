import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as serviceEvento from "../../services/eventos.service";

const DetalleEvento = () => {
    const [evento, setEvento] = useState(null);
    const { eventoId } = useParams();

    useEffect(() => {
        serviceEvento
            .getEventoId(eventoId)
            .then((evento) => {
                setEvento(evento);
            })
            .catch((error) => {
                console.error("Error al obtener el evento:", error);
            });
    }, [eventoId]);

    if (!evento) {
        return <p>Cargando detalles del evento...</p>;
    }

    return (
        <div className="container">
            <h1 className="text-center mt-4 mb-4 titulo"><strong>Sobre el Evento</strong></h1>
            <div className="card w-75 mx-auto mb-5">
                <div className="row g-0">
                    <div className="col-lg-6 col-12">
                        <img
                            src={`http://localhost:3333/img/${evento.imagen}`}
                            className="img-fluid rounded-start w-100 h-100"
                            alt={evento.nombre}
                        />
                    </div>

                    <div className="col-lg-6 col-12 d-flex flex-column justify-content-center">
                        <div className="card-body">
                            <h2 className="card-title text-center titulo fs-3"><strong>{evento.nombre}</strong></h2>
                            <a href={evento.link} className="card-link d-block text-center" target="_blank" rel="noopener noreferrer">
                                Link al Evento
                            </a>
                            <p className="card-text text-center">
                                <strong>Valor por persona:</strong> USD$ {evento.precio}
                            </p>
                            <p className="card-text text-center">
                                <strong>⭐ Calificación:</strong> {evento.puntuacion}
                            </p>
                            <p className="card-text">
                                <strong>Descripción:</strong> {evento.descripcion}
                            </p>
                            <p className="text-center">
                                <Link to={`/destino/${evento.destinoId}`} className="card-link">
                                    {evento.destino?.lugar || "Ver el Destino"}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalleEvento;
