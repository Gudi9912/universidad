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
    PrecioEntrada: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El precio es necesario"
            }
        }
    },
    FechaDesde: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "La fecha desde es necesaria"
            }
        }
    },
    FechaHasta: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
}

const ObrasTeatralesOptions = {
    timestamps: false
}

const ObrasTeatralesModel = {
    ObrasTeatralesAttributes,
    ObrasTeatralesOptions
}

export default ObrasTeatralesModel
