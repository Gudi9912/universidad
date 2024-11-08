// Configuramos la ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sqlite:" + "./.data/ArticulosDB.db");

const historialPrecios = sequelize.define(
  "historialPrecios",
  {
      IdHistorialPrecios: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      Precio: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      FechaCambio: {
          type: DataTypes.DATE,
          allowNull: false
      },
  },
  {
      tableName: "historialPrecios",
      timestamps: false
  }
)

// Definimos las tablas
const inventarioArticulos = sequelize.define(
    "inventarioArticulos",
    {
        IdInventario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NombreArticulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Ubicacion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        FechaRegistro: {
            type: DataTypes.DATE,
            allowNull: true
        },
        IdHistorialPrecios: {
            type: DataTypes.INTEGER,
            references: {
              model: historialPrecios,
              key: 'IdHistorialPrecios'
            }
        }
    },
    {
      tableName: "inventarioArticulos",
      // pasar a mayusculas
      hooks: {
        beforeValidate: function (inventarioArticulos, options) {
          if (typeof inventarioArticulos.NombreArticulo === "string") {
            inventarioArticulos.NombreArticulo = inventarioArticulos.NombreArticulo.toUpperCase().trim();
          }
        },
      },
  
      timestamps: false,
    }

)

inventarioArticulos.belongsTo(historialPrecios, {
    foreignKey: "IdHistorialPrecios",
    sourceKey: "IdHistorialPrecios"
})

historialPrecios.hasMany(inventarioArticulos, {
    foreignKey: "IdHistorialPrecios",
    targetKey: "IdHistorialPrecios"
})

module.exports = {
    sequelize,
    inventarioArticulos,
    historialPrecios
}