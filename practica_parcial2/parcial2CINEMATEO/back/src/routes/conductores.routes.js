import express from "express"
import conductoresServiceService from "../services/conductores.service.js";

const router = express.Router();


router.get("/:id", async (req, res) => {
    // codigo
    const model = await conductoresServiceService.getConductor(req.params.id);
    // retorno respueta
    res.json(model);
})

router.get('', async (req, res) => {
    // codigo
    const model = await conductoresServiceService.getConductores(req.query);
    // retorno respueta
    res.json(model);
})

router.post('', async (req, res) => {
    const obra = await conductoresServiceService
        .insertarConductor(req.body)
    return res.json();
});

router.put("/:id", async (req, res, next) => {
    req.body.id = req.params.id
    const obra = await conductoresServiceService
        .editarConductor(req.body)
    return res.json(obra);
})

router.delete("/:id", async (req, res, next) => {
    req.body.id = req.params.id
    const obra = await conductoresServiceService
        .eliminarConductor(req.body)
    return res.json(obra);
})

const conductoresRouter = {
    router
}


export default conductoresRouter;