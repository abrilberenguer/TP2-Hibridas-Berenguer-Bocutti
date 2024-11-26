import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as serviceGuia from "../../services/guias.service";

const DetalleGuia = () => {
    const [guia, setGuia] = useState(null);
    const { guiaId } = useParams();

    useEffect(() => {
        serviceGuia
            .getGuiaId(guiaId)
            .then((guia) => {
                setGuia(guia);
            })
            .catch((error) => {
                console.error("Error al obtener la guía:", error);
            });
    }, [guiaId]);

    if (!guia) {
        return <p>Cargando detalles de la guía...</p>;
    }

    return (
        <div className="container">
            <h1 className="text-center mt-4 mb-4 titulo">
                <strong>Detalles de la Guía Turística</strong>
            </h1>
            <div className="d-flex justify-content-center">
                <div className="card w-75 mb-5 shadow-lg rounded overflow-hidden">
                    <img
                        src={`http://localhost:3333/img/${guia.imagen}`}
                        className="card-img-top"
                        alt={guia.nombre}
                        style={{ height: "300px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                        <h2 className="card-title text-center titulo fs-3">
                            <strong>{guia.nombre}</strong>
                        </h2>
                        <p className="card-text text-center mb-3">
                            <strong>Valor por persona:</strong> USD$ {guia.precio}
                        </p>
                        <p className="card-text text-center mb-3">
                            <strong>⭐ Calificación:</strong> {guia.puntuacion}
                        </p>
                        <p className="card-text">
                            <strong>Descripción:</strong> {guia.descripcion}
                        </p>
                        <div className="d-flex justify-content-around align-items-center mt-4">
                            <a
                                href={guia.link}
                                className="card-link text-center"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Conocer más
                            </a>
                            <Link
                                to={`/destino/${guia.destinoId}`}
                                className="card-link"
                            >
                                {guia.destino?.lugar || "Ver el Destino"}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalleGuia;
