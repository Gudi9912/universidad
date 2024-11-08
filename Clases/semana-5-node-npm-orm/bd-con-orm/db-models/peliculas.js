const { DataTypes } = require("sequelize");

const peliculaAtributos ={
    idPelicula: {
        type: DataTypes.INTEGER,
        autoIncremental: true,
        primaryKey: true,
        allowNull: false

    },
    tituloPelicula: {
        type: DataTypes.STRING,
        allowNull: false
    },
    directorPelicula: {
        type: DataTypes.STRING,
        allowNull: false
    },
    generoPelicula: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sinopsisPelicula: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duracionPelicula: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    eliminadoPelicula: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    idClasificacionPelicula: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}

//Sequelize añade 2 timestamps solo, fecha de creacion y actualizacion, asi se desactivan
const PeliculasOptions = {
    timestamps: false
}

const PeliculasModel = {
    PeliculaAtributos: peliculaAtributos
    /*Idpelicula: idPelicula,
    GeneroPelicula: generoPelicula,
    TituloPelicula: tituloPelicula,
    DirectorPelicula: directorPelicula,
    DuracionPelicula: duracionPelicula,
    SinopsisPelicula: sinopsisPelicula,
    EliminadoPelicula: eliminadoPelicula*/
}

module.exports = PeliculasModel, PeliculasOptions