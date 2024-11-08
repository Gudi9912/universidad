import Sequelize from "sequelize";
import ObrasTeatrales from "./obra-teatral.js";
import ClasificacionModel from "./clasificacion.js";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './obras-teatrales.db'
})

sequelize.define(
    'Clasificaciones',
    ClasificacionModel.ClasificacionAttributes,
    ClasificacionModel.ClasificacionOptions
)

sequelize.define(
    'ObrasTeatrales',
    ObrasTeatrales.ObrasTeatralesAttributes,
    ObrasTeatrales.ObrasTeatralesOptions
)

sequelize.models.ObrasTeatrales.belongsTo(sequelize.models.Clasificaciones, {
    foreignKey: 'IdClasificacion'
})



try {
    await sequelize.sync()
}
catch (err){
    console.log({msg: err.message})
}

export default sequelize
