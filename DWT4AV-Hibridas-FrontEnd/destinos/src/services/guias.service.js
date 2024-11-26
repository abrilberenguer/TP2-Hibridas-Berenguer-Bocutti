import { call } from "./api.service";

export async function getGuias(){
    return call( { uri: "guias" } )
}

export async function getGuiaId(guiaId) {
    return call( { uri: `guias/${guiaId}` } )
}