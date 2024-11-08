// const { DataTypes } = require("sequelize");
import {DataTypes} from "sequelize"

const clasifiacionAtributos = {
    IdClasificacion: {
        type: DataTypes.INTEGER,
        autoIncremental: true,
        primaryKey: true,
        allowNull: false
    },
    NombreClasificacion: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

const clasificacionesOptions = {
    timestamps: false,
    tableName: 'CLASIFICACIONES'
}

export const clasificacionesModel = {
    clasifiacionAtributos,
    clasificacionesOptions
}
