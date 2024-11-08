import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form'
import { clasificacionesService } from '../services/clasificaciones.service';
import conductoresService from '../services/conductores.service';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarConductor() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [clasificaciones, setClasificaciones] = useState([])
    const [conductor, setConductor] = useState() // importante dejarlo vacio, seria igual a conductores=undefined, para que se renderice recien cuando se reciba los datos desde la API
    const navigate = useNavigate()
    const params = useParams(); // sirve para obtener los valores de la URL en el navegador

    useEffect(() => {
        const getInicialData = async () => {
            getConductorById() // obtengo los datos de la conductor a partir del id de la url
            await getClasificaciones() // obtengo las calificaciones para llenar el combo
        }
        getInicialData()
    }, [])


    const getConductorById = async () => {
        const p = await conductoresService.getById(params.id) // el valor :id tiene que coincidir el nombre con el mismo declarado en App.js cuando se decalra la ruta
        console.log('getCondutorById', p)
        setConductor(p) // almaceno lo que me devolvio el back en mi varible del componente `conductor`
    }


    const getClasificaciones = async () => {
        const clasificaciones = await clasificacionesService.getAll()
        setClasificaciones(clasificaciones);
    }


    const onSubmit = async (data) => {
        console.log(data)
        data.id = conductor.id // seteo en los datos que voy a mardar al servicio el id de la conductor, porque en data me llega solo lo que cargo desde el form, y aca no se carga el id sino que lo tengo en la url y a partir de la url, en este metodo `getCondutorById` obtuve los datos y lo almacene en mi variable conductor
        await conductoresService.put(data)
        navigate('/')
    }

    const getFechaAMostrar = (fechaString) => {
        // Desde el back la fecha que llega es un string que tiene este formato: `2010-12-13T00:00:00.000Z` 
        // El input de fechas solo entiende fechas en el formato `2010-12-13` en string
        // esta función toma la fecha en string que viene de la API en la request HTTP y si es distinto a un string vacio genera un objeto date para despues devulver el string en formato `
        if (!fechaString) //importante considerar si viene vacio sino da error
            return ''
        const fecha = new Date(fechaString)
        console.log(fecha)
        // la mes le sumo 1 porque esa funcion getMonth devuelve los meses desde el 0 al 11
        return `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`
    }

    const onVolver = () => {
        // vuelvo
        navigate('/')
    }

    return (
        <div className='container_app'>
            {/* si no agregan esta condicion va a quere renderizar cuando todavia no tiene el dato conductor que les devuelve el back y se va a romper  */}
            {/* {`conductor && (ACA ADENTRO VA EL PSEUDO HTML)`:  esta condicion valida que conducto!=undefined */}
            {conductor && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5>Editar Conductor</h5>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre:</label>
                        {/* acá agrego el `disabled` para que no se pueda editar desde el front porque por regla de negocio el nombre no es editable. Ademas al tener el disabled hay que sacar el validador sino react va a seguir esperando que se quite el disabled y va validarlo. */}
                        <input disabled type="text" className="form-control" id="nombre"  {...register("nombre", { value: conductor.nombre })} />
                        {errors.nombre && <Alert key='danger' variant='danger'>
                            {errors.nombre.message}
                        </Alert>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="anotaciones">Anotaciones:</label>
                        <input type="text" className="form-control" id="anotaciones" {...register("anotaciones", { value: conductor.anotaciones, maxLength: 100 })} />
                        {errors.anotaciones && <Alert key='danger' variant='danger'>
                            {errors.anotaciones.message}
                        </Alert>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="fechaNacimiento">Fecha Nacimiento:</label>
                        <input type="date" className="form-control" id="fechaNacimiento" {...register("fechaNacimiento", { value: getFechaAMostrar(conductor.fechaNacimiento), required: 'Este campo es requerido' })} />  {/* revisar porque esta este metodo aca getFechaAMostrar */}
                        {errors.fechaNacimiento && <span className='error'>{errors.fechaNacimiento.message}</span>} 
                    </div>
                    <div className="form-group">
                        <label htmlFor="cantidadCarreras">Cantidad de carreras corridas:</label>
                        <input type="number" className="form-control" id="cantidadCarreras" {...register("cantidadCarreras", {
                            value: conductor.cantidadCarreras,
                            valueAsNumber: true,
                            min: { value: 0, message: `Solo valores positivos` }
                        })} />
                        {errors.cantidadCarreras && <span className='error'>{errors.cantidadCarreras.message}</span>}
                    </div>
                    <div className="form-group" >
                        <label htmlFor="idClasificacion">Clasificación:</label>
                        <select className="form-control" id="idClasificacion" {...register("idClasificacion", {
                            value: conductor.clasificacion?.id,
                            required: 'Este campo es requerido'})}>
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
                        <button type="button" className="btn btn-secondary mx-1" onClick={onVolver}>Volver</button>
                    </div>
                </form>
            )}
        </div >
    )
}
