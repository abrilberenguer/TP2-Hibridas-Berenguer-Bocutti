import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';

const ListadoDestinos = ({ listado }) => {
    const [tematicaSeleccionada, setTematicaSeleccionada] = useState(''); 

    const destinosFiltrados = tematicaSeleccionada
        ? listado.filter((destino) => destino.tematica === tematicaSeleccionada)
        : listado;

    const tematicas = [...new Set(listado.map((destino) => destino.tematica))];

    return (
        <div className="container my-5 col-10">
            <h1 className="text-center mb-3 titulo">
                <strong>Viajes y Destinos</strong>
            </h1>

            <div className="mb-4 text-center">
                <label htmlFor="filtro-tematica" className="form-label">
                    Filtrar por temática:
                </label>
                <select
                    id="filtro-tematica"
                    className="form-select w-50 mx-auto"
                    value={tematicaSeleccionada}
                    onChange={(e) => setTematicaSeleccionada(e.target.value)}
                >
                    <option value="">Todas</option>
                    {tematicas.map((tematica, index) => (
                        <option key={index} value={tematica}>
                            {tematica}
                        </option>
                    ))}
                </select>
            </div>

            <div className="row justify-content-center">
                {destinosFiltrados.length > 0 ? (
                    destinosFiltrados.map((destino) => (
                        <div
                            key={destino._id}
                            className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch mb-4"
                        >
                            <div className="card w-100">
                                <img
                                    src={`http://localhost:3333/img/${destino.imagen}`}
                                    className="card-image"
                                    alt={destino.lugar}
                                />
                                <div className="card-body">
                                    <h2 className="card-title text-center">
                                        <strong>{destino.lugar}</strong>
                                    </h2>
                                    <p className="card-text text-center">{destino.tematica}</p>
                                    <p className="card-text text-center">{destino.descripcion}</p>
                                    <p className="card-text text-center">
                                        <strong>⭐Calificación:</strong> {destino.puntuacion}
                                    </p>
                                    <a href={destino.link} className="card-link">
                                        Quiero conocer más
                                    </a>
                                    <div className="d-flex justify-content-center">
                                        <Link
                                            to={"destino/" + destino._id}
                                            className="button w-75 text-center text-decoration-none"
                                        >
                                            Ver detalle
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No hay destinos disponibles para esta temática.</p>
                )}
            </div>
        </div>
    );
};

export default ListadoDestinos;
