import React from 'react';
import { Link } from 'react-router-dom';
import { useToken } from "../../contexts/session.context";
import '../../index.css'

const NavBar = () => {
    const token = useToken();

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand text-white" to="/">Viajes y Destinos</Link>
                
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {!token ? (
                            <>
                                <li className="nav-item">
                                    <Link className=" text-white" to="/login">Iniciar Sesión</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className=" text-white" to="/register">Registrarse</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className=" text-white" to="/">Destinos</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className=" text-white" to="/guias">Guia Turistica</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className=" text-white" to="/eventos">Eventos</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className=" text-white" to="/perfil">Mi Perfil</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className=" text-white" to="/logout"> |  Cerrar Sesión</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
