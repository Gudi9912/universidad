import Sequelize from "sequelize";
import ObrasTeatrales from "./obra-teatral.js";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './obras-teatrales-sin-clasificacion.db'
})

sequelize.define(
    'ObrasTeatrales',
    ObrasTeatrales.ObrasTeatralesAttributes,
    ObrasTeatrales.ObrasTeatralesOptions
)


try {
    await sequelize.sync()
}
catch (err){
    console.log({msg: err.message})
}

export default sequelize
