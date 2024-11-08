import axios from 'axios'
const urlResource = "http://localhost:3001/api/clasificaciones";

//Se usa axios con la url dada para llamar a la API
async function getAll() {
    const resp = await axios.get(`${urlResource}`);
    return resp.data;
}

export const clasificacionesService = {
    getAll
};