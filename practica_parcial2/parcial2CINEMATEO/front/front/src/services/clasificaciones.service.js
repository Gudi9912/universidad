import axios from 'axios';

const API_URL = 'http://localhost:3001/api/clasificaciones';

const getAll = async () => {
    const result = await axios.get(API_URL)
    return result.data
}

export const clasificacionesService = {
    getAll
};

