import Button from 'react-bootstrap/Button';

export default function TablaConductores({ items, onEliminar, onEditar }) {
    const onEliminarClick = (idConductor) => {
        onEliminar(idConductor);
    }
    const onEditarClick = (idConductor) => {
        onEditar(idConductor);
    }

    // transformador de fecha
    const getFechaAMostrar = (fechaString) => {
        if (!fechaString) return '';
        const fecha = new Date(fechaString);
        console.log(fecha)
        return `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`;
    }


  return (
      <>
          <div className="card">
              <div className="card-body">
                  <table className="table table-responsive">
                      <thead>
                          <tr key={'conductor-h'}>
                              <th scope="col">#</th>
                              <th scope="col">Nombre</th>
                              <th scope="col">Clasificación</th>
                              <th scope="col">Anotaciones</th>
                              <th scope="col">Cantidad Carreras</th>
                              <th scope="col">Fecha Nacimiento</th>
                              <th scope="col">Acciones</th>
                          </tr>
                      </thead>
                      <tbody>
                        {/* Se verifica si items existe y luego se itera sobre el */}
                          {items && items.map((item, index) => {
                              return (
                                      <tr key={'conductor-' + index}>
                                          <th scope="row">{index + 1}</th>
                                          <td>{item.nombre}</td>
                                          <td>{item.clasificacion?.titulo}</td>
                                          <td>{item.anotaciones}</td>
                                          <td>{item.cantidadCarreras}</td>
                                          <td>{getFechaAMostrar(item.fechaNacimiento)}</td>
                                          <td>
                                              <Button variant="primary" onClick={() => onEditarClick(item.id)}>Editar</Button>
                                              {' '}
                                              <Button variant="danger" onClick={() => onEliminarClick(item.id)}>Eliminar</Button>
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