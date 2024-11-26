import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';
import * as eventosService from '../../services/eventos.service.js'; 

const ListadoEventos = () => {
    const [listado, setListado] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const data = await eventosService.getEventos(); 
                setListado(data);
            } catch (err) {
                setError(err.message || 'Error al cargar los eventos.');
            } finally {
                setLoading(false);
            }
        };

        fetchEventos();
    }, []); 

    if (loading) {
        return <p className="text-center">Cargando eventos...</p>;
    }

    if (error) {
        return <p className="text-center text-danger">Error: {error}</p>;
    }

    if (!listado || listado.length === 0) {
        return (
            <div className="container my-5 col-10">
                <h1 className="text-center mb-3 titulo">
                    <strong>Eventos</strong>
                </h1>
                <p className="text-center">No hay eventos disponibles en este momento.</p>
            </div>
        );
    }

    return (
        <div className="container my-5 col-10">
            <h1 className="text-center mb-3 titulo">
                <strong>Eventos</strong>
            </h1>
            <div className="row justify-content-center">
                {listado.map((evento) => (
                    <div
                        key={evento._id}
                        className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch mb-4"
                    >
                        <div className="card w-100">
                        <img
                            src={`http://localhost:3333/img/${evento.imagen}`}
                            className="card-image"
                            alt={evento.nombre}
                        />
                            <div className="card-body">
                                <h2 className="card-title text-center">
                                    <strong>{evento.nombre}</strong>
                                </h2>
                                <p className="card-text text-center">USD $ {evento.precio}</p>
                                <p className="card-text text-center">{evento.descripcion}</p>
                                <p className="card-text text-center">
                                    <strong>⭐ Calificación:</strong> {evento.puntuacion}
                                </p>
                                <div className='d-flex justify-content-center'>
                                <Link to={`/eventos/${evento._id}`} className="button w-75 text-center text-decoration-none">
                                    Ver Detalle
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListadoEventos;
