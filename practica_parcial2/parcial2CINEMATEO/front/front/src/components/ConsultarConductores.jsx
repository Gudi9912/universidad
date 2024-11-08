import { useEffect, useState } from "react";
import FiltrosConductores from "./FiltrosConductores";
import TablaConductores from "./TablaConductores";
import conductoresService from "../services/conductores.service.js";
import { Navigate, useNavigate } from "react-router-dom";

export default function ConsultarConductores() {
  //Se inicializa un arreglo vacio que futuramente contendra a los pilotos
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  
  const obtenerConductores = async () => {
    try {
        setRows([]);
        setError(null);
        const conductores = await conductoresService.getConductores();
        setRows(conductores);
    } catch (error) {
        console.error("Error al obtener conductores:", error);
        setError("Error al cargar los conductores");
        setRows([]);
    }
  }

  //UseEffect es un hook de react que se ejecuta cuando el navegador termina de cargar los componentes
  useEffect(() => {
    obtenerConductores();
  }, []);

  //Toma un parametro filtros y lo usa para filtrar los pilotos
  const onConsultar = async (filtros) => {
    console.log("onConsultar filtros", filtros);
    try {
      const conductores = await conductoresService.getConductores(filtros);        
      setRows(conductores);
    } catch (error) {
      console.error("Error al consultar conductores:", error);
      setRows([]);
    }
  };

   const onEliminar = async (idConductor) => {
     console.log("onEliminar idConductor", idConductor);

     await conductoresService.eliminate(idConductor);
     obtenerConductores()
   }

  const onEditar = async (idConductor) => {
    console.log("onEditar idConductor", idConductor);
    navigate(`/editar/${idConductor}`);
  }

  return (
    <>
      <div className="row">
        {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
        <br></br>
        <div className="col-12">
          {/* Se llama a la funcion onConsultar y se le pasa como parametro un filtro */}
          <FiltrosConductores onConsultar={(filtros) => onConsultar(filtros)} />
        </div>
        <br></br>
        <br></br>
        <div className="col-12">
          <TablaConductores items={rows || []}
            onEditar={(idConductor) => onEditar(idConductor)} 
            onEliminar={(idConductor) => onEliminar(idConductor)}
            />
        </div>
      </div>
    </>
  )
}
