import express from "express";
import peliculasService from "./src/services/peliculas.service.js";
import { initDB } from "./src/models/db.js";


const app = express();
app.use(express.json());


app.get("/api/peliculas", async (req, res) =>{
    // codigo
    const peliculas = await peliculasService.getPeliculas();
    // retorno respueta
    res.json(peliculas);
})

app.post('/api/peliculas', async (req, res) =>{
    const pelicula = await peliculasService
    .insertarPelicula(req.body)
    return res.json(pelicula);
});

app.put("/api/peliculas", async (req, res)=>{
        const pelicula = await peliculasService
        .editarPelicula(req.body)
        return res.json(pelicula);
})

app.listen(3000, async()=>{
    await initDB()
    console.log("Servidor iniciado en el puerto 3000");
});
