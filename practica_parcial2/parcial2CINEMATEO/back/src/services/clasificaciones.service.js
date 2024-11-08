import sequelize from "../models/database.js"


const getClasificaciones = async () => {
    const resultado = await sequelize.models.Clasificaciones.findAll({
        attributes: [
            'Id',
            'Titulo'
        ],
        order: [['Titulo', 'ASC']]
    })
    return resultado.map(p => {
        return {
            id: p.dataValues.Id,
            titulo: p.dataValues.Titulo
        }
    })
}


const clasificacionesService = {
    getClasificaciones
}

export default clasificacionesService;
