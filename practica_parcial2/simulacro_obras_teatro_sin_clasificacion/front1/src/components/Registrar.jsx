import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form'
//import { clasificacionesService } from '../services/clasificaciones.service';
import obrasService from './services/obra.service';
import { useNavigate } from 'react-router-dom';
import ConsultarObra from './Consultar';

export default function RegistrarObra() {
    //Register se encarga de conectar a los inputs del formulario
    //handleSubmit se encargara de manejar la validacion y envio del formulario
    //formState: {errors} almacenara los errores de validacion
    const { register, handleSubmit, formState: { errors } } = useForm()
    //Se inicializa el arreglo vacio para luego cargarlo con las clasificaciones de la API
    //const [clasificaciones, setClasificaciones] = useState([])
    //Permite cambiar la ruta programaticamente
    const navigate = useNavigate()

    // //Cuando el componente se monte se llamara a getClasificaciones
    // useEffect(() => {
    //     const getClasificaciones = async () => {
    //         //Se obtienen las clasificaciones desde la API usando el service y se las guarda
    //         const clasificaciones = await clasificacionesService.getAll()
    //         console.log(clasificaciones)
    //         //Una vez obtenidas actualizo el estado clasificaciones con los datos
    //         setClasificaciones(clasificaciones);
    //     }
    //     //Se llama al componente una vez se terminie de montar el componente
    //     getClasificaciones()
    // }, [])

    //Esta funcion se ejecutara cuando se envie el formulario, recibiendo sus datos como parametro
    const onSubmit = async (data) => {
        console.log(data)
        //Se envia la informacion a el service para ser posteada
        await obrasService.post(data)
        //Luego de realizar esto, se redirigue al usuario a la pagina de inicio
        //navigate('/')
    }

    return (
        <div className='container_app'>
            {/* Cuando se envie el formulario no se recargara la pagina y se llamara a la funcion onSubmit */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <h5>Registrar Obra de teatro</h5>
                <div className="form-group">
                    <label htmlFor="Titulo">Titulo:</label>
                    {/* Se registra el campo nombre con el contenido del input */}
                    <input type="text" className="form-control" id="Titulo"  {...register("Titulo", { required: 'Este campo es requerido' })} />
                    {/* Se verifica si existe algun error en el campo nombre, si existe se muestra */}
                    {errors.Titulo && <Alert key='danger' variant='danger'>
                        {errors.Titulo.message}
                    </Alert>}
                </div>
                <div className="form-group">
                    <label htmlFor="Director">Director:</label>
                    {/* Se registra el campo anotaciones con el contenido del input */}
                    <input type="text" className="form-control" id="Director"  {...register("Director")} />
                    {errors.Director && <span className='error'>{errors.Director.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="PrecioEntrada">Precio de entrada:</label>
                    {/* Se registra el campo anotaciones con el contenido del input */}
                    <input type="number" className="form-control" id="PrecioEntrada"  {...register("PrecioEntrada")} />
                    {errors.PrecioEntrada && <span className='error'>{errors.PrecioEntrada.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="FechaDesde">Fecha desde:</label>
                    {/* Se registra el campo fechaNacimiento con el contenido del input */}
                    <input type="date" className="form-control" id="FechaDesde" {...register("FechaDesde")} />
                    {errors.FechaDesde && <span className='error'>{errors.FechaDesde.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="FechaHasta">Fecha hasta:</label>
                    {/* Se registra el campo fechaHasta con el contenido del input */}
                    <input type="date" className="form-control" id="FechaHasta" {...register("FechaHasta")} />
                    {errors.FechaHasta && <span className='error'>{errors.FechaHasta.message}</span>}
                </div>
                <div className="form-group text-center mt-3">
                    {/* Se llama a la funcion onSubmit */}
                    <button type="submit" className="btn btn-primary mx-1">Registrar</button>
                    {/* Se limpian todos los datos de informacion */}
                    <button type="reset" className="btn btn-secondary mx-1">Limpiar</button>
                    <br></br>
                    <ConsultarObra></ConsultarObra>
                </div>
            </form>
        </div >
        
    )
}
