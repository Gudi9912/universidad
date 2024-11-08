import Button from 'react-bootstrap/Button'
export default function TablaPilotos({ items, onEliminar, onEditar }) {
    const onEliminarClick = (idPiloto) => {
        onEliminar(idPiloto)
    }
    const onEditarClick = (idPiloto) => {
        onEditar(idPiloto)
    }
    console.log('items:', items)
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <table className="table table-responsive">
                        <thead>
                            <tr key={'piloto-h'}>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Clasificación</th>
                                <th scope="col">Anotaciones</th>
                                <th scope="col">Fecha de nacimiento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Se verifica si items existe y luego se itera sobre el */}
                            {items && items.map((item, index) => {
                                //Se muestran sus datos en forma de tabla
                                return (
                                        <tr key={'piloto-' + index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.nombre}</td>
                                            <td>{item.clasificacion?.titulo}</td>
                                            <td>{item.anotaciones}</td>
                                            <td>{item.fechaNacimiento}</td>
                                            <td>
                                                <Button variant="warning"
                                                onClick={()=>onEditarClick(item.id)}>
                                                    Editar
                                                </Button>
                                                <Button variant="danger"
                                                onClick={()=> onEliminarClick(item.id)}>
                                                    Eliminar 
                                                </Button>
                                            </td>
                                        </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}