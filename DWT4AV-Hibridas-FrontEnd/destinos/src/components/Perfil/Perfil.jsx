import { useEffect, useState } from "react";
import { useToken } from "../../contexts/session.context";
import { call } from "../../services/api.service";
import * as serviceDestino from "../../services/destinos.service"; 
import "../../index.css";
import { Link } from "react-router-dom";

function Perfil() {
  const token = useToken();
  const [userData, setUserData] = useState(null);
  const [destinos, setDestinos] = useState([]); 
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      call({
        uri: "cliente",
        method: "GET",
      })
        .then((data) => {
          setUserData(data); 
          if (data.destinos && data.destinos.length > 0) {
            Promise.all(
              data.destinos.map((destinoId) =>
                serviceDestino.getDestino(destinoId)
              )
            )
              .then((destinos) => {
                setDestinos(destinos); 
              })
              .catch((err) => {
                setError("Error al cargar los destinos");
              });
          }
        })
        .catch((err) => {
          setError(err.message || "Error al cargar los datos del usuario");
        });
    }
  }, [token]);

  if (!token) {
    return (
      <div className="text-center">
        No estás logueado. Por favor, inicia sesión.
      </div>
    );
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        <strong>Mi Perfil</strong>
      </h1>
      {userData ? (
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 d-flex align-items-center mb-4">
            <div className="card w-100 d-flex flex-row">
                <div className="card-body col-8">
                <h2 className="card-title">
                    <strong>
                    {userData.nombre} {userData.apellido}
                    </strong>
                </h2>
                <p className="card-text">
                    <strong>Email:</strong> {userData.email}
                </p>
                <p className="card-text">
                    <strong>Descripción:</strong>{" "}
                    {userData.descripcion || "No hay descripción disponible"}
                </p>
                <div className="d-flex justify-content-end">
                                    <a href="/editar-perfil" className="w-25 button text-decoration-none text-center">
                                        Editar Perfil
                                    </a>
                                </div>
                </div>
            </div>
            </div>
        </div>
        ) : (
        <div className="text-center">Cargando datos del usuario...</div>
        )}
        <div className="container col-10 ">
        <h4 className="mt-3">
        <strong>Mis Destinos:</strong>
        </h4>
        <div className="row d-flex justify-content-center">
        {destinos.length > 0 ? (
            destinos.map((destino, index) => (
            <div className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch mb-4" key={index}>
                <div className="card mb-4">
                <img
                    src={`http://localhost:3333/img/${destino.imagen}`}
                    className="card-img-top"
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
                        <a href={"destino/" + destino._id} 
                        className="button w-75 text-center text-decoration-none"
                        >
                            Ver Detalles
                        </a>
                    </div>
                </div>
                </div>
            </div>
            ))
        ) : (
            <div className="text-center">No tienes destinos.</div>
        )}
        </div>
        </div>
    </div>
    );
}

export default Perfil;
