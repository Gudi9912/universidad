console.log('Hola a todos')
//comentario
var varPrueba1='soy una var que ya no debe usarse'
let varLet= 'hola, usenme cuando quieran reasignar'
const varConstante = 'soy una constante, mi valor no cambia'
console.log(`varLet8: ${varLet}`)
varLet = 5;
console.log(`varLet10: ${varLet}`)
// varConstante = false
//console.log(`varConstante: ${varConstante}`)
const miVector = [] 
miVector.push(4)
console.log('miVector', miVector)

//objeto
const miObjeto1 = {
    edad: '21',
    nombre: 'Joao',
    nombreCompleto: () => {console.log('Juan Ignacio Cremona')}
}

const miObjeto2 = {
    edad: 21,
    nombre: 'valen'
}

miObjeto1.nombreCompleto()
// dos formas de agregar algun valor en nuestro objeto
miObjeto1 ['profesion'] = 'jugador profesional de lol'
miObjeto2.profesion = 'arequero'

if (miObjeto1 === miObjeto2)    
    console.log('son iguales')
else {
    console.log('No son iguales :c')
}

console.log('31', [] == false)
//console.log('31', false == false)

if(miObjeto2.edad == miObjeto1.edad)
    console.log('tienen la misma edad')
else {
    console.log('No tienen la misma edad')
}

if(miObjeto2.edad > miObjeto1.edad)
    console.log('Valen es mayor')
else {
    console.log('Joao es mayor')
}

miVector.push(miObjeto1)
miVector.push(miObjeto2)

//ciclos for
for(let i= 0; i< miVector.length; i++){
    console.info(miVector[i])
}

for (const persona of miVector){
    console.error(persona.nombre)
}

//Funciones a
function esMayorQueKevin(persona){
    const minion = {
        edad: 763,
        nombre: 'kevin'
    }
    if (persona.edad > minion.edad)
        console.log(`${persona.nombre} es mayor que Kevin`)
    else
        console.log(`${persona.nombre} No es mayor que Kevin`)
}

esMayorQueKevin(miObjeto1)

const esMayorQueKevinArrow = (persona) => {
    const minion = {
        edad: 763,
        nombre: 'kevin'
    }
    if (persona.edad > minion.edad)
        console.log(`${persona.nombre} es mayor que Kevin`)
    else
        console.log(`${persona.nombre} No es mayor que Kevin`)
}

esMayorQueKevinArrow(miObjeto2)