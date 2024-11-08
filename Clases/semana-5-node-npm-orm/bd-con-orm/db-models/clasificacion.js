const { DataTypes } = require("sequelize");

const clasificacionAtributos ={
    idClasificacion: {
        type: DataTypes.INTEGER,
        autoIncremental: true,
        primaryKey: true,
        allowNull: false

    },
    nombreClasificacion: {
        type: DataTypes.STRING,
        //Valor po defecto de primaryKey es false
        allowNull: false
    }
}

//Sequelize añade 2 timestamps solo, fecha de creacion y actualizacion, asi se desactivan
const clasificacionesOptions = {
    timestamps: false
}

module.exports = {
    ClasificacionAtributos: clasificacionAtributos,
    ClasificacionesOptions: clasificacionesOptions
}