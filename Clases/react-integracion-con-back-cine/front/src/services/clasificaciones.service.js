import axios from 'axios'
const urlResource = "http://localhost:3000/api/clasificaciones";

//Ejemplo de como se usa el axios con el get
async function getAll() {
    const resp = await axios.get(`${urlResource}`);
    return resp.data;
}

export const clasificacionesService = {
    getAll
};