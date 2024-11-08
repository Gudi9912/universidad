const { Sequelize, DataTypes, Op } = require('sequelize');
const express = require('express');
const cors = require('cors');
// Configura la aplicación Express
const app = express();
app.use(express.json());
app.use(cors());


// Configura la conexión Sequelize (base de datos SQLite en memoria)

const sequelize = new Sequelize('sqlite::memory:');


// Define el modelo Servicio
const Servicio = sequelize.define('Servicio', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    precio: DataTypes.FLOAT,
    frecuencia: DataTypes.STRING,
    duracion_horas: DataTypes.INTEGER,
    fecha_inicio: DataTypes.TEXT,
}, { timestamps: false });

// Inicializa la base de datos e inserta datos de muestra
async function inicializarBaseDeDatos() {
    await sequelize.sync({ force: true });
    await Servicio.bulkCreate([
        {
          "nombre": "Limpieza de oficinas",
          "descripcion": "Servicio de limpieza integral para oficinas y espacios comerciales.",
          "precio": 100.00,
          "frecuencia": "Semanal",
          "duracion_horas": 2,
          "fecha_inicio": "2024-05-01"
        },
        {
          "nombre": "Limpieza de hogar",
          "descripcion": "Limpieza profunda para hogares y residencias.",
          "precio": 80.00,
          "frecuencia": "Quincenal",
          "duracion_horas": 3,
          "fecha_inicio": "2024-04-15"
        },
        {
          "nombre": "Limpieza de cristales",
          "descripcion": "Servicio especializado en limpieza de ventanas y cristales.",
          "precio": 50.00,
          "frecuencia": "Mensual",
          "duracion_horas": 1,
          "fecha_inicio": "2024-05-10"
        },
        {
          "nombre": "Limpieza de alfombras",
          "descripcion": "Limpieza profunda y desinfección de alfombras y tapetes.",
          "precio": 120.00,
          "frecuencia": "Trimestral",
          "duracion_horas": 4,
          "fecha_inicio": "2024-03-20"
        },
        {
          "nombre": "Limpieza de comunidades",
          "descripcion": "Servicio de limpieza para comunidades de vecinos y edificios residenciales.",
          "precio": 150.00,
          "frecuencia": "Semanal",
          "duracion_horas": 2,
          "fecha_inicio": "2024-04-01"
        },
        {
          "nombre": "Limpieza de fin de obra",
          "descripcion": "Limpieza a fondo tras finalizar una obra o reforma.",
          "precio": 200.00,
          "frecuencia": "Puntual",
          "duracion_horas": 5,
          "fecha_inicio": "2024-02-15"
        },
        {
          "nombre": "Limpieza de garajes",
          "descripcion": "Limpieza y desinfección de garajes y parkings.",
          "precio": 80.00,
          "frecuencia": "Mensual",
          "duracion_horas": 2,
          "fecha_inicio": "2024-05-05"
        },
        {
          "nombre": "Limpieza de tapicerías",
          "descripcion": "Limpieza profunda de tapicerías de sofás, sillas y muebles.",
          "precio": 90.00,
          "frecuencia": "Trimestral",
          "duracion_horas": 3,
          "fecha_inicio": "2024-04-10"
        },
        {
          "nombre": "Limpieza de escaparates",
          "descripcion": "Limpieza y mantenimiento de escaparates y vitrinas comerciales.",
          "precio": 60.00,
          "frecuencia": "Mensual",
          "duracion_horas": 1,
          "fecha_inicio": "2024-05-20"
        },
        {
          "nombre": "Limpieza de colegios",
          "descripcion": "Servicio de limpieza para colegios y centros educativos.",
          "precio": 180.00,
          "frecuencia": "Semanal",
          "duracion_horas": 4,
          "fecha_inicio": "2024-03-01"
        },
        {
          "nombre": "Limpieza de fachadas",
          "descripcion": "Limpieza y mantenimiento de fachadas de edificios y viviendas.",
          "precio": 250.00,
          "frecuencia": "Semestral",
          "duracion_horas": 6,
          "fecha_inicio": "2024-01-10"
        },
        {
          "nombre": "Limpieza de restaurantes",
          "descripcion": "Servicio de limpieza para restaurantes y establecimientos de hostelería.",
          "precio": 120.00,
          "frecuencia": "Semanal",
          "duracion_horas": 3,
          "fecha_inicio": "2024-02-28"
        },
        {
          "nombre": "Limpieza de suelos",
          "descripcion": "Limpieza y abrillantado de suelos de todo tipo.",
          "precio": 70.00,
          "frecuencia": "Mensual",
          "duracion_horas": 2,
          "fecha_inicio": "2024-05-15"
        },
        {
          "nombre": "Limpieza de vehículos",
          "descripcion": "Limpieza interior y exterior de vehículos, incluyendo lavado y aspirado.",
          "precio": 40.00,
          "frecuencia": "Quincenal",
          "duracion_horas": 1.5,
          "fecha_inicio": "2024-04-05"
        },
        {
          "nombre": "Limpieza de Eventos",
          "descripcion": "Servicio de limpieza para Eventos y celebraciones especiales.",
          "precio": 150.00,
          "frecuencia": "Puntual",
          "duracion_horas": 3,
          "fecha_inicio": "2024-03-15"
        }
      ]
    );
}


//Definir aqui la ruta con el método GET para obtener todos los servicios de limpieza cuya descricion contenga el filtro enviado por el cliente

app.get('/Servicios', async (req, res) => {
  try{
    if(req.query.descripcion){
      const servicios = await Servicio.findAll({
        where:{
          descripcion: {[Op.like]: `%${req.query.descripcion}%`}
        }
      })
      return res.json(servicios)
    }
    const servicios = await Servicio.findAll()
    return res.json(servicios)
  }catch(err){
    console.log(err.message)
  }
})



// Inicia el servidor
inicializarBaseDeDatos().then(() => {
    app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
});
