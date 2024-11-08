const express = require("express");
const router = express.Router();
const db = require("../models/sequelize.gonza-init");

router.use(express.json());

//Metodo get para articulos limpieza
router.get("/proveedoresLimpieza/get", async (req, res) => {
    try {
        const data = await db.proveedoresLimpieza.findAll();
        res.json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error al obtener los proveedores de limpieza" }); // Respuesta en caso de error
    }
});

//Metodo get by id para articulos limpieza
router.get("/proveedoresLimpieza/getById", async(req, res) => {
  //Se itenta hacer el bloque, si no se puede se envia un mensaje de error
  try{
      //Si se recibe un titulo, se lo busca
      if(req.query.IdProveedor){
          //Filtrar
          const proveedorLimpieza = await db.proveedoresLimpieza.findAll({
              //Se aplica el filtro
              where:{
                IdProveedor: req.query.IdProveedor
              }
          })
          //Devolver lo que se encontro
          return res.json(proveedorLimpieza)
      }else{
        return res.status(400).send({ message: "El campo IdProveedor es obligatorio." });
      }
  } catch (err){
      res.status(500).send({message: "Error al recuperar datos del servidor"})
  }
})

//Metodo post para articulos limpieza
router.post("/proveedoresLimpieza/post", async (req, res) => {
  try {
    //Se obtienen los datos del cuerpo de la solicitud
    const { NombreProveedor, Telefono, ProximaEntrega } = req.body

    //Se verifica que todos los datos hayan sido ingresados
    if(!NombreProveedor || !Telefono || !ProximaEntrega){
      return res.status(400).send({message: "Ingrese un nombre de proveedor, telefon, y proxima entrega"})
    }

    //Se crea el nuevo articulo en la base de datos
    const nuevoProveedor = await db.proveedoresLimpieza.create({
      NombreProveedor,
      Telefono,
      ProximaEntrega
    })
    return res.status(201).json(nuevoProveedor)
  }catch(err){
    res.status(500).send({message:"Error al crear el articulo"})
  }
})

//Metodo put para articulos limpieza
router.put("/proveedoresLimpieza/put", async (req, res) => {
  //Intentamos encontrar errores
  try {
    if (req.query.IdProveedor){ //Si se recibio un parametro IdarticulosLimpieza se procede
      //Utilizamos findOne ya que este posee la propiedad .save, findAll devuelve un array
      const proveedorLimpieza = await db.proveedoresLimpieza.findOne({
        where:{
          IdProveedor: req.query.IdProveedor
        }
      })

      if (proveedorLimpieza){
        const { NombreProveedor, Telefono, ProximaEntrega } = req.body

        proveedorLimpieza.NombreProveedor = NombreProveedor
        proveedorLimpieza.Telefono = Telefono
        proveedorLimpieza.FechaCaducidad = ProximaEntrega

        await proveedorLimpieza.save()
        return res.json(proveedorLimpieza)
      }
    }else{
      return res.status(400).send({ message: "El campo IdProveedor es obligatorio." });
    }
  }catch(err){
    console.error(err)
    return res.status(500).send({ message: "Error interno del servidor." })
  }
})

//Metodo delete para articulos limpieza
router.delete("/proveedoresLimpieza/delete", async (req,res) => {
  try{
    if (req.query.IdProveedor){
      const proveedoresLimpieza = await db.proveedoresLimpieza.findOne({
        where:{
          IdProveedor: req.query.IdProveedor
        }
    })
    if (proveedoresLimpieza){
        proveedoresLimpieza.destroy()
      return res.json({ message: 'proveedor Limpieza eliminado' });
    }
    }else{
      console.error(err);
      return res.status(500).json({ message: 'Error interno del servidor.' });
    }
  }catch(err){

  }
})
module.exports = router;
