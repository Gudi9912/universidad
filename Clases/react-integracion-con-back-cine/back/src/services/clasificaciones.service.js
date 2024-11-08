import { sequelize } from "../models/db.js"


const getAll = async () => {
    const resultado = await sequelize.models.clasificaciones.findAll()
    console.log('resultado', resultado)
    return resultado.map(p => {
        return {
            id: p.dataValues.IdClasificacion,
            nombre: p.dataValues.NombreClasificacion
        }
    })
}


const clasificacionesService = {
    getAll
}

export default clasificacionesService;
