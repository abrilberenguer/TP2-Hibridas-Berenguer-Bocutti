import { call } from "./api.service"

export async function login({ email, password }){
    return call( { uri: "clientes/login", method: "POST", body: { "email": email, "password": password } } )
}

export async function register({ nombre, email, password, confirmPassword }){
    return call( { uri: "clientes", method: "POST", body: { "nombre": nombre, "email": email, "password": password, "passwordConfirm": confirmPassword } } )
}