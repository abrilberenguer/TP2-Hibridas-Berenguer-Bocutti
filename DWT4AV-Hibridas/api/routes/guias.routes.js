import { Router } from "express"; 
import * as controller from "../controllers/guias.controller.js";
import { validateGuias } from "../../middleware/guias.validate.middleware.js";
import { validateToken } from "../../middleware/token.validate.middleware.js";

const route = Router();

route.get("/guias", [validateToken], controller.getGuias);
route.get("/guias/:id", [validateToken], controller.getGuiaId);
route.post("/guias", [validateGuias, validateToken], controller.agregarGuia);
route.patch("/guias/:id", [validateToken], controller.actualizarGuia);
route.delete("/guias/:id", [validateToken], controller.borrarGuia);

route.get("/guias/:id/destino", [validateToken], controller.getDestinosGuias);

export default route;
