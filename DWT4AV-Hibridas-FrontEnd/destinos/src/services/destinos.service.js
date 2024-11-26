import { call } from "./api.service";

export async function getDestinos(clienteId) {
    return call({ uri: "destinos", params: { clienteId } });
}

export async function getDestino(id) {
    return call({ uri: `destinos/${id}` });
}

export async function getDestinoById(id, token) {
    return fetch(`http://localhost:3333/api/destinos/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, 
        },
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error('Error al obtener el destino:', error);
    });
}
