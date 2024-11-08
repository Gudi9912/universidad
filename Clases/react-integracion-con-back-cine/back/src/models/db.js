// const { Sequelize } = require("sequelize");
// const { ClasificacionesAtributos, ClasificacionesOptions } = require("./clasificacion");
// const peliculasModel = require("./pelicula");

import { Sequelize } from "sequelize";
import { clasificacionesModel } from "./clasificacion.js"
import { peliculasModel } from "./pelicula.js"

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './cine-mili-hoy.sql.db'
}) 

export const initDB = async () => {
    sequelize.define('clasificaciones', 
        clasificacionesModel.clasifiacionAtributos,clasificacionesModel.clasificacionesOptions
    )
    sequelize.define('peliculas',

        peliculasModel.atributos,
        peliculasModel.opciones
    )

    sequelize.models.peliculas.belongsTo(sequelize.models.clasificaciones, {
        foreignKey: 'IdClasificacion'
    })
    await sequelize.sync()
}

