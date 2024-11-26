import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';
import * as guiasService from '../../services/guias.service.js'; 

const ListadoGuias = () => {
    const [listado, setListado] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchGuias = async () => {
            try {
                const data = await guiasService.getGuias(); 
                setListado(data);
            } catch (err) {
                setError(err.message || 'Error al cargar las guías.');
            } finally {
                setLoading(false);
            }
        };

        fetchGuias();
    }, []); 

    if (loading) {
        return <p className="text-center">Cargando guías...</p>;
    }

    if (error) {
        return <p className="text-center text-danger">Error: {error}</p>;
    }

    if (!listado || listado.length === 0) {
        return (
            <div className="container my-5 col-10">
                <h1 className="text-center mb-3 titulo">
                    <strong>Guías Turísticas</strong>
                </h1>
                <p className="text-center">No hay guías disponibles en este momento.</p>
            </div>
        );
    }

    return (
        <div className="container my-5 col-10">
            <h1 className="text-center mb-3 titulo">
                <strong>Guías Turísticas</strong>
            </h1>
            <div className="row justify-content-center">
                {listado.map((guia) => (
                    <div
                        key={guia._id}
                        className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch mb-4"
                    >
                        <div className="card w-100">
                        <img
                            src={`http://localhost:3333/img/${guia.imagen}`}
                            className="card-image"
                            alt={guia.nombre}
                        />
                            <div className="card-body">
                                <h2 className="card-title text-center">
                                    <strong>{guia.nombre}</strong>
                                </h2>
                                <p className="card-text text-center">USD $ {guia.precio}</p>
                                <p className="card-text text-center">{guia.descripcion}</p>
                                <p className="card-text text-center">
                                    <strong>⭐ Calificación:</strong> {guia.puntuacion}
                                </p>
                                <div className='d-flex justify-content-center'>
                                <Link to={`/guias/${guia._id}`} className="button w-75 text-center text-decoration-none">
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

export default ListadoGuias;
