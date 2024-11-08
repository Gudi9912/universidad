import sequelize from "../models/database.js";
import { Op } from "sequelize";

const getConductor = async (id) => {
    const where = { Id: parseInt(id) };
    const resultado = await sequelize.models.Conductores.findOne({
        attributes: [
            'Id',
            'Nombre',
            'Anotaciones',
            'Eliminado',
            'IdClasificacion',
            'FechaNacimiento',
            'CantidadCarreras',
        ],
        where,
        include: [sequelize.models.Clasificaciones], // https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/#using-findandcountall-with-includes
    })
    console.log(resultado) // console para ver que deevuelve 
    return {
        id: resultado.dataValues.Id,
        nombre: resultado.dataValues.Nombre,
        anotaciones: resultado.dataValues.Anotaciones,
        fechaNacimiento: resultado.dataValues.FechaNacimiento,
        cantidadCarreras: resultado.dataValues.CantidadCarreras,
        clasificacion: {
            id: resultado.dataValues.Clasificacione.Id,
            titulo: resultado.dataValues.Clasificacione.Titulo
        }
    }
}

const getConductores = async (filtros) => {
    const where = { Eliminado: false };
    if (filtros.nombre)
        where.Nombre = { [Op.like]: `%${filtros.nombre}%` }
    if (filtros.incluirEliminados)
        where.Eliminado = undefined
    const resultado = await sequelize.models.Conductores.findAll({
        attributes: [
            'Id',
            'Nombre',
            'Anotaciones',
            'Eliminado',
            'IdClasificacion',
            'FechaNacimiento',
            'CantidadCarreras',
        ],
        where,
        include: [sequelize.models.Clasificaciones], // https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/#using-findandcountall-with-includes
        order: [['Nombre', 'ASC']]
    })
    // console.log(resultado) // console para ver que deevuelve 
    return resultado.map(p => { //para cada objeto para devolver objetos con con propiedades que empiezen con minuscula
        return {
            id: p.dataValues.Id,
            nombre: p.dataValues.Nombre,
            anotaciones: p.dataValues.Anotaciones,
            fechaNacimiento: p.dataValues.FechaNacimiento,
            cantidadCarreras: p.dataValues.CantidadCarreras,
            clasificacion: {
                id: p.dataValues.Clasificacione.Id,
                titulo: p.dataValues.Clasificacione.Titulo
            }
        }
    })
}

const insertarConductor = async (conductoresCmd) => {
    const resultado = await sequelize.models.Conductores.create({
            Nombre: conductoresCmd.nombre,
            Anotaciones: conductoresCmd.anotaciones,
            Eliminado: false,
            IdClasificacion: conductoresCmd.idClasificacion,
            FechaNacimiento: conductoresCmd.fechaNacimiento,
            CantidadCarreras: conductoresCmd.cantidadCarreras
        })
    // console.log('insertar', resultado)
    return {
        id: resultado.dataValues.Id,
        nombre: resultado.dataValues.Nombre,
    };
}

// ====================PUT====================
const editarConductor = async (conductoresCmd) => {
    const obra = await sequelize.models.Conductores.findOne({
        where: { Id: conductoresCmd.id, Eliminado: false },
    });
    if (!obra) {
        throw new Error("obra teatral no encontrada");

    }
    const updatedobra = await sequelize.models.Conductores.update(
        {
            Anotaciones: conductoresCmd.anotaciones,
            IdClasificacion: conductoresCmd.idClasificacion,
            FechaNacimiento: conductoresCmd.fechaNacimiento,
            CantidadCarreras: conductoresCmd.cantidadCarreras
        },
        {
            where: { Id: conductoresCmd.id }
        });
    console.log(obra)
    return { id: conductoresCmd.id };
}

// ====================DELETE====================
const eliminarConductor = async (conductoresCmd) => {
    const obra = await sequelize.models.Conductores.findOne({
        where: { Id: conductoresCmd.id, Eliminado: false },
    });
    if (!obra) {
        throw new Error("obra teatral no encontrada");

    }
    const updatedobra = await sequelize.models.Conductores.update(
        {
            Eliminado: true
        },
        {
            where: { Id: conductoresCmd.id }
        });
    console.log(obra)
    return { id: conductoresCmd.id };
}

const ConductoresService = {
    getConductor,
    getConductores,
    insertarConductor,
    editarConductor,
    eliminarConductor
}

export default ConductoresService;
