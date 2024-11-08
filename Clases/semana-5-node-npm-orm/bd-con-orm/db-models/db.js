//Se importa Sequelize
const { Sequelize } = require('sequelize');
const { ClasificacionAtributos, ClasificacionesOptions } = require("./clasificacion");
const { FOREIGNKEYS } = require("sequelize/lib/query-types");
const {PeliculasModel, PeliculasOptions} = require("./peliculas");

//hacemos la conexion con la base de datos
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../semana-5-node-npm-orm/bd-con-orm/clase.db'
})

const initDB = async () => {
    sequelize.define('clasificaciones',  ClasificacionAtributos, ClasificacionesOptions)
    sequelize.define('peliculas', PeliculasModel, PeliculasOptions)
    sequelize.models.peliculas.belongsTo(sequelize.models.clasificaciones, {
    foreingKey: 'IdClasificacion'
    })
    await sequelize.sync()
}

module.exports = {
    //sequelize: sequelize, se puede hacer como abajo si son el mismo nombre y se declara dentro del mismo archivo
    sequelize,
    initDB: initDB
}