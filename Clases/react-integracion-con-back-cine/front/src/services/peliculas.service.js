import { peliculas } from "../mock-data/peliculas.data";
import axios from "axios"
const urlpelicula = "http://localhost:3000/api/peliculas"

const getPeliculas = (filtros) => {
    if (!filtros)
        return getAll();
    return getByFilters(filtros);
}

const getAll = () => {
    return peliculas;
}

const getByFilters = (filtros) => {
    const resultado = peliculas
        .filter((p) => {
            return p.titulo.toLocaleLowerCase()
                .includes(filtros.titulo.toLocaleLowerCase())
        })
    return resultado;
}

const post = async (pelicula) => {
    const result = await axios.post(urlpelicula, pelicula) //Las request van y vienen en json
    return result.data //siempre va data
}
const peliculasService = {
    getPeliculas,
    post
}

export default peliculasService;

