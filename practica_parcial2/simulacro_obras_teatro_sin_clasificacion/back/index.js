import express from "express";
import obrasTeatralesRouter from "./src/routes/obras-teatrales.routes.js";

import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/obras-teatrales', obrasTeatralesRouter.router)

app.listen(3001, () => {
    console.log("Servidor iniciado en el puerto 3001");
});
