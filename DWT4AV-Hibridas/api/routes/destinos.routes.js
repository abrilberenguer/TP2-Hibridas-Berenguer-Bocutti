import { Router } from "express"; 
import * as controller from "../controllers/destinos.controller.js"
import { validateDestino } from "../../middleware/destino.validate.middleware.js";
import { validateToken } from "../../middleware/token.validate.middleware.js";

const route = Router()

route.get("/destinos", [validateToken], controller.getDestinos);
route.get("/destinos/:id", [validateToken], controller.getDestinoId);
route.post("/destinos", [validateDestino, validateToken], controller.agregarDestino);
route.patch("/destinos/:id", [validateToken], controller.actualizarDestino);
route.delete("/destinos/:id",  controller.borrarDestino);

export default route