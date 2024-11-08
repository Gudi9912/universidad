import { useEffect, useState } from "react";
import FiltrosPilotos from "./shared/FiltrosPilotos";
import TablaPilotos from "./shared/TablaPilotos";
import pilotoService from "../services/piloto.service";
import { useNavigate } from 'react-router-dom';

export default function ConsultarPiloto() {
    //Se inicializa un arreglo vacio que futuramente contendra a los pilotos
    const [rows, setRows] = useState([])
    const navigate = useNavigate()

    const getPilotos = async () => {
        setRows([])
        const pilotos = await pilotoService.getPilotos()
        setRows(pilotos)
    }
    //UseEffect es un hook de react que se ejecuta cuando el navegador termina de cargar los componentes
    useEffect(() => {
        getPilotos()
    }, [])
    //Toma un parametro filtros y lo usa para filtrar los pilotos
    const onConsultar = async (filtros) => {
        console.log('onConsultar filtros', filtros)
        const pilotos = await pilotoService.getPilotos(filtros)
        setRows(pilotos);
    }

    const onEditar = async (idPiloto) => {
        console.log('onEditar', idPiloto)
        navigate(`/${idPiloto}`) 
    }

    const onEliminar = async (idPiloto) => {
        console.log('onEliminar', idPiloto)
        await pilotoService.borrar(idPiloto)
        getPilotos()
    }
    return (
        <>
            <div className="row">
                <br></br>
                <div className="col-12">
                    <FiltrosPilotos //Se llama a otro componente mandandole una prop onConsultarPilotos (como un alias)
                        onConsultarPilotos={onConsultar}>
                    </FiltrosPilotos>
                </div>
                <br></br>
                <br></br>
                <div className="col-12">
                    <TablaPilotos
                        items={rows}
                        onEliminar={onEliminar}
                        onEditar={onEditar}>
                    </TablaPilotos>
                </div>
            </div>
        </>
    )
}