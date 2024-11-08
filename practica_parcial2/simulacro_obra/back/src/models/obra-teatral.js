import { DataTypes } from "sequelize";

const ObrasTeatralesAttributes = {
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
                msg: "El nombre de la ObraTeatral es necesario"
            }
        }
    },
    Director: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El director de la ObraTeatral es necesario"
            }
        }
    },
    Eliminado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'El estado eliminado es requerido.'
            }
        }
    },
    IdClasificacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El id de ObraTeatral es requerido"
            }
        }
    }
}

const ObrasTeatralesOptions = {
    timestamps: false
}

const ObrasTeatralesModel = {
    ObrasTeatralesAttributes,
    ObrasTeatralesOptions
}

export default ObrasTeatralesModel
