import axios from "axios";

// Cambiar la URL base a una variable para que sea reutilizable
const API_URL = "http://localhost:3000/articulosLimpieza";

// Función para obtener todos los elementos o aplicar filtros si se pasan
const getAll = async (filtros = {}) => {
    try {
        // Si no hay filtros, obtén todos los elementos
        const url = filtros.Nombre ? `${API_URL}/getByNombre?Nombre=${filtros.Nombre}` : `${API_URL}/get`;
        const result = await axios.get(url);
        return result.data;
    } catch (error) {
        console.error("Error al obtener los datos", error);
        throw error;
    }
};

// Función para obtener un solo artículo por su id
const getById = async (id) => {
    try {
        const result = await axios.get(`${API_URL}/getById?IdarticulosLimpieza=${id}`);
        return result.data;
    } catch (error) {
        console.error("Error al obtener el artículo por ID", error);
        throw error;
    }
};

// Función para crear un nuevo artículo
const post = async (articulo) => {
    try {
        const result = await axios.post(`${API_URL}/post`, articulo);
        return result.data;
    } catch (error) {
        console.error("Error al crear el artículo", error);
        throw error;
    }
};

// Función para actualizar un artículo existente
const put = async (articulo) => {
    try {
        const result = await axios.put(`${API_URL}/put/${articulo.id}`, articulo);
        return result.data;
    } catch (error) {
        console.error("Error al actualizar el artículo", error);
        throw error;
    }
};

// Función para eliminar un artículo
const borrar = async (id) => {
    try {
        const result = await axios.delete(`${API_URL}/delete/${id}`);
        return result.data;
    } catch (error) {
        console.error("Error al eliminar el artículo", error);
        throw error;
    }
};

const limpiezaService = {
    getAll,
    getById,
    post,
    put,
    borrar
};

export default limpiezaService;
