import axios from "axios"
const urlPiloto = "http://localhost:3001/api/conductores"

const getPilotos = (filtros) => {
    //Si no existe un filtro, devuelve todos
    if (!filtros)
        return getAll();
    //Si el filtro existe, devuelve los que cumplan con la condicion
    return getByFilters(filtros);
}

//Haciendo una llamada a la API mediante axios obtenemos todos los pilotos
const getAll = async () => {
    const result = await axios.get(urlPiloto)
    return result.data;
}

//Se llama a el endpoint getbyId del back usando axios
const getByFilters = async (filtros) => {
    //Se modifica la url ya que el getById necesita un parametro nombre opcional
    const url = `${urlPiloto}?nombre=${filtros.nombre}`
    console.log(url)
    //Se llama al endpoint usando axios y se guardan los resultados
    const resultado = await axios.get(url)
    return resultado.data
}

//Se llama al endpoint post usando axios
const post = async (piloto) => {
    //Se llama a la url usando axios.post y se le pasa el contenido a agregar
    const result = await axios.post(urlPiloto, piloto)
    //El .data contendra lo que sea que el endpoint de la API devuelva
    return result.data 
}

const getById = async (idPiloto) => {
    const url = `${urlPiloto}/${idPiloto}`
    const result = await axios.get(url)
    return result.data
}

const put = async (piloto) => {
    const url = `${urlPiloto}/${piloto.id}`
    const result = await axios.put(url, piloto)
    return result.data
}

const borrar = async (idPiloto) => {
    const url = `${urlPiloto}/${idPiloto}`
    const result = await axios.delete(url)
    return result.data
}

const pilotosService = {
    getPilotos,
    post,
    getById,
    put,
    borrar
}

export default pilotosService;

