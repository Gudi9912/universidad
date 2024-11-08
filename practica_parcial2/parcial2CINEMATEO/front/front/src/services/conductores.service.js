import axios from 'axios';

const API_URL = 'http://localhost:3001/api/conductores';

// Modificar getConductores para aceptar filtros
const getConductores = async (filtros) => {
    if (!filtros) {
        return getAll();
    }
    return getByFilters(filtros);
};

const getAll = async () => {
    const result = await axios.get(API_URL)
    return result.data
}

//Se llama a el endpoint getbyId del back usando axios
//devuelve los datos de los conductores que coincidan con los filtros
const getByFilters = async (filtros) => {
    //Se modifica la url ya que el getById necesita un parametro nombre opcional
    const url = `${API_URL}?nombre=${filtros.nombre}`
    const result = await axios.get(url)
    return result.data
}

const getById = async (idConductor) => {
    const url = `${API_URL}/${idConductor}`
    const result = await axios.get(url)
    return result.data
}

//Se llama al endpoint post usando axios
const post = async (conductor) => {
    //Se llama a la url usando axios.post y se le pasa el contenido a agregar
    const result = await axios.post(API_URL, conductor)
    //El .data contendra lo que sea que el endpoint de la API devuelva
    return result.data
}

const put = async (condutor) => {
    const url = `${API_URL}/${condutor.id}`
    const result = await axios.put(url, condutor)
    return result.data
}

const eliminate = async (idConductor) => {
    const url = `${API_URL}/${idConductor}`
    const result = await axios.delete(url)
    return result.data
}

const conductoresService = {
    getConductores,
    getById,
    post,
    put,
    eliminate
};

export default conductoresService;
