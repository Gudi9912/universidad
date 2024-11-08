import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form'
import { clasificacionesService } from '../services/clasificaciones.service';
import conductoresService from '../services/conductores.service';
import { useNavigate } from 'react-router-dom';
import ConsultarConductores from './ConsultarConductores';

export default function RegistrarConductor() {
    //Register se encarga de conectar a los inputs del formulario
    //handleSubmit se encargara de manejar la validacion y envio del formulario
    //formState: {errors} almacenara los errores de validacion
    const { register, handleSubmit, formState: { errors } } = useForm()
    //Se inicializa el arreglo vacio para luego cargarlo con las clasificaciones de la API
    const [clasificaciones, setClasificaciones] = useState([])
    //Permite cambiar la ruta programaticamente 
    const navigate = useNavigate()

    //Cuando el componente se monte se llamara a getClasificaciones
    
    const getClasificaciones = async () => {
        //Se obtienen las clasificaciones desde la API usando el service y se las guarda
        const clasificaciones = await clasificacionesService.getAll()
        console.log(clasificaciones)
        //Una vez obtenidas actualizo el estado clasificaciones con los datos
        setClasificaciones(clasificaciones);
    }

    useEffect(() => {
        //Se llama al componente una vez se terminie de montar el componente
        getClasificaciones()
    }, [])

    //Esta funcion se ejecutara cuando se envie el formulario, recibiendo sus datos como parametro
    const onSubmit = async (data) => {
        console.log(data)
        //Se envia la informacion a el service para ser posteada
        await conductoresService.post(data)
        //Luego de realizar esto, se redirigue al usuario a la pagina de inicio
        navigate('/')
    }

    return (
        <div className='container_app'>
            {/* Cuando se envie el formulario no se recargara la pagina y se llamara a la funcion onSubmit */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <h5>Registrar Conductor</h5>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    {/* Se registra el campo nombre con el contenido del input */}
                    <input type="text" className="form-control" id="nombre"  {...register("nombre", { required: 'Este campo es requerido' })} />
                    {/* Se verifica si existe algun error en el campo nombre, si existe se muestra */}
                    {errors.nombre && <Alert key='danger' variant='danger'>
                        {errors.nombre.message}
                    </Alert>}
                </div>
                <div className="form-group">
                    <label htmlFor="anotaciones">Anotaciones:</label>
                    {/* Se registra el campo anotaciones con el contenido del input */}
                    <input type="text" className="form-control" id="anotaciones"  {...register("anotaciones")} />
                    {errors.anotaciones && <span className='error'>{errors.anotaciones.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
                    {/* Se registra el campo fechaNacimiento con el contenido del input */}
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
                    {/* Se registra el campo idClasificacion con el contenido del input */}
                    <select className="form-control" id="idClasificacion" {...register("idClasificacion", { required: 'Este campo es requerido' })}>
                        {/* Se verifica que el arreglo clasificaciones no esta vacio y se itera sobre el */}
                        {clasificaciones && clasificaciones?.map((x) => (
                            //Se muestra el valor de cada clasificacion, usando su id como guia
                            //Ademas, react necesita que cada componente tenga una key unica asociada
                            <option value={x.id} key={'clasificacion-' + x.id}>
                                {x.titulo}
                            </option>
                        ))}
                    </select>
                    {errors.idClasificacion && <span className='error'>{errors.idClasificacion.message}</span>}
                </div>
                <div className="form-group text-center mt-3">
                    {/* Se llama a la funcion onSubmit */}
                    <button type="submit" className="btn btn-primary mx-1">Registrar</button>
                    {/* Se limpian todos los datos de iformacion */}
                    <button type="reset" className="btn btn-secondary mx-1">Limpiar</button>
                </div>
            </form>
            <div>
            <ConsultarConductores></ConsultarConductores>
            </div>
        </div >
        
    )
}
