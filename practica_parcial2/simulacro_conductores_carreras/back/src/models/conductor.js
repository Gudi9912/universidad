import { DataTypes } from "sequelize";

const ConductoresAttributes = {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    Nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El nombre del conductor es necesario"
            }
        }
    },
    Anotaciones: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
            len: {
                args: [0, 1000],
                msg: "Las anotaciones sobre el conductor no deben superar los 1000 caracteres"
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
                msg: "La clasificacion del conductor es requerida"
            }
        }
    },
    FechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: true
    },
    CantidadCarreras: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 10,
        validate: {
            min: {
                args: [0],
                msg: "La cantidad de carreras mínuma es 0"
            }
        }
    },
}

const ConductoresOptions = {
    timestamps: false
}

const ConductoresModel = {
    ConductoresAttributes,
    ConductoresOptions
}

export default ConductoresModel
