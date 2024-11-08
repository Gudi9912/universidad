const express = require('express')
const router = express.Router()

// Se hace un mock de datos
let arr_ArticulosFamiliasMock = [
  { "IdArticuloFamilia": 1, "Nombre": "Accesorios" },
  { "IdArticuloFamilia": 2, "Nombre": "Audio" },
  { "IdArticuloFamilia": 3, "Nombre": "Celulares" },
  { "IdArticuloFamilia": 4, "Nombre": "Cuidado Personal" },
  { "IdArticuloFamilia": 5, "Nombre": "Dvd" },
  { "IdArticuloFamilia": 6, "Nombre": "Fotografia" },
  { "IdArticuloFamilia": 7, "Nombre": "Frio-Calor" },
  { "IdArticuloFamilia": 8, "Nombre": "Gps" },
  { "IdArticuloFamilia": 9, "Nombre": "Informatica" },
  { "IdArticuloFamilia": 10, "Nombre": "Led - Lcd" }
];

// Ruta GET para obtener todos los artículos o filtrarlos por nombre
router.get('/api/articulosfamiliasmock', async function (req, res) {
    const { nombre } = req.query

    let articulosFamiliasFiltrados = arr_ArticulosFamiliasMock

    if (nombre) {
        articulosFamiliasFiltrados = articulosFamiliasFiltrados.filter(articulo => 
            articulo.Nombre.toLowerCase().includes(nombre.toLowerCase())
        );
    }

    res.json(articulosFamiliasFiltrados)
})

// Ruta POST para agregar un nuevo artículo
router.post('/api/articulosfamiliasmock/', (req, res) => {
    const { Nombre } = req.body
    let articuloFamilia = {
        Nombre,
        IdArticuloFamilia: Math.floor(Math.random() * 100000),
    }

    arr_ArticulosFamiliasMock.push(articuloFamilia)
    res.status(201).json(articuloFamilia)
})

// Ruta GET para obtener un artículo por ID
router.get('/api/articulosfamiliasmock/:id', async function (req, res) {
    let articuloFamilia = arr_ArticulosFamiliasMock.find(
      (x) => x.IdArticuloFamilia == req.params.id
    )
    if (articuloFamilia) {
        res.json(articuloFamilia);
    } else {
        res.status(404).json({ message: 'articulofamilia no encontrado' });
    }
})

// Ruta PUT para modificar un artículo por ID
router.put('/api/articulosfamiliasmock/:id', (req, res) => {
    let articuloFamilia = arr_ArticulosFamiliasMock.find(
      (x) => x.IdArticuloFamilia == req.params.id
    )

    if (articuloFamilia) {
        const { Nombre } = req.body;
        articuloFamilia.Nombre = Nombre;
        res.json({ message: 'articulofamilia actualizado' });
    } else {
        res.status(404).json({ message: 'articulofamilia no encontrado' });
    }
})

// Ruta DELETE para eliminar un artículo por ID
router.delete('/api/articulosfamiliasmock/:id', (req, res) => {
    let articuloFamilia = arr_ArticulosFamiliasMock.find(
      (x) => x.IdArticuloFamilia == req.params.id
    )

    if (articuloFamilia) {
        arr_ArticulosFamiliasMock = arr_ArticulosFamiliasMock.filter(
          (x) => x.IdArticuloFamilia != req.params.id
        )
        res.json({ message: 'articulofamilia eliminado' });
    } else {
        res.status(404).json({ message: 'articulofamilia no encontrado' });
    }
})

module.exports = router;
