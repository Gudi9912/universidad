import {DataTypes} from "sequelize"

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

export const clasificacionesModel = {
    clasificacionAtributos, clasificacionesOptions
}
