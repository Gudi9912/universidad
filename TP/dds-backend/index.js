const express = require("express");
const cors = require("cors");
const seguridadRouter = require("./routes/seguridad");

const app = express();
require("./base-orm/sqlite-init");  // crear base si no existe
app.use(express.json()); // para poder leer json en el body
app.use(seguridadRouter);
//Pruebas para el jest
app.get("/", (req, res)=> {
  res.send("Hola mundo!");
})
app.get("/_isalive", (req, res)=> {
  res.send('Ejecutandose desde:');
})

// configurar servidor
app.use(
  cors({
    //Permite todas las solicitudes
    origin: "*", // origin: 'https://dds-frontend.azurewebsites.net'
  })
);

const articulosfamiliasmockRouter = require("./routes/articulosfamiliasmock");
app.use(articulosfamiliasmockRouter)
const articulosfamiliasRouter = require("./routes/articulosfamilias");
app.use(articulosfamiliasRouter)
const articulosRouter = require("./routes/articulos");
app.use(articulosRouter)

if (!module.parent) {   // si no es llamado por otro módulo, es decir, si es el módulo principal -> levantamos el servidor
  const port = process.env.PORT || 3000;   // en producción se usa el puerto de la variable de entorno PORT
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });
}
module.exports = app; // para testing

