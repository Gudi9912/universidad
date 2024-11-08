// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sqlite:" + "./.data/ArticulosDB.db");

const marcaArticulosCocina = sequelize.define(
  "marcaArticulosCocina",
  {
    IdmarcaArticulosCocina: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      // todo evitar que string autocomplete con espacios en blanco, debería ser varchar sin espacios
      type: DataTypes.STRING(30),
      allowNull: false,
      },
    CantSucursales: {
      // todo evitar que string autocomplete con espacios en blanco, debería ser varchar sin espacios
      type: DataTypes.INTEGER,
      allowNull: false,
      }
  },
  {
    tableName: "marcaArticulosCocina",
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (marcaArticulosCocina, options) {
        if (typeof marcaArticulosCocina.Nombre === "string") {
          marcaArticulosCocina.Nombre = marcaArticulosCocina.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);

const articulosCocina = sequelize.define(
  "articulosCocina",
  {
    IdarticulosCocina: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      // todo evitar que string autocomplete con espacios en blanco, debería ser varchar sin espacios
      type: DataTypes.STRING(30),
      allowNull: false,
      },
    Precio: {
      // todo evitar que string autocomplete con espacios en blanco, debería ser varchar sin espacios
      type: DataTypes.INTEGER,
      allowNull: false,
      },
    FechaCreacion: {
      // todo evitar que string autocomplete con espacios en blanco, debería ser varchar sin espacios
      type: DataTypes.DATE,
      allowNull: false,
      },
    // define la clave foreanea en articulosCocina, agregando una columna IdmarcaArticulosCocina en la tabla articulosCocina, que actuara como FK, vinculando a la tabla marcaArticulosCocina
    IdmarcaArticulosCocina: {
      type: DataTypes.INTEGER,
      references: {
        model: marcaArticulosCocina,
        key: 'IdmarcaArticulosCocina'
      }
    }
  }, 
  {
    //Se aprendio a las malas que sequelize te guarda la tabla en plural por defecto ;-;
    tableName: "articulosCocina",
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (articulosCocina, options) {
        if (typeof articulosCocina.Nombre === "string") {
          articulosCocina.Nombre = articulosCocina.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);


//DEFINICION DE RELACION "MUCHOS A UNO entre articulosCocina y marcaArticulosCocina"

// define que una marca puede tener varios articulos
marcaArticulosCocina.hasMany(articulosCocina,{
    foreignKey: 'IdmarcaArticulosCocina',
    sourceKey: 'IdmarcaArticulosCocina'
});

// establece que cada articulo pertenece a una marca
articulosCocina.belongsTo(marcaArticulosCocina,{
    foreignKey: 'IdmarcaArticulosCocina',
    targetKey: 'IdmarcaArticulosCocina'
});

module.exports = {
    sequelize,
    marcaArticulosCocina,
    articulosCocina,
  };