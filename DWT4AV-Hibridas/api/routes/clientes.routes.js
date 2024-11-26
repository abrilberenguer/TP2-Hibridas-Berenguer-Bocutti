import { Router } from "express";
import * as controllerCliente from "../controllers/clientes.controller.js";
import { validateCliente, login } from "../../middleware/clientes.validate.middleware.js"
import { validateToken } from "../../middleware/token.validate.middleware.js";

const route = Router();

route.get("/clientes", [validateToken], controllerCliente.getClientes);
route.get("/clientes/:id", controllerCliente.getClienteId);
route.post("/clientes", [validateCliente], controllerCliente.agregarCliente);
route.put("/clientes/:id", [validateToken], controllerCliente.reemplazarCliente);
route.patch("/clientes/:id", [validateToken], controllerCliente.actualizarCliente);
route.delete("/clientes/:id", [validateToken], controllerCliente.borrarCliente);
route.get("/clientes/:id/destinos", [validateToken], controllerCliente.getDestinosCliente);

route.post("/clientes/login", [login], controllerCliente.login);
route.get("/cliente", [validateToken], controllerCliente.getClient);

route.get("/perfil", [validateToken], controllerCliente.getProfile);
route.get("/clientes/:id/destinos", [validateToken], controllerCliente.getDestinosCliente);


export default route;