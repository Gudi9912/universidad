// const { DataTypes } = require("sequelize");
import {DataTypes} from "sequelize"

const peliculasAtributos = {
    IdPelicula:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    Titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Eliminado:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    IdClasificacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}

const opciones = {
    timestamps: false,
    tableName: 'PELICULAS'
}

export const peliculasModel = { 
    atributos: peliculasAtributos,
    opciones: opciones
}