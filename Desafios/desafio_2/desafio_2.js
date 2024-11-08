//Se importa el modulo de node para leer archivos
const fs = require('fs')
//Se cargan los datos del archivo
function cargarDatos(){
    const datos = fs.readFileSync("./personas.json")
    return JSON.parse(datos) //Transformamos la cadena en formato json a formato js
}

const personas = cargarDatos()

function promedioEdades(personas){
    let sumatoria = 0
    for(let i=0; i< personas.length; i++){
        sumatoria += personas[i].edad
    }
    let promedio = sumatoria/personas.length
    return Math.round(promedio)
}

function masJoven(personas){
    let joven = personas[0]
    for(let i = 1; i < personas.length; i++){
        if (joven.edad > personas[i].edad){
            joven = personas[i]
        }
    }
    return joven
}

function nombresConApellidoGomez(personas) {
    const nombres = personas
        .filter(persona => persona.apellido.toUpperCase() === 'GOMEZ')
        .map(persona => persona.nombre);
    return nombres.sort();
}
function sumarEdadesCondicional(personas){
    let edades = 0
    for(let i = 0; i<personas.length;i++){
        if((personas[i].nombre.length % 2) === 0 && (personas[i].apellido.length % 2) !== 0 ){
            edades += personas[i].edad
        }
    }
    return edades
}

function generarEstadisticas(personas) {
    const estadisticas = {
        mayores: personas.filter(persona => persona.edad > 18).length,
        menores: personas.filter(persona => persona.edad <= 18).length,
        primeraMitad: personas.filter(persona => persona.apellido[0].toUpperCase() >= 'A' && persona.apellido[0].toUpperCase() <= 'L').length,
        segundaMitad: personas.filter(persona => persona.apellido[0].toUpperCase() >= 'M' && persona.apellido[0].toUpperCase() <= 'Z').length
    };
    return estadisticas;
}

function contarApellidos(personas) {
    const apellidos = ['CASTILLO', 'DIAZ', 'FERRER', 'PINO', 'ROMERO'];
    const conteo = {};
    apellidos.forEach(apellido => {
        conteo[apellido] = personas.filter(persona => persona.apellido.toUpperCase() === apellido).length;
    });
    return conteo;
}

console.log("El promedio de edades del archivo es de", promedioEdades(personas))
let joven = masJoven(personas)
console.log("La persona mas joven se llama", joven.nombre, " ", joven.apellido)
console.log("Nombres con apellido GOMEZ:", nombresConApellidoGomez(personas).join(", "));
console.log("El total de las edades de las personas con un nombre par y un apellido impar es de ", sumarEdadesCondicional(personas))
console.log(generarEstadisticas(personas))
console.log(contarApellidos(personas))