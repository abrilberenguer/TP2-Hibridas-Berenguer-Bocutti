import { call } from "./api.service";


export async function getEventos(){
    return call( { uri: "eventos" } )
}

export async function getEventoId(eventoId) {
    return call( { uri: `eventos/${eventoId}` } )
}