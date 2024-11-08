import express from "express"
import obrasTetralesService from "../services/obras-teatrales.service.js";

const router = express.Router();

router.get("", async (req, res) =>{
    // codigo
    const obras = await obrasTetralesService.getObrasTeatrales(req.query);
    // retorno respueta
    res.json(obras);
})

router.post('', async (req, res) =>{
    const obra = await obrasTetralesService
    .insertarObraTeatral(req.body)
    return res.json(obra);
});

router.put("/:id", async (req, res, next)=>{
    try {
        req.body.id = req.params.id
        const obra = await obrasTetralesService
        .editarObraTeatral(req.body)
        return res.json(obra);
    }catch(err){
        next(err)
    }
})

const obrasTeatralesRouter = {
    router
}


export default obrasTeatralesRouter;