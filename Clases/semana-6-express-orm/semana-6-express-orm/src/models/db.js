//Se importa Sequelize
import { Sequelize } from "sequelize"
import { clasificacionesModel } from "./clasificacion.js"
import { PeliculasModel } from "./peliculas.js";

//hacemos la conexion con la base de datos
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../semana-6-express-orm/clase.db'
})

export const initDB = async () => {
    sequelize.define('clasificaciones',  clasificacionesModel.clasificacionAtributos, clasificacionesModel.clasificacionesOptions)
    sequelize.define('peliculas', PeliculasModel.PeliculaAtributos, PeliculasModel.opciones)
    sequelize.models.peliculas.belongsTo(sequelize.models.clasificaciones, {
    foreingKey: 'IdClasificacion'
    })
    await sequelize.sync()
}
