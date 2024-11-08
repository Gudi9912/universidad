import Button from 'react-bootstrap/Button'
export default function TablaPilotos({ items, onEliminar, onEditar }) {
    const onEliminarClick = (idArticulo) => {
        onEliminar(idArticulo)
    }
    const onEditarClick = (idArticulo) => {
        onEditar(idArticulo)
    }
    console.log('items:', items)
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <table className="table table-responsive">
                        <thead>
                            <tr key={'articuloLimpieza-h'}>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Fecha de caducidad</th>
                                <th scope="col">Proveedor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Se verifica si items existe y luego se itera sobre el */}
                            {items && items.map((item, index) => {
                                //Se muestran sus datos en forma de tabla
                                return (
                                        <tr key={'articulo-' + index}>
                                            <th scope="row">{item.IdarticulosLimpieza}</th>
                                            <td>{item.Nombre}</td>
                                            <td>{item.Precio}</td>
                                            <td>{item.FechaCaducidad}</td>
                                            <td>{item.proveedoresLimpieza?.NombreProveedor}</td>
                                            <td>
                                                <Button variant="warning"
                                                onClick={()=>onEditarClick(item.IdarticulosLimpieza)}>
                                                    Editar
                                                </Button>
                                                <Button variant="danger"
                                                onClick={()=> onEliminarClick(item.IdarticulosLimpieza)}>
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