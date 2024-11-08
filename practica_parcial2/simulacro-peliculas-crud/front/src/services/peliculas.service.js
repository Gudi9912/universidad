import axios from "axios";

const urlPelicula = "http://localhost:3000/api/peliculas";

const getPeliculas = (filtros) => {
    if (!filtros)
        return getAll();
    return getByFilters(filtros);
}

const getAll = async () => {
    const result = await axios.get(urlPelicula)
    return result.data
}

const getByFilters = async (filtros) => {
    const url = `${urlPelicula}?titulo=${filtros.titulo}`
    const result = await axios.get(url)
    return result.data
}

const getById = async (idPelicula) => {
    const url = `${urlPelicula}/${idPelicula}`
    const result = await axios.get(url)
    return result.data
}

const post = async (pelicula) => {
    const result = await axios.post(urlPelicula, pelicula)
    return result.data
}

const put = async (pelicula) => {
    const url = `${urlPelicula}/${pelicula.id}`
    const result = await axios.put(url, pelicula)
    return result.data
}

const borrar = async (idPelicula) => {
    const url = `${urlPelicula}/${idPelicula}`
    const result = await axios.delete(url)
    return result.data
}

const peliculasService = {
    getPeliculas,
    getById,
    post,
    put,
    borrar
}

export default peliculasService;

