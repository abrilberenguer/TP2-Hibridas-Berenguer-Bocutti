import express from "express";
import destinosRoute from "./routes/destinos.routes.js";
import clientesRoute from "./routes/clientes.routes.js";

import apiDestinosRoute from "./api/routes/destinos.routes.js";
import apiClientesRoute from "./api/routes/clientes.routes.js"; 
import apiGuiasRoute from "./api/routes/guias.routes.js"
import apiEventosRoute from "./api/routes/eventos.routes.js"

import cors from "cors";

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH",
}
app.use(cors(corsOptions));

// Rutas api
app.use("/api", apiDestinosRoute); 
app.use("/api", apiClientesRoute); 
app.use("/api", apiGuiasRoute);
app.use("/api", apiEventosRoute);

// Rutas generales
app.use(destinosRoute);
app.use(clientesRoute);

app.listen(3333, () => console.log("Servidor funcionando"));