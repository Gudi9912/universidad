import { useEffect, useState } from "react";
import FiltrosPeliculas from "./shared/FiltrosPeliculas";
import TablaPeliculas from "./shared/TablaPeliculas";
import peliculasService from "../services/peliculas.service";
import { useNavigate } from 'react-router-dom';

export default function ConsultarPelicula() {
    const [rows, setRows] = useState([])
    const navigate = useNavigate()

    const getPeliculas = async () => {
        setRows([]) // para que no se rompa cuando todavía no tiene las peliculas cargas del back
        const peliculas = await peliculasService.getPeliculas()
        setRows(peliculas);
    }

    useEffect(() => {
        getPeliculas()
    }, [])


    const onConsultar = async (filtros) => {
        console.log('onConsultar filtros', filtros)
        const peliculas = await peliculasService.getPeliculas(filtros)
        setRows(peliculas);
    }

    const onEliminar = async (idPelicula) => {
        console.log('onEliminar', idPelicula)
        await peliculasService.borrar(idPelicula)
        getPeliculas()
    }

    const onEditar = async (idPelicula) => {
        console.log('onEditar', idPelicula)
        navigate(`/editar/${idPelicula}`) 
    }

    return (
        <>
            <div className="row">
                <br></br>
                <div className="col-12">
                    {/* FiltrosPeliculas componente hijo de ConsultarPelicula*/}
                    <FiltrosPeliculas
                        onConsultarPeliculas={onConsultar}>
                    </FiltrosPeliculas>
                </div>
                <br></br>
                <br></br>
                <div className="col-12">
                    {/* TablaPeliculas componente hijo de ConsultarPelicula*/}
                    <TablaPeliculas items={rows}
                        onEliminar={onEliminar}
                        onEditar={onEditar}>
                    </TablaPeliculas>
                </div>
            </div>
        </>
    )
}