import { useEffect, useState } from "react";
import FiltrosObras from "./shared/FiltrosObras";
import TablaObras from "./shared/TablaObras";
import obraService from "./services/obra.service";
import { useNavigate } from 'react-router-dom';

export default function ConsultarObra() {
    //Se inicializa un arreglo vacio que futuramente contendra a los obras
    const [rows, setRows] = useState([])
    const navigate = useNavigate()

    const getObras = async () => {
        setRows([])
        const obras = await obraService.getObras()
        setRows(obras)
    }
    //UseEffect es un hook de react que se ejecuta cuando el navegador termina de cargar los componentes
    useEffect(() => {
        getObras()
    }, [])
    //Toma un parametro filtros y lo usa para filtrar los obras
    const onConsultar = async (filtros) => {
        console.log('onConsultar filtros', filtros)
        const obras = await obraService.getObras(filtros)
        setRows(obras);
    }

    const onEditar = async (idObra) => {
        console.log('onEditar', idObra)
        navigate(`/${idObra}`) 
    }

    const onEliminar = async (idObra) => {
        console.log('onEliminar', idObra)
        await obraService.borrar(idObra)
        getObras()
    }
    return (
        <>
            <div className="row">
                <br></br>
                <div className="col-12">
                    <FiltrosObras //Se llama a otro componente mandandole una prop onConsultarObras (como un alias)
                        onConsultarObras={onConsultar}>
                    </FiltrosObras>
                </div>
                <br></br>
                <br></br>
                <div className="col-12">
                    <TablaObras
                        items={rows}
                        onEliminar={onEliminar}
                        onEditar={onEditar}>
                    </TablaObras>
                </div>
            </div>
        </>
    )
}