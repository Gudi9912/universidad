const express = require("express");
const router = express.Router();
const db = require("../models/sequelize.gonza-init");
const { Op } = require("sequelize");

router.use(express.json());

//Metodo get para articulos limpieza
router.get("/articulosLimpieza/get", async (req, res) => {
    try {
        const data = await db.articulosLimpieza.findAll({
          include: [
            {
              model: db.proveedoresLimpieza,
              attributes: ["IdProveedor", "NombreProveedor", "Telefono", "ProximaEntrega"]
            }
          ]
        });
        res.json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error al obtener los artículos de limpieza" }); // Respuesta en caso de error
    }
});

//Metodo get by id para articulos limpieza
router.get("/articulosLimpieza/getById", async(req, res) => {
  //Se itenta hacer el bloque, si no se puede se envia un mensaje de error
  try{
      //Si se recibe un titulo, se lo busca
      if(req.query.IdarticulosLimpieza){
          //Filtrar
          const articulosLimpieza = await db.articulosLimpieza.findAll({
              //Filtro
              where:{
                IdarticulosLimpieza: req.query.IdarticulosLimpieza
              },
                include: [
                  {
                    model: db.proveedoresLimpieza,
                    attributes: ["IdProveedor", "NombreProveedor", "Telefono", "ProximaEntrega"]
                  }
                ]
          })
          //Devolver lo que se encontro
          return res.json(articulosLimpieza)
      }else{
        return res.status(400).send({ message: "El campo IdarticulosLimpieza es obligatorio." });
      }
  } catch (err){
      res.status(500).send({message: "Error al recuperar datos del servidor"})
  }
})

// Metodo get by nombre para articulos limpieza
// Metodo get by nombre para articulos limpieza
router.get("/articulosLimpieza/getByNombre", async (req, res) => {
  try {
    // Se verifica si se recibió el parámetro nombre
    if (req.query.Nombre) {
      // Filtrar los artículos de limpieza por el nombre
      const articulosLimpieza = await db.articulosLimpieza.findAll({
        where: {
          Nombre: {
            [Op.like]: `%${req.query.Nombre}%`  // Buscamos artículos que contengan el nombre recibido (búsqueda parcial)
          }
        },
        include: [
          {
            model: db.proveedoresLimpieza,
            attributes: ["IdProveedor", "NombreProveedor", "Telefono", "ProximaEntrega"]
          }
        ]
      });

      // Si se encuentran artículos, devolverlos
      if (articulosLimpieza.length > 0) {
        return res.json(articulosLimpieza);
      } else {
        return res.status(404).json({ message: "No se encontraron artículos de limpieza con ese nombre" });
      }
    } else {
      // Si no se recibe un nombre, enviar un error
      return res.status(400).json({ message: "El campo 'Nombre' es obligatorio." });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al obtener los artículos de limpieza" });
  }
});


//Metodo post para articulos limpieza
router.post("/articulosLimpieza/post", async (req, res) => {
  try {
    //Se obtienen los datos del cuerpo de la solicitud
    const { Nombre, Precio, FechaCaducidad, IdProveedor } = req.body

    //Se verifica que todos los datos hayan sido ingresados
    if(!Nombre || !Precio || !FechaCaducidad || !IdProveedor){
      return res.status(400).send({message: "Ingrese un nombre, precio, fecha de caducidad y IdProveedor"})
    }

    //Se crea el nuevo articulo en la base de datos
    const nuevoArticulo = await db.articulosLimpieza.create({
      Nombre,
      Precio,
      FechaCaducidad,
      IdProveedor
    })
    return res.status(201).json(nuevoArticulo)
  }catch(err){
    res.status(500).send({message:"Error al crear el articulo"})
  }
})

//Metodo put para articulos limpieza
router.put("/articulosLimpieza/put", async (req, res) => {
  //Intentamos encontrar errores
  try {
    if (req.query.IdarticulosLimpieza){ //Si se recibio un parametro IdarticulosLimpieza se procede
      //Utilizamos findOne ya que este posee la propiedad .save, findAll devuelve un array
      const articulosLimpieza = await db.articulosLimpieza.findOne({
        where:{
          IdarticulosLimpieza: req.query.IdarticulosLimpieza
        }
      })

      if (articulosLimpieza){
        const { Nombre, Precio, FechaCaducidad, IdProveedor } = req.body

        articulosLimpieza.Nombre = Nombre
        articulosLimpieza.Precio = Precio
        articulosLimpieza.FechaCaducidad = FechaCaducidad
        articulosLimpieza.IdProveedor = IdProveedor

        await articulosLimpieza.save()
        return res.json(articulosLimpieza)
      }
    }else{
      return res.status(400).send({ message: "El campo IdarticulosLimpieza es obligatorio." });
    }
  }catch(err){
    console.error(err)
    return res.status(500).send({ message: "Error interno del servidor." })
  }
})

//Metodo delete para articulos limpieza
router.delete("/articulosLimpieza/delete", async (req,res) => {
  try{
    if (req.query.IdarticulosLimpieza){
      const articulosLimpieza = await db.articulosLimpieza.findOne({
        where:{
          IdarticulosLimpieza: req.query.IdarticulosLimpieza
        }
    })
    if (articulosLimpieza){
      articulosLimpieza.destroy()
      return res.json({ message: 'articulo Limpieza eliminado' });
    }
    }else{
      console.error(err);
      return res.status(500).json({ message: 'Error interno del servidor.' });
    }
  }catch(err){

  }
})
module.exports = router;
