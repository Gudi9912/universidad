const express = require("express");
const cors = require("cors")

const app = express();
require("./base-ORM/TP-init");  // crear base si no existe
app.use(express.json()); // para poder leer json en el body
app.use(cors())

//Se importan las rutas que interactuan con las tablas
const articulosLimpiezaRouter = require("./routes/articulosLimpieza");
app.use(articulosLimpiezaRouter)
const proveedoresLimpiezaRouter = require("./routes/proveedoresLimpieza");
app.use(proveedoresLimpiezaRouter)
const articulosCocinaRouter = require("./routes/articulosCocina");
app.use(articulosCocinaRouter)
const inventarioArticuloRouter = require("./routes/inventarioArticulo");
app.use(inventarioArticuloRouter)
// const articulosRouter = require("./routes/REEMPLAZAR");
// app.use(articulosRouter)
// const articulosRouter = require("./routes/REEMPLAZAR");
// app.use(articulosRouter)
// const articulosRouter = require("./routes/REEMPLAZAR");
// app.use(articulosRouter)

app.get("/", (req, res)=> {
  res.send("Hola mundo!");
})
app.get("/_isalive", (req, res)=> {
  res.send('Ejecutandose desde:');
})

if (!module.parent) {   // si no es llamado por otro módulo, es decir, si es el módulo principal -> levantamos el servidor
    const port = process.env.PORT || 3000;   // en producción se usa el puerto de la variable de entorno PORT
    app.locals.fechaInicio = new Date();
    app.listen(port, () => {
      console.log(`sitio escuchando en el puerto ${port}, con el link http://localhost:${port}`);
    });
  }
  module.exports = app; // para testing