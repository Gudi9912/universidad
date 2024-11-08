import Button from 'react-bootstrap/Button'
export default function TablaObras({ items, onEliminar, onEditar }) {
    const onEliminarClick = (idObra) => {
        onEliminar(idObra)
    }
    const onEditarClick = (idObra) => {
        onEditar(idObra)
    }
    console.log('items:', items)
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <table className="table table-responsive">
                        <thead>
                            <tr key={'obra-h'}>
                                <th scope="col">#</th>
                                <th scope="col">Titulo</th>
                                <th scope="col">Director</th>
                                <th scope="col">Precio de entrada</th>
                                <th scope="col">Desde</th>
                                <th scope="col">Hasta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Se verifica si items existe y luego se itera sobre el */}
                            {items && items.map((item, index) => {
                                //Se muestran sus datos en forma de tabla
                                return (
                                        <tr key={'obra-' + index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.Titulo}</td>
                                            <td>{item.Director}</td>
                                            <td>{item.PrecioEntrada}</td>
                                            <td>{item.FechaDesde}</td>
                                            <td>{item.FechaHasta}</td>
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