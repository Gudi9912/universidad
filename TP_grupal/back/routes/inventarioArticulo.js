const express = require("express")
const router = express.Router()
const db = require("../models/sequelize.ariadna-init")

router.use(express.json())

//Metodo get para el inventario de los artículos
router.get("/inventarioArticulos/get", async (req, res) => {
    try {
        const data = await db.inventarioArticulos.findAll()
        res.json(data)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: "Error al obtener el inventario de los artículos" })
    }
})

//Metodo get by id para el inventario de los artículos
router.get("/inventarioArticulos/getById", async(req, res) => {
  //Se itenta hacer el bloque, si no se puede se envia un mensaje de error
  try{
      //Si se recibe un titulo, se lo busca
      if(req.query.IdInventario){
          //Filtrar
          const inventarioArticulos = await db.inventarioArticulos.findAll({
              //Filtro
              where:{
                IdInventario: req.query.IdInventario
              }
          })
          //Devolver lo que se encontro
          return res.json(inventarioArticulos)
      }else{
        return res.status(400).send({ message: "El campo IdInventario es obligatorio." });
      }
  } catch (err){
      res.status(500).send({message: "Error al recuperar datos del servidor"})
  }
})

  //Metodo post para el inventario de articulos
router.post("/inventarioArticulos/post", async (req, res) => {
  try {
    //Se obtienen los datos del cuerpo de la solicitud
    const { NombreArticulo, Cantidad, Ubicacion, FechaRegistro, IdHistorialPrecios } = req.body

    //Se verifica que todos los datos hayan sido ingresados
    if(!NombreArticulo || !Cantidad || !Ubicacion || !FechaRegistro || !IdHistorialPrecios){
      return res.status(400).send({message: "Ingrese un nombre articulo, cantidad, ubicación, fecha de registro y id de historial de precios"})
    }

    //Se crea el nuevo articulo en la base de datos
    const nuevoArticulo = await db.inventarioArticulos.create({
      NombreArticulo,
      Cantidad,
      Ubicacion,
      FechaRegistro,
      IdHistorialPrecios
    })
    return res.status(201).json(nuevoArticulo)
  }catch(err){
    res.status(500).send({message:"Error al crear el articulo"})
  }
})

  //Metodo put para el inventario de los articulos
router.put("/inventarioArticulos/put", async (req, res) => {
  //Intentamos encontrar errores
  try {
    if (req.query.IdInventario){ //Si se recibio un parametro IdInventario se procede
      //Utilizamos findOne ya que este posee la propiedad .save, findAll devuelve un array
      const inventarioArticulos = await db.inventarioArticulos.findOne({
        where:{
          IdInventario: req.query.IdInventario
        }
      })
      
      if (inventarioArticulos){
        const { NombreArticulo, Cantidad, Ubicacion, FechaRegistro, IdHistorialPrecios } = req.body
        //const fechaFormateada = formatearFecha(FechaCreacion);

        inventarioArticulos.NombreArticulo = NombreArticulo
        inventarioArticulos.Cantidad = Cantidad
        inventarioArticulos.Ubicacion = Ubicacion
        inventarioArticulos.FechaRegistro = FechaRegistro
        inventarioArticulos.IdHistorialPrecios = IdHistorialPrecios

        await inventarioArticulos.save()
        return res.json(inventarioArticulos)
      }
    }else{
      return res.status(400).send({ message: "El campo IdInventario es obligatorio." });
    }
  }catch(err){
    console.error(err)
    return res.status(500).send({ message: "Error interno del servidor." })
  }
})
  
  //Metodo delete para articulos del inventario
router.delete("/inventarioArticulos/delete", async (req,res) => {
  try{
    if (req.query.IdInventario){
      const inventarioArticulos = await db.inventarioArticulos.findOne({
        where:{
          IdInventario: req.query.IdInventario
        }
    })
    if (inventarioArticulos){
      inventarioArticulos.destroy()
      return res.json({ message: 'articulo del inventario eliminado' });
    }
    }else{
      console.error(err);
      return res.status(500).json({ message: 'Error interno del servidor.' });
    }
  }catch(err){

  }
})
module.exports = router;