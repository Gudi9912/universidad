import express from "express";
import peliculasService from "./src/services/peliculas.service.js";
import clasificacionesService from "./src/services/clasificaciones.service.js";
import { initDB } from "./src/models/db.js";
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())


app.get("/api/clasificaciones", async (req, res) =>{
    // codigo
    const clasificaciones = await clasificacionesService.getAll();
    // retorno respueta
    res.json(clasificaciones);
})

app.get("/api/peliculas/:id", async (req, res) =>{
    // codigo
    const peliculas = await peliculasService.getPeliculaPorId(req.params.id);
    // retorno respueta
    res.json(peliculas);
})

app.get("/api/peliculas", async (req, res) =>{
    const titulo = req.query.titulo
    // codigo
    const peliculas = await peliculasService.getPeliculas(titulo);
    // retorno respueta
    res.json(peliculas);
})

app.post('/api/peliculas', async (req, res) =>{
    const pelicula = await peliculasService
    .insertarPelicula(req.body)
    return res.json(pelicula);
});

app.put("/api/peliculas/:id", async (req, res)=>{
    console.log('PUT /api/peliculas/:id', req.params.id)
        const pelicula = await peliculasService
        .editarPelicula(req.body, req.params.id)
        return res.json(pelicula);
})

app.delete("/api/peliculas/:id", async (req, res)=>{
    console.log('DELETE /api/peliculas/:id', req.params.id)
        const pelicula = await peliculasService
        .deletePelicula(req.params.id)
        return res.json(pelicula);
})

app.listen(3000, async()=>{
    await initDB()
    console.log("Servidor iniciado en el puerto 3000");
});
