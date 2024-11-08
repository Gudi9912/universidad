import { useState } from "react"

export default function FiltrosObras({onConsultarObras}) {
    const [obra, setObra] = useState('') 

    const onFiltrarClick = () => {
        console.log('onConsultarObras en FiltrosObras', onConsultarObras);
        //Se crea un objeto con la propiedad titulo, que tiene el valor de la variable piloto
        //La cual, gracias al onChange (lin 34) se actualiza dinamicamente cada vez que el usuario escribe algo
        //onConsultarPilotos llamara a la funcion padre onConsultar, mandandole el objeto 
        onConsultarObras({titulo: obra})
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-12 fs-3">
                            <label htmlFor="staticEmail2"
                                className="visually-hidden">Obra</label>
                            <input type="text"
                                readOnly
                                className="form-control-plaintext"
                                id="staticEmail2"
                                value="Obra">
                            </input>
                        </div>
                        <div className="col-auto">
                            <label htmlFor="inputPassword2"
                                className="visually-hidden">Titulo</label>
                            <input type="text"
                                className="form-control"
                                id="inputPassword2" 
                                placeholder="Titulo"
                                onChange={(event) => {setObra(event.target.value)}}>
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