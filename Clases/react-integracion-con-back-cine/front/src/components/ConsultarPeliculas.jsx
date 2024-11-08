import { useEffect, useState } from "react";
import FiltrosPeliculas from "./shared/FiltrosPeliculas";
import TablaPeliculas from "./shared/TablaPeliculas";
import peliculasService from "../services/peliculas.service";

export default function ConsultarPelicula() {
    const [rows, setRows] = useState([])
//Useeffect es un hook de react que se ejecuta cuando el navegador termina de cargar los componentes
    useEffect(() => {
        const peliculas = peliculasService.getPeliculas()
        setRows(peliculas);
    }, [])

    const onConsultar = (filtros) => {
        const peliculas = peliculasService.getPeliculas(filtros)
        setRows(peliculas);
    }

    return (
        <>
            <div className="row">
                <br></br>
                <div className="col-12">
                    <FiltrosPeliculas //Se llama a otro componente
                        onConsultarPeliculas={onConsultar} //Define onConsultarPelicula con el resultado de onconsultar
                        >
                    </FiltrosPeliculas>
                </div>
                <br></br>
                <br></br>
                <div className="col-12">
                    <TablaPeliculas items={rows}>
                    </TablaPeliculas>
                </div>
            </div>
        </>
    )
}