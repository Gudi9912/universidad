import express from "express"
import clasificacionesService from "../services/clasificaciones.service.js";

const router = express.Router();

router.get("", async (req, res) =>{
    // codigo
    const data = await clasificacionesService.getClasificaciones();
    // retorno respueta
    res.json(data);
})

const clasificacionesRouter = {
    router
}


export default clasificacionesRouter;