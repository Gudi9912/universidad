import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form'
//import { clasificacionesService } from '../services/clasificaciones.service';
import obraService from './services/obra.service';
import { useNavigate, useParams } from 'react-router-dom';

export default function Editar() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    //const [clasificaciones, setClasificaciones] = useState([])
    const [obra, setObra] = useState() // importante dejarlo vacio, seria igual a conductores=undefined, para que se renderice recien cuando se reciba los datos 
    const navigate = useNavigate()
    const params = useParams(); // sirve para obtener los valores de la URL en el navegador

    useEffect(() => {
        const getInicialData = async () => {
            await getObraById() // obtengo los datos de la pelicula a partir del id de la url
            //await getClasificaciones() // obtengo las calificaciones para llenar el combo
        }
        getInicialData()
    }, [])

    const getObraById = async () => {
        const o = await obraService.getById(params.id) // el valor :id tiene que coincidir el nombre con el mismo declarado en App.js cuando se decalra la ruta
        console.log('getObraById', o)
        setObra(o) // almaceno lo que me devolvio el back en mi varible del componente `piloto`
    }

    // const getClasificaciones = async () => {
    //     const clasificaciones = await clasificacionesService.getAll()
    //     setClasificaciones(clasificaciones);
    // }


    const onSubmit = async (data) => {
        console.log(data)
        data.Id = obra.Id // seteo en los datos que voy a mardar al servicio el id de la piloto, porque en data me llega solo lo que cargo desde el form, y aca no se carga el id sino que lo tengo en la url y a partir de la url, en este metodo `getPilotoById` obtuve los datos y lo almacene en mi variable piloto
        await obraService.put(data)
        navigate('/')
    }

    return (
        <div className='container_app'>
            {obra && (

                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5>Editar Obra de teatro</h5>
                    {obra.Titulo}
                    <div className="form-group">
                        <label htmlFor="Titulo">Titulo:</label>
                        <input type="text" className="form-control" id="Titulo" {...register("Titulo", { value: obra.Titulo, required: 'Este campo es requerido' })} />
                        {errors.Titulo && <Alert key='danger' variant='danger'>
                            {errors.Titulo.message}
                        </Alert>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="Director">Director:</label>
                        <input type="text" className="form-control" id="Director" {...register("Director")} />
                        {errors.Director && <span className='error'>{errors.Director.message}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="PrecioEntrada">Precio de la entrada:</label>
                        <input type="text" className="form-control" id="PrecioEntrada" {...register("PrecioEntrada")} />
                        {errors.PrecioEntrada && <span className='error'>{errors.PrecioEntrada.message}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="FechaDesde">Fecha desde:</label>
                        <input type="date" className="form-control" id="FechaDesde" {...register("FechaDesde")} />
                        {errors.FechaDesde && <span className='error'>{errors.FechaDesde.message}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="FechaHasta">Fecha hasta:</label>
                        {/* Se registra el campo cantidadCarreras con el contenido del input */}
                        <input type="date" className="form-control" id="FechaHasta" {...register("FechaHasta")} />
                        {errors.FechaHasta && <span className='error'>{errors.FechaHasta.message}</span>}
                    </div>                    
                    <div className="form-group text-center mt-3">
                        <button type="submit" className="btn btn-primary mx-1">Guardar</button>
                        <button type="reset" className="btn btn-secondary mx-1">Limpiar</button>
                    </div>
                </form>
            )}
        </div >
    )
}
