import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useToken } from "../../contexts/session.context";
import { call } from "../../services/api.service";
import "../../index.css";

function EditarPerfil() {
  const token = useToken();
  const navigate = useNavigate(); 
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    descripcion: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (token) {
      call({
        uri: "cliente",
        method: "GET",
      })
        .then((data) => {
          setUserData(data);
          setFormData({
            nombre: data.nombre || "",
            email: data.email || "",
            descripcion: data.descripcion || "",
          });
        })
        .catch((err) => {
          setError(err.message || "Error al cargar los datos del usuario");
        });
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    call({
      uri: `clientes/${userData._id}`,
      method: "PATCH",
      body: formData,
    })
      .then(() => {
        setSuccess("Perfil actualizado exitosamente");
        setTimeout(() => {
          navigate("/perfil");
        }, 1500); 
      })
      .catch((err) => {
        setError(err.message || "Error al actualizar el perfil");
      });
  };

  if (!token) {
    return (
      <div className="text-center">
        No estás logueado. Por favor, inicia sesión.
      </div>
    );
  }

  if (!userData) {
    return <div className="text-center">Cargando datos del usuario...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        <strong>Editar Perfil</strong>
      </h1>
      <form onSubmit={handleSubmit} className="col-12 col-md-8 mx-auto">
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción
          </label>
          <textarea
            className="form-control"
            id="descripcion"
            name="descripcion"
            rows="3"
            value={formData.descripcion}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="button w-100">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default EditarPerfil;
