import { Router } from "express"; 
import * as controller from "../controllers/eventos.controller.js";
import { validateEventos } from "../../middleware/eventos.validate.middleware.js";
import { validateToken } from "../../middleware/token.validate.middleware.js";

const route = Router();

route.get("/eventos", [validateToken], controller.getEventos);
route.get("/eventos/:id", [validateToken], controller.getEventoId);
route.post("/eventos", [validateEventos, validateToken], controller.agregarEvento);
route.patch("/eventos/:id", [validateToken], controller.actualizarEvento);
route.delete("/eventos/:id", [validateToken], controller.borrarEvento);

route.get("/eventos/:id/destino", [validateToken], controller.getDestinosEventos);

export default route;
