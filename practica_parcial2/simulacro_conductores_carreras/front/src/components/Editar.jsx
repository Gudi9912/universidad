import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form'
import { clasificacionesService } from '../services/clasificaciones.service';
import pilotosService from '../services/piloto.service';
import { useNavigate, useParams } from 'react-router-dom';

export default function Editar() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [clasificaciones, setClasificaciones] = useState([])
    const [piloto, setPiloto] = useState() // importante dejarlo vacio, seria igual a conductores=undefined, para que se renderice recien cuando se reciba los datos 
    const navigate = useNavigate()
    const params = useParams(); // sirve para obtener los valores de la URL en el navegador

    useEffect(() => {
        const getInicialData = async () => {
            await getPilotoById() // obtengo los datos de la pelicula a partir del id de la url
            await getClasificaciones() // obtengo las calificaciones para llenar el combo
        }
        getInicialData()
    }, [])

    const getPilotoById = async () => {
        const p = await pilotosService.getById(params.id) // el valor :id tiene que coincidir el nombre con el mismo declarado en App.js cuando se decalra la ruta
        console.log('getPilotoById', p)
        setPiloto(p) // almaceno lo que me devolvio el back en mi varible del componente `piloto`
    }

    const getClasificaciones = async () => {
        const clasificaciones = await clasificacionesService.getAll()
        setClasificaciones(clasificaciones);
    }


    const onSubmit = async (data) => {
        console.log(data)
        data.id = piloto.id // seteo en los datos que voy a mardar al servicio el id de la piloto, porque en data me llega solo lo que cargo desde el form, y aca no se carga el id sino que lo tengo en la url y a partir de la url, en este metodo `getPilotoById` obtuve los datos y lo almacene en mi variable piloto
        await pilotosService.put(data)
        navigate('/')
    }

    return (
        <div className='container_app'>
            {piloto && (

                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5>Editar Piloto</h5>
                    {piloto.nombre}
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" className="form-control" id="nombre" {...register("nombre", { value: piloto.nombre, required: 'Este campo es requerido' })} />
                        {errors.nombre && <Alert key='danger' variant='danger'>
                            {errors.nombre.message}
                        </Alert>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="anotaciones">Anotaciones:</label>
                        <input type="text" className="form-control" id="anotaciones" {...register("anotaciones")} />
                        {errors.anotaciones && <span className='error'>{errors.anotaciones.message}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
                        <input type="date" className="form-control" id="fechaNacimiento" {...register("fechaNacimiento")} />
                        {errors.fechaNacimiento && <span className='error'>{errors.fechaNacimiento.message}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="cantidadCarreras">Cantidad de carreras:</label>
                        {/* Se registra el campo cantidadCarreras con el contenido del input */}
                        <input type="number" className="form-control" id="cantidadCarreras" {...register("cantidadCarreras", {
                            valueAsNumber: true,
                            //Se verifica que el numero de vueltas no sea negativo
                            min: { value: 0, message: `Solo valores positivos` },                        
                            //Se verifica que el input este formado solo por numeros enteros
                            pattern: {
                                value: /^(0|[1-9]\d*)/,
                                message: `Ingrese solo números enteros positivos`
                            }
                        })} />
                        {errors.cantidadCarreras && <span className='error'>{errors.cantidadCarreras.message}</span>}
                    </div>
                    <div className="form-group" >
                        <label htmlFor="idClasificacion">Clasificación:</label>
                        <select className="form-control" id="idClasificacion" {...register("idClasificacion", { value: piloto.clasificacion?.id, required: 'Este campo es requerido' })}>
                            {clasificaciones && clasificaciones?.map((x) => (
                                <option value={x.id} key={'clasificacion-' + x.id}>
                                    {x.titulo}
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
