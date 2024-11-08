console.log('hola a todos');
// comentarios ``
// variables
var varPrueba1 = 'soy una var que ya no debe usarse'
let varLet = 'hola, usenme cuando quieran reasignar'
const varConstante = 'soy una constante, mi valor no cambia'

console.log(`varLet 8: ${varLet}`) 
varLet = 5;
console.log(`varLet 10: ${varLet}`) 
// varConstante = false;
console.log(`varConstante : ${varConstante}`) 
const miVector = []
console.log('miVector', miVector) 
// miVector = [] // error
miVector.push(4)
console.log('miVector', miVector)
// objeto 
const miObjeto1 = {
        edad: '34',
        nombre: 'mili',
        nombreCompleto: () => {console.log('Milagros Zea Cárdenas')}
    }

const miObjeto2 = {
    edad: 34,
    nombre: 'valen'
}

miObjeto1.nombreCompleto()
// miObjeto2.nombreCompleto() // explota

miObjeto1['profesion'] = 'jugador profesiona de LoL'
miObjeto2.profesion = 'arquero'

console.log('31',[] == false)
// console.log('31', false == false)
console.log('32',[] === false)
console.log('32',undefined == false)

if (miObjeto2.edad == miObjeto1.edad)
    console.log(`no estricta, tienen la misma edad`)

if (miObjeto1 == miObjeto2){
    console.log(`los objetos tienen lo mismo`)
}

if (miObjeto2.edad === miObjeto1.edad)
    console.log(`estricta, tienen la misma edad`)

if (miObjeto2.edad >= miObjeto1.edad)
    console.log(`${miObjeto2.nombre} es mayor, ${miObjeto2['profesion']}`)

if (miObjeto1 === miObjeto2){
    console.log('son iguales')
    console.log('son iguales')
}
else
    console.log('NO son iguales :(')

miVector.push(miObjeto1);
miVector.push(miObjeto2);

// definición de varaible sin asignar valor.
let varaibleSinValor;
console.log('varaibleSinValor',varaibleSinValor)

// ciclos for
for(let i = 0; i< miVector.length; i++){
    console.info(miVector[i])
}

for (const persona of miVector) {
    console.error(persona.nombre)
}

for (const propiedad in miObjeto1) {
    console.info('propiedad',propiedad)
}

// function esMayorQueKevin(persona=undefined){
function esMayorQueKevin(persona){
    const minion = {
        edad: 763,
        nombre: 'kevin'
    }
    console.log('esMayorQueKevin',minion, persona)
    if (persona.edad > minion.edad)
        console.log(`${persona.nombre} es mayor que kevin`)
    else
        console.log(`${persona.nombre} NO es mayor que kevin`)
}
const obj3 = {}
esMayorQueKevin(miObjeto1);
esMayorQueKevin(); // explota
esMayorQueKevin(obj3);

// const esMayorQueKevinArrow = xx; 
// Función flecha
const esMayorQueKevinArrow = (persona) => {
    const minion = {
        edad: 763,
        nombre: 'kevin'
    }
    console.log('esMayorQueKevin',minion, persona)
    if (persona.edad > minion.edad)
        console.log(`${persona.nombre} es mayor que kevin`)
    else
        console.log(`${persona.nombre} NO es mayor que kevin`)
}
esMayorQueKevinArrow(miObjeto2);
// esMayorQueKevinArrow(); // explota
esMayorQueKevinArrow(obj3);
