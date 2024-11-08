import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form'
import { clasificacionesService } from '../services/clasificaciones.service';
import peliculasService from '../services/peliculas.service';
import { useNavigate } from 'react-router-dom';

export default function RegistrarPelicula() {
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
        await peliculasService.post(data)
        navigate('/')
    }

    const onVolver = () => {
        // vuelvo
    }

    return (
        <div className='container_app'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h5>Registrar Película</h5>
                <div className="form-group">
                    <label htmlFor="titulo">Titulo:</label>
                    <input type="text" className="form-control" id="titulo"  {...register("titulo", { required: 'Este campo es requerido' })} />
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
                    <select className="form-control" id="idClasificacion" {...register("idClasificacion", { required: 'Este campo es requerido' })}>
                        {clasificaciones && clasificaciones?.map((x) => (
                            <option value={x.id} key={'clasificacion-' + x.id}>
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
