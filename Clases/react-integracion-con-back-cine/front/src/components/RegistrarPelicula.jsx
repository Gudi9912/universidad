import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form'
import { clasificacionesService } from '../services/clasificaciones.service';
import peliculasService from '../services/peliculas.service';
import { useNavigate } from 'react-router-dom';

export default function RegistrarPelicula() {
    //Handlesubmit sirve de enlace para llamar a la api
    //register trae los datos que nos interesan (titulo, fecha, clasificacion, duracion)
    //formstate: {errores} trae los errores que puedan surguir en el form
    //useForm nos ayuda a manejar los post
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [clasificaciones, setClasificaciones] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getClasificaciones = async () => {
            const clasificaciones = await clasificacionesService.getAll()
            setClasificaciones(clasificaciones);
        }
        getClasificaciones()
    }, [])

    const onSubmit = async (data) => {
        console.log(data)
        //Se guarda el body que entiende el backend en onSubmit
        await peliculasService.post(data)
        navigate("/")
        // await service.saveReserva(data)
    }

    const onVolver = () => {
        // vuelvo
    }
// (...register(titulo)) Crea un objeto con la propiedad titulo que usa lo que esta guardado en el input
    return (
        <div className='container_app'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h5>Registrar Película</h5>
                <div className="form-group">
                    <label htmlFor="titulo">Titulo:</label>
                    <input type="text" className="form-control" id="titulo"  {...register("titulo", { required: 'Este campo es requerido' })} />
                    
                    {errors.titulo && //Se pregunta si existe una propiedad titulo en erores, si existe es que input esta vacio
                    <Alert key='danger' variant='danger'>
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
                            value: /^(0|[1-9]\d*)(\.\d+)?$/, //Es una expresion regular que solo acepta valores numericos del 1 al 9
                            message: `Ingrese solo números enteros positivos`
                        }
                    })} />
                    {errors.duracion && <span className='error'>{errors.duracion.message}</span>}
                </div>
                <div className="form-group" >
                    <label htmlFor="idClasificacion">Clasificación:</label>
                    <select className="form-control" id="idClasificacion" {...register("idClasificacion", { required: 'Este campo es requerido' })}>
                        {/* <option value="Pension completa">Pensión completa</option>
                                <option value="Media pensión">Media Pensión</option>
                                <option value="Solo estadía">Solo estadía</option> */}
                        {clasificaciones && clasificaciones?.map((x) => (
                            <option value={x.id} key={'clasificacion-' + x.id}> {/* key es obligatorio y debe ser unico, o dara error */}
                                {x.nombre}
                            </option>
                        ))}
                    </select>
                    {errors.idClasificacion && <span className='error'>{errors.idClasificacion.message}</span>}
                </div>
                <div className="form-group text-center mt-3">
                    <button type="submit" className="btn btn-primary mx-1">Registrar</button>
                    <button type="reset" className="btn btn-secondary mx-1">Limpiar</button>
                </div>
            </form>
        </div >
    )
}
