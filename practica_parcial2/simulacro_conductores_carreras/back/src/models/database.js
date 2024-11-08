import Sequelize from "sequelize";
import Conductores from "./conductor.js";
import ClasificacionModel from "./clasificacion.js";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './conductores.db'
})

sequelize.define(
    'Clasificaciones',
    ClasificacionModel.ClasificacionAttributes,
    ClasificacionModel.ClasificacionOptions
)

sequelize.define(
    'Conductores',
    Conductores.ConductoresAttributes,
    Conductores.ConductoresOptions
)

sequelize.models.Conductores.belongsTo(sequelize.models.Clasificaciones, {
    foreignKey: 'IdClasificacion'
})



try {
    await sequelize.sync()
}
catch (err){
    console.log({msg: err.message})
}

export default sequelize
