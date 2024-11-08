import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form'
import { clasificacionesService } from '../services/clasificaciones.service';
import peliculasService from '../services/peliculas.service';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarPelicula() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [clasificaciones, setClasificaciones] = useState([])
    const [pelicula, setPelicula] = useState() // importante dejarlo vacio, seria igual a conductores=undefined, para que se renderice recien cuando se reciba los datos 
    const navigate = useNavigate()
    const params = useParams(); // sirve para obtener los valores de la URL en el navegador

    useEffect(() => {
        const getInicialData = async () => {
            await getPeliculaById() // obtengo los datos de la pelicula a partir del id de la url
            await getClasificaciones() // obtengo las calificaciones para llenar el combo
        }
        getInicialData()
    }, [])

    const getPeliculaById = async () => {
        const p = await peliculasService.getById(params.id) // el valor :id tiene que coincidir el nombre con el mismo declarado en App.js cuando se decalra la ruta
        console.log('getPeliculaById', p)
        setPelicula(p) // almaceno lo que me devolvio el back en mi varible del componente `pelicula`
    }

    const getClasificaciones = async () => {
        const clasificaciones = await clasificacionesService.getAll()
        setClasificaciones(clasificaciones);
    }


    const onSubmit = async (data) => {
        console.log(data)
        data.id = pelicula.id // seteo en los datos que voy a mardar al servicio el id de la pelicula, porque en data me llega solo lo que cargo desde el form, y aca no se carga el id sino que lo tengo en la url y a partir de la url, en este metodo `getPeliculaById` obtuve los datos y lo almacene en mi variable pelicula
        await peliculasService.put(data)
        navigate('/')
    }

    const onVolver = () => {
        // vuelvo
    }

    return (
        <div className='container_app'>
            {pelicula && (

                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5>Editar Película</h5>
                    {pelicula.titulo}
                    <div className="form-group">
                        <label htmlFor="titulo">Titulo:</label>
                        <input type="text" className="form-control" id="titulo" {...register("titulo", { value: pelicula.titulo, required: 'Este campo es requerido' })} />
                        {errors.titulo && <Alert key='danger' variant='danger'>
                            {errors.titulo.message}
                        </Alert>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="fechaIngreso">Fecha ingreso:</label>
                        <input type="date" className="form-control" id="fechaIngreso" {...register("fechaIngreso")} />
                        {errors.fechaIngreso && <span className='error'>{errors.fechaIngreso.message}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="duracion">Duración (minutos):</label>
                        <input type="number" className="form-control" id="duracion" {...register("duracion", {
                            valueAsNumber: true,
                            min: { value: 0, message: `Solo valores positivos` },
                            pattern: {
                                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                message: `Ingrese solo números enteros positivos`
                            }
                        })} />
                        {errors.duracion && <span className='error'>{errors.duracion.message}</span>}
                    </div>
                    <div className="form-group" >
                        <label htmlFor="idClasificacion">Clasificación:</label>
                        <select className="form-control" id="idClasificacion" {...register("idClasificacion", { value: pelicula.clasificacion?.id, required: 'Este campo es requerido' })}>
                            {clasificaciones && clasificaciones?.map((x) => (
                                <option value={x.id} key={'clasificacion-' + x.id}>
                                    {x.nombre}
                                </option>
                            ))}
                        </select>
                        {errors.idClasificacion && <span className='error'>{errors.idClasificacion.message}</span>}
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
