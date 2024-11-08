const poderes = [
    {
        nombre: 'Superfuerza',
        id: 1
    },
    {
        nombre: 'Estrategia',
        id: 2
    },
    {
        nombre: 'Velocidad',
        id: 3
    },
    {
        nombre: 'Superoido',
        id: 4
    }
]
const superheroes = [
    {
        id: 1,
        nombre: 'Superman',
        activo: true,
        poder: poderes[0],

    },
    {
        id: 2,
        nombre: 'Batman',
        activo: false,
        poder: poderes[1]
    }
]

//Agregar una nueva fila a la tabla de superheroes
function agregarSupers() {
    const tabla = document.getElementById('datos')
    for (s of superheroes) {
        const fila = `<tr>
            <td scope="row">${tabla.rows.length}</td>
            <td>${s.nombre}</td>
            <td>${s.poder.nombre}</td>
            <td>${s.activo}</td>
        </tr>`;
        //Se crea la nueva fila vacia (tabla.rows.length marca en donde ponerla)
        const newRowHTML = tabla.insertRow(tabla.rows.length)
        //Se le da el contenido a la nueva fila
        newRowHTML.innerHTML = fila
    }
}

//Esperamos hasta que la pagina termine de cargar para evitar errores
document.addEventListener('DOMContentLoaded', (event)=>{
    agregarSupers();
})