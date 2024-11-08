// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sqlite:" + "./.data/ArticulosDB.db");

// Se crea el modelo de clase proveedoresLimpieza primero
const proveedoresLimpieza = sequelize.define(
    "proveedoresLimpieza",
    {
        IdProveedor: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        NombreProveedor: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        Telefono: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ProximaEntrega: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        // Si no se pone el tableName, sequelize lo pone en plural automáticamente
        tableName: "proveedoresLimpieza",
        hooks: {
            beforeValidate: function (proveedor, options) {
                if (typeof proveedor.NombreProveedor === "string") {
                    proveedor.NombreProveedor = proveedor.NombreProveedor.toUpperCase().trim();
                }
            },
        },
        timestamps: false,
    }
);

// Se crea el modelo de clase articulosLimpieza
const articulosLimpieza = sequelize.define(
    "articulosLimpieza",
    {
        IdarticulosLimpieza: {
            type: DataTypes.INTEGER,
            primaryKey: true,         // Se usará IdarticulosLimpieza como llave primaria para esta tabla
            autoIncrement: true,      // Al usar autoIncrement no debemos mandarle el Id como parámetro
        },
        Nombre: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        Precio: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        FechaCaducidad: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        IdProveedor: {
            type: DataTypes.INTEGER,
            references: {
                model: proveedoresLimpieza, // Referencia correcta
                key: 'IdProveedor'
            }
        }
    },
    {
        // Si no se pone el tableName, sequelize lo pone en plural automáticamente
        tableName: "articulosLimpieza",
        hooks: {
            beforeValidate: function (articulo, options) {
                if (typeof articulo.Nombre === "string") {
                    articulo.Nombre = articulo.Nombre.toUpperCase().trim();
                }
            },
        },
        timestamps: false,
    }
);

// Establecer relaciones
proveedoresLimpieza.hasMany(articulosLimpieza, {
    foreignKey: 'IdProveedor', // Clave foránea en articulosLimpieza
    sourceKey: 'IdProveedor', // Clave primaria en proveedoresLimpieza
});

articulosLimpieza.belongsTo(proveedoresLimpieza, {
    foreignKey: 'IdProveedor', // Clave foránea en articulosLimpieza
    targetKey: 'IdProveedor' // Especifica la clave primaria en proveedoresLimpieza 
});

module.exports = {
    sequelize,
    articulosLimpieza,
    proveedoresLimpieza,
};
