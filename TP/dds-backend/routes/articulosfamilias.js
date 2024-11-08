const express = require("express")
const router = express.Router()

const db = require("../base-orm/sequelize-init")

// Se crea el array para luego ser filtrado
let arr_ArticulosFamilias = []

// Ruta GET para obtener todas las familias de artículos
router.get("/api/articulosfamilias", async function (req, res) {
  let data = await db.articulosfamilias.findAll({
    attributes: ["IdArticuloFamilia", "Nombre"],
  })

  // Guardar los resultados en el array arr_ArticulosFamilias
  arr_ArticulosFamilias = data.map(item => item.toJSON()) // Convertir a JSON

  res.json(arr_ArticulosFamilias) // Enviar la respuesta
})

// Ruta GET para obtener un artículo por ID
router.get('/api/articulosfamilias/:id', async function (req, res) {
  let articuloFamilia = arr_ArticulosFamilias.find(
    (x) => x.IdArticuloFamilia == req.params.id
  )

  if (articuloFamilia) {
    res.json(articuloFamilia)
  } else {
    res.status(404).json({ message: 'articulofamilia no encontrado' })
  }
})

module.exports = router
