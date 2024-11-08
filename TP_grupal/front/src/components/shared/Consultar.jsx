import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Consultar({ service, TablaComponent, FiltrosComponent, entityName }) {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();

    const getData = async () => {
        setRows([]);  // Limpiar el arreglo de filas
        const data = await service.getAll();  // Llamar al servicio genérico para obtener todos los elementos
        setRows(data);  // Establecer los datos en el estado
    };

    useEffect(() => {
        getData();
    }, []);

    const onConsultar = async (filtros) => {
        const filteredData = await service.getAll(filtros);  // Filtrar los datos
        setRows(filteredData);
    };

    const onEditar = (id) => {
        navigate(`/${entityName}/${id}`);  // Navegar a la página de edición del elemento
    };

    const onEliminar = async (id) => {
        await service.borrar(id);  // Eliminar el elemento
        getData();  // Recargar los datos después de eliminar
    };

    return (
        <div className="row">
            <div className="col-12">
                {/* Componente de filtros */}
                <FiltrosComponent onConsultar={onConsultar} />
            </div>
            <div className="col-12">
                {/* Componente de tabla */}
                <TablaComponent
                    items={rows}
                    onEditar={onEditar}
                    onEliminar={onEliminar}
                />
            </div>
        </div>
    );
}
