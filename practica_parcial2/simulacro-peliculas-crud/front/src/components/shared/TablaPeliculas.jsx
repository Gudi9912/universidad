import Button from 'react-bootstrap/Button';

export default function TablaPeliculas({ items, onEliminar, onEditar }) {
    const onEliminarClick = (idPelicula) => {
        onEliminar(idPelicula)
    }
    const onEditarClick = (idPelicula) => {
        onEditar(idPelicula)
    }
    console.log('TablaPeliculas',items)
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <table className="table table-responsive">
                        <thead>
                            <tr key={'pelicula-h'}>
                                <th scope="col">#</th>
                                <th scope="col">Titulo</th>
                                <th scope="col">Clasificación</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items && items.map((item, index) => {
                                return (
                                    <tr key={'pelicula-' + index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.titulo}</td>
                                        <td>{item.clasificacion?.nombre}</td>
                                        <td>
                                            <Button variant="warning"
                                                onClick={()=>onEditarClick(item.id)}> {/* `()=>onEliminarClick(item.id)` de esto forma se logra que se llame solo cuando se haga click y no mientra se este renderizando */}
                                                Editar
                                            </Button>
                                            {' '}
                                            <Button variant="danger"
                                                onClick={()=>onEliminarClick(item.id)}> {/* `()=>onEliminarClick(item.id)` de esto forma se logra que se llame solo cuando se haga click y no mientra se este renderizando */}
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