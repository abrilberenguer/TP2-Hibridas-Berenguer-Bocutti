import React from 'react';
import { Link } from 'react-router-dom';
import { useToken } from "../../contexts/session.context";
import '../../index.css';

const Footer = () => {
    const token = useToken();

    return (
        <footer className="footer text-white py-3">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <ul className="list-inline mt-3">
                            {!token ? (
                                <>
                                    <li className="list-inline-item mx-3">
                                        <Link className="text-white text-decoration-none" to="/login">Iniciar Sesión</Link>
                                    </li>
                                    <li className="list-inline-item mx-3">
                                        <Link className="text-white text-decoration-none" to="/register">Registrarse</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="list-inline-item mx-3 ">
                                        <Link className="text-white text-decoration-none " to="/">Inicio</Link>
                                    </li>
                                    <li className="list-inline-item mx-3">
                                        <Link className="text-white text-decoration-none" to="/destinos">Destinos</Link>
                                    </li>
                                    <li className="list-inline-item mx-3">
                                        <Link className="text-white text-decoration-none" to="/clientes">Clientes</Link>
                                    </li>
                                    <li className="list-inline-item mx-3">
                                        <Link className="text-white text-decoration-none" to="/perfil">Mi Perfil</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 text-center">
                        <p>&copy; 2024 Viajes y Destinos | Todos los derechos reservados</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
