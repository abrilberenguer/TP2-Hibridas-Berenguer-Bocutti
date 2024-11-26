import { call } from "./api.service"

export async function getCliente(clienteId) {
    return fetch(`http://localhost:3333/api/clientes/${clienteId}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.error("Error al obtener los datos del cliente:", error);
        });
}

export async function editarCliente(clienteId, data) {
    return fetch(`http://localhost:3333/api/clientes/${clienteId}`, {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al actualizar el perfil");
            }
            return response.json();
        })
        .catch((error) => {
            console.error("Error al editar el cliente:", error);
        });
}
