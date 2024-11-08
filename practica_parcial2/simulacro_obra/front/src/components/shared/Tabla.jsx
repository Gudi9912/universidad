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
                                <th scope="col">Clasificación</th>
                                <th scope="col">Director</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Se verifica si items existe y luego se itera sobre el */}
                            {items && items.map((item, index) => {
                                //Se muestran sus datos en forma de tabla
                                return (
                                        <tr key={'obra-' + index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.titulo}</td>
                                            <td>{item.idClasificacion?.titulo}</td>
                                            <td>{item.director}</td>
                                            <td>
                                                <Button variant="warning"
                                                onClick={()=>onEditarClick(item.titulo)}>
                                                    Editar
                                                </Button>
                                                <Button variant="danger"
                                                onClick={()=> onEliminarClick(item.titulo)}>
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