import axios from "axios"
//Muy posible error en la url
const urlObra = "http://localhost:3001/api/obras-teatrales"

const getObras = (filtros) => {
    //Si no existe un filtro, devuelve todos
    if (!filtros)
        return getAll();
    //Si el filtro existe, devuelve los que cumplan con la condicion
    return getByFilters(filtros);
}

//Haciendo una llamada a la API mediante axios obtenemos todas las obras
const getAll = async () => {
    const result = await axios.get(urlObra)
    return result.data;
}

//Se llama a el endpoint getbyId del back usando axios
const getByFilters = async (filtros) => {
    //Se modifica la url ya que el getById necesita un parametro nombre opcional
    const url = `${urlObra}?nombre=${filtros.titulo}`
    //Se llama al endpoint usando axios y se guardan los resultados
    const resultado = await axios.get(url)
    return resultado.data
}

//Se llama al endpoint post usando axios
const post = async (obra) => {
    //Se llama a la url usando axios.post y se le pasa el contenido a agregar
    const result = await axios.post(urlObra, obra)
    //El .data contendra lo que sea que el endpoint de la API devuelva
    return result.data 
}

const getById = async (idObra) => {
    const url = `${urlObra}/${idObra}`
    const result = await axios.get(url)
    return result.data
}

const put = async (obra) => {
    const url = `${urlObra}/${obra.Id}`
    const result = await axios.put(url, obra)
    return result.data
}

const borrar = async (idObra) => {
    const url = `${urlObra}/${idObra}`
    const result = await axios.delete(url)
    return result.data
}

const obrasService = {
    getObras,
    post,
    getById,
    put,
    borrar
}

export default obrasService;

