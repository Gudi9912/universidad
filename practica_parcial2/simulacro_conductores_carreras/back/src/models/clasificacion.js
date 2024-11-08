import { DataTypes } from "sequelize";

const ClasificacionAttributes = {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    Titulo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El nombre de la pelicula es necesario"
            }
        }
    },
    Descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El director de la pelicula es necesario"
            }
        }
    },
}

const ClasificacionOptions = {
    timestamps: false
}

const ClasificacionModel = {
    ClasificacionAttributes,
    ClasificacionOptions
}

export default ClasificacionModel
