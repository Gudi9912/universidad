const express = require('express');
const { Sequelize, DataTypes, Op } = require('sequelize');
const cors = require('cors');

// Configura la aplicación Express
const app = express();
app.use(express.json());


// Configura la conexión Sequelize (base de datos SQLite en memoria)
const sequelize = new Sequelize('sqlite::memory:');

// Define el modelo Museo
const Museo = sequelize.define('Museo', {
    nombre: DataTypes.STRING,
    ubicacion: DataTypes.STRING,
    exposiciones: DataTypes.STRING,
    horarios: DataTypes.STRING,
    precioEntrada: DataTypes.STRING
}, { timestamps: false });

// Inicializa la base de datos e inserta datos de muestra
async function inicializarBaseDeDatos() {
    await sequelize.sync({ force: true });
    await Museo.bulkCreate([
        { nombre: 'Museo del Prado', ubicacion: 'Madrid, España', exposiciones: 'Clásicos del Renacimiento', horarios: '09:00 - 18:00', precioEntrada: '15€' },
        { nombre: 'Louvre', ubicacion: 'París, Francia', exposiciones: 'Arte y Cultura Egipcia', horarios: '09:00 - 20:00', precioEntrada: '17€' },
        { nombre: 'Museo de Arte Moderno de Buenos Aires', ubicacion: 'Buenos Aires, Argentina', exposiciones: 'Arte Contemporáneo Latinoamericano', horarios: '10:00 - 19:00', precioEntrada: '500 ARS' },
        { nombre: 'Museo Nacional de Bellas Artes', ubicacion: 'Buenos Aires, Argentina', exposiciones: 'Arte Europeo y Argentino', horarios: '11:00 - 20:00', precioEntrada: 'Gratis' },
        { nombre: 'MALBA', ubicacion: 'Buenos Aires, Argentina', exposiciones: 'Frida Kahlo y Diego Rivera', horarios: '12:00 - 20:00', precioEntrada: '630 ARS' },
        { nombre: 'Museo de Arte Tigre', ubicacion: 'Tigre, Buenos Aires, Argentina', exposiciones: 'Arte Argentino del Siglo XIX', horarios: '10:00 - 18:00', precioEntrada: '240 ARS' },
        { nombre: 'Smithsonian', ubicacion: 'Washington D.C., USA', exposiciones: 'Historia Natural', horarios: '10:00 - 17:30', precioEntrada: 'Gratis' },
        { nombre: 'Museo Egipcio de Turín', ubicacion: 'Turín, Italia', exposiciones: 'Artefactos del Antiguo Egipto', horarios: '09:00 - 19:00', precioEntrada: '15€' },
        { nombre: 'Museo Van Gogh', ubicacion: 'Ámsterdam, Países Bajos', exposiciones: 'Obra de Vincent van Gogh', horarios: '09:00 - 18:00', precioEntrada: '19€' },
        { nombre: 'Museo Guggenheim', ubicacion: 'Bilbao, España', exposiciones: 'Arte Moderno y Contemporáneo', horarios: '10:00 - 20:00', precioEntrada: '13€' },
    ]);
}


// Endpoint para obtener los museos
app.get('/museos', async (req, res) => {
   //Agregar codigo
   try{
        const museos = await Museo.findAll()
        return res.json(museos)
   }catch(err){
        console.log(err.message)
   }
});

app.get("/museos", async (req, res) => {
    try{
        if (req.query.nombre){
            const museos = await Museo.findAll({
                where:{
                    nombre: { [Op.like]: `%${req.query.nombre}%`}
                }
            })
            return res.json(museos)
        }
        const museos = await Museo.findAll()
        return res.json(museos)

    }catch(err){
        console.log(err.message)
    }
})
// Inicia el servidor
inicializarBaseDeDatos().then(() => {
    app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
});
