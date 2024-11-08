const { initDB } = require("./db-models/db.js");
const { Sequelize } = require("sequelize");

async function getAll() {
    const result = await sequelize.models.peliculas.findAll({
        atributes:[
        'Idpelicula',
        'GeneroPelicula'
        ]
    })
    console.log('result', result)
}

(async() => {
    await initDB();
    console.log("Inicializado ok")

})();