const express = require("express");
const router = express.Router();
const db = require("../models/sequelize.mateo-init.js");

router.use(express.json());

//Metodo get para articulos limpieza
router.get("/articulosCocina/get", async (req, res) => {
    try {
        const data = await db.articulosCocina.findAll();
        res.json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error al obtener los artículos de cocina" }); // Respuesta en caso de error
    }
});

//Metodo get by id para articulos limpieza
router.get("/articulosCocina/getById", async(req, res) => {
  //Se itenta hacer el bloque, si no se puede se envia un mensaje de error
  try{
      //Si se recibe un titulo, se lo busca
      if(req.query.IdarticulosCocina){
          //Filtrar
          const articulosCocina = await db.articulosCocina.findAll({
              //Filtro
              where:{
                IdarticulosCocina: req.query.IdarticulosCocina
              }
          })
          //Devolver lo que se encontro
          return res.json(articulosCocina)
      }else{
        return res.status(400).send({ message: "El campo IdarticulosCocina es obligatorio." });
      }
  } catch (err){
      res.status(500).send({message: "Error al recuperar datos del servidor"})
  }
})

//Metodo post para articulos limpieza
router.post("/articulosCocina/post", async (req, res) => {
  try {
    //Se obtienen los datos del cuerpo de la solicitud
    const { Nombre, Precio, FechaCreacion, IdmarcaArticulosCocina } = req.body

    //Se verifica que todos los datos hayan sido ingresados
    if(!Nombre || !Precio || !FechaCreacion || !IdmarcaArticulosCocina){
      return res.status(400).send({message: "Ingrese un nombre precio, fecha de creacion y id de marca"})
    }

    //Se crea el nuevo articulo en la base de datos
    const nuevoArticulo = await db.articulosCocina.create({
      Nombre,
      Precio,
      FechaCreacion,
      IdmarcaArticulosCocina
    })
    return res.status(201).json(nuevoArticulo)
  }catch(err){
    res.status(500).send({message:"Error al crear el articulo"})
  }
})

function formatearFecha(fecha) {
  if (typeof fecha === 'string') {
    // Si ya es una cadena, asumimos que está en formato ISO y tomamos solo la parte de la fecha
    return fecha.split('T')[0];
  }
  const d = new Date(fecha);
  return d.toISOString().split('T')[0];
}
//Metodo put para articulos limpieza
router.put("/articulosCocina/put", async (req, res) => {
  //Intentamos encontrar errores
  try {
    if (req.query.IdarticulosCocina){ //Si se recibio un parametro IdarticulosLimpieza se procede
      //Utilizamos findOne ya que este posee la propiedad .save, findAll devuelve un array
      const articulosCocina = await db.articulosCocina.findOne({
        where:{
          IdarticulosCocina: req.query.IdarticulosCocina
        }
      })
      
      if (articulosCocina){
        const { Nombre, Precio, FechaCreacion, IdmarcaArticulosCocina } = req.body
        //const fechaFormateada = formatearFecha(FechaCreacion);

        articulosCocina.Nombre = Nombre
        articulosCocina.Precio = Precio
        articulosCocina.FechaCreacion = FechaCreacion
        articulosCocina.IdmarcaArticulosCocina = IdmarcaArticulosCocina

        await articulosCocina.save()
        
        const respuesta = {
          ...articulosCocina.toJSON(),
          FechaCreacion: formatearFecha(articulosCocina.FechaCreacion)
        };
        
        return res.json(respuesta);
      }
    }else{
      return res.status(400).send({ message: "El campo IdarticulosCocina es obligatorio." });
    }
  }catch(err){
    console.error(err)
    return res.status(500).send({ message: "Error interno del servidor." })
  }
})

//Metodo delete para articulos limpieza
router.delete("/articulosCocina/delete", async (req,res) => {
  try{
    if (req.query.IdarticulosCocina){
      const articulosCocina = await db.articulosCocina.findOne({
        where:{
          IdarticulosCocina: req.query.IdarticulosCocina
        }
    })
    if (articulosCocina){
      articulosCocina.destroy()
      return res.json({ message: 'articulo Cocina eliminado' });
    }
    }else{
      console.error(err);
      return res.status(500).json({ message: 'Error interno del servidor.' });
    }
  }catch(err){

  }
})
module.exports = router;
