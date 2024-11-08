import { useState } from "react"

export default function FiltrosPeliculas({onConsultarPeliculas}) {
    const [pelicula, setPelicula] = useState('') 

    const onFiltrarClick = () => {
        onConsultarPeliculas({titulo: pelicula})
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-12 fs-3">
                            <label htmlFor="staticEmail2"
                                className="visually-hidden">Piloto</label>
                            <input type="text"
                                readOnly
                                className="form-control-plaintext"
                                id="staticEmail2"
                                value="Piloto">
                            </input>
                        </div>
                        <div className="col-auto">
                            <label htmlFor="inputPassword2"
                                className="visually-hidden">Nombre</label>
                            <input type="text"
                                className="form-control"
                                id="inputPassword2" 
                                placeholder="Piloto"
                                //Gracias a onChange, se guarda el valor del input en la variable pelicula (lin 4)
                                onChange={(event) => {setPelicula(event.target.value)}}>
                            </input>
                        </div>
                        <div className="col-auto">
                            <button type="button"
                                className="btn btn-primary mb-3"
                                onClick={onFiltrarClick}
                            >Consultar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}