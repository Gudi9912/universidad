import { useEffect, useState } from "react";
import Filtros from "./shared/Filtros.jsx";
import Tabla from "./shared/Tabla.jsx";
import Service from "../services/obras.service.js";
import { useNavigate } from 'react-router-dom';

export default function ConsultarObras() {
    //Se inicializa un arreglo vacio que futuramente contendra a los pilotos
    const [rows, setRows] = useState([])
    const navigate = useNavigate()

    const getObras = async () => {
        setRows([])
        const obras = await Service.getObras()
        setRows(obras)
    }
    //UseEffect es un hook de react que se ejecuta cuando el navegador termina de cargar los componentes
    useEffect(() => {
        getObras()
    }, [])
    //Toma un parametro filtros y lo usa para filtrar los pilotos
    const onConsultar = async (filtros) => {
        console.log('onConsultar filtros', filtros)
        const obras = await Service.getObras(filtros)
        setRows(obras);
    }
    
    const onEditar = async (idObra) => {
        console.log('onEditar', idObra)
        navigate(`/${idObra}`) 
    }

    const onEliminar = async (idObra) => {
        console.log('onEliminar', idObra)
        await Service.borrar(idObra)
        getObras()
    }
    return (
        <>
            <div className="row">
                <br></br>
                <div className="col-12">
                    <Filtros //Se llama a otro componente mandandole una prop onConsultarPilotos (como un alias)
                        onConsultarObras={onConsultar}>
                    </Filtros>
                </div>
                <br></br>
                <br></br>
                <div className="col-12">
                    <Tabla
                        items={rows}
                        onEliminar={onEliminar}
                        onEditar={onEditar}>
                    </Tabla>
                </div>
            </div>
        </>
    )
}