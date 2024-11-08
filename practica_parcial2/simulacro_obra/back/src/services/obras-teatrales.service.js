import sequelize from "../models/database.js";
import { Op } from "sequelize";


const getObrasTeatrales = async (filtros) => {
    const where = {};
    if (filtros.titulo)
        where.Titulo =  { [Op.like]: `%${filtros.titulo}%` }
    if (filtros.director)
        where.Director =  { [Op.like]: `%${filtros.director}%` }
    const resultado = await sequelize.models.ObrasTeatrales.findAll({
        attributes: [
            'Id',
            'Titulo',
            'Director',
            'Eliminado',
            'IdClasificacion'
        ],
        where,
        include: [sequelize.models.Clasificaciones], // https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/#using-findandcountall-with-includes
        order: [['Titulo', 'ASC']]
    })
    // console.log(resultado) // console para ver que deevuelve 
    return resultado.map(p => { //para cada objeto para devolver objetos con con propiedades que empiezen con minuscula
        return {
            id: p.dataValues.Id,
            titulo: p.dataValues.Titulo,
            director: p.dataValues.Director,
            clasificacion: {
                id: p.dataValues.Clasificacione.Id,
                titulo: p.dataValues.Clasificacione.Titulo
            }
        }
    })
}

const insertarObraTeatral = async (obraTeatralCmd) => {
    const resultado = await sequelize.models
    .ObrasTeatrales.create({
        Titulo: obraTeatralCmd.titulo,
        Director: obraTeatralCmd.director,
        Eliminado: false,
        IdClasificacion: obraTeatralCmd.idClasificacion
    })
    console.log('insertar Obra Teatral', resultado)
    return {
        id: resultado.dataValues.Id,
        titulo: resultado.dataValues.Titulo,
    };
}

// ====================PUT====================
const editarObraTeatral = async (obraTeatralCmd) => {
    const obra = await sequelize.models.ObrasTeatrales.findOne({
        where: { Id: obraTeatralCmd.id, Eliminado: false },
    });
    if (!obra) {
        throw new Error("obra teatral no encontrada");

    }

    const updatedobra = await sequelize.models.ObrasTeatrales.update(
        {
            Titulo: obraTeatralCmd.titulo,
            Director: obraTeatralCmd.director,
            IdClasificacion: obraTeatralCmd.idClasificacion
        },
        {
            where: { Id: obraTeatralCmd.id }
        });
    console.log(obra)
    return { id: obraTeatralCmd.id };

}

const obrasTeatralesService = {
    getObrasTeatrales,
    insertarObraTeatral,
    editarObraTeatral
}

export default obrasTeatralesService;
