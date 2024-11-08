export default function TablaPeliculas({ items }) {
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
                                <th scope="col">Director</th>
                                <th scope="col">Duración</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items && items.map((item, index) => {
                                return (
                                        <tr key={'pelicula-' + index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.titulo}</td>
                                            <td>{item.clasificacion?.nombre}</td>
                                            <td>{item.director}</td>
                                            <td>{item.duracion}</td>
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