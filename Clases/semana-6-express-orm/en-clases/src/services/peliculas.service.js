import { peliculas } from "./datos.js"


const getPeliculas = async () => {
    const resultado = peliculas
    console.log('resultado', resultado)
    return resultado.map(p => {
        return {
            id: p.Id,
            titulo: p.Titulo,
            director: p.Director,
            genero: p.Genero,
            duracion: p.Duracion,
            idClasificacion: p.IdClasificacion
        }
    })
}

const insertarPelicula = async (peliculaCmd) => {
    const nueva = {
        Titulo: peliculaCmd.titulo,
        Director: peliculaCmd.director,
        Genero: peliculaCmd.genero,
        Sinopsis: peliculaCmd.sinopsis,
        Duracion: peliculaCmd.duracion,
        Eliminado: false,
        IdClasificacion: peliculaCmd.idClasificacion
    }
    peliculas.push(nueva)
    console.log('insertar pelicula', nueva)
    return {
        id: nueva.Id,
        titulo: nueva.Titulo,
    };
}

// ====================PUT====================
const editarPelicula = async (peliculaCmd) => {
    const pelicula = peliculas.find(p=>p.Id == peliculaCmd.id);
    if (!pelicula) {
        console.log("Película no encontrada");
    }
    pelicula.Titulo = peliculaCmd.titulo,
    pelicula.Director = peliculaCmd.director,
    pelicula.Genero = peliculaCmd.genero,
    pelicula.Sinopsis = peliculaCmd.sinopsis,
    pelicula.Duracion = peliculaCmd.duracion,
    pelicula.IdClasificacion = peliculaCmd.idClasificacion
    console.log(updatedPelicula)
    return { id: peliculaCmd.id };

}

const peliculasService = {
    getPeliculas,
    insertarPelicula,
    editarPelicula
}

export default peliculasService;
