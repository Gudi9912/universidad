const seedrandom = require('seedrandom');

// Inicializar con la semilla
const rng = seedrandom('1763519');

// Array para almacenar los números aleatorios
const randomNumbers = [];

// Generar 1,000,000 de números aleatorios
for (let i = 0; i < 1000000; i++) {
    randomNumbers.push(rng.int32());
}

// 1. Cantidad de números positivos y negativos
let cantPositivos = 0;
let cantNegativos = 0;

for (let i = 0; i < randomNumbers.length; i++) {
    if (randomNumbers[i] > 0) {
        cantPositivos++;
    } else {
        cantNegativos++;
    }
}

// 2. Cantidad de números cuyo resto al dividir en 7 sea 0, 3, 5 o 6
let cantResto = 0;

for (let i = 0; i < randomNumbers.length; i++) {
    const resto = randomNumbers[i] % 7;
    if (resto === 0 || resto === 3 || resto === 5 || resto === 6) {
        cantResto++;
    }
}

// 3. Arreglo de contadores por anteúltimo dígito (decenas)
const contadores = Array(10).fill(0); // Inicializa un arreglo de 10 contadores

for (let i = 0; i < randomNumbers.length; i++) {
    const anteUltimoDigito = Math.floor((Math.abs(randomNumbers[i]) % 100) / 10);
    contadores[anteUltimoDigito]++;
}

// 4. Valor y posición del menor de todos
let masChico = randomNumbers[0];
let indiceChico = 0;

for (let i = 1; i < randomNumbers.length; i++) {
    if (randomNumbers[i] < masChico) {
        masChico = randomNumbers[i];
        indiceChico = i; // Aquí el índice es 0-based
    }
}

// Ajustar para que la posición comience en 1
indiceChico += 1;

// 5. Cantidad de números cuyo signo sea igual al del anterior
let contadorSignoIgual = 0;

for (let i = 1; i < randomNumbers.length; i++) {
    if ((randomNumbers[i] > 0 && randomNumbers[i - 1] > 0) || 
        (randomNumbers[i] < 0 && randomNumbers[i - 1] < 0)) {
        contadorSignoIgual++;
    }
}

// 6. Promedio entero (redondeado) de números que contengan exactamente 6 dígitos
let suma = 0;
let contadorSeisDigitos = 0;

for (let i = 0; i < randomNumbers.length; i++) {
    if ((randomNumbers[i] >= 100000 && randomNumbers[i] < 1000000) || 
        (randomNumbers[i] <= -100000 && randomNumbers[i] > -1000000)) {
        suma += randomNumbers[i];
        contadorSeisDigitos++;
    }
}

let promedio = 0;
if (contadorSeisDigitos > 0) {
    promedio = Math.round(suma / contadorSeisDigitos);
}

// Resultados finales
console.log(`Cantidad de números positivos: ${cantPositivos}`);
console.log(`Cantidad de números negativos: ${cantNegativos}`);
console.log(`Cantidad de números cuyo resto al dividir en 7 es 0, 3, 5 o 6: ${cantResto}`);
console.log(`Contadores por anteúltimo dígito: {${contadores.join(', ')}}`);
console.log(`El número más chico es ${masChico}, y su posición es ${indiceChico}`);
console.log(`Cantidad de números cuyo signo es igual al del anterior: ${contadorSignoIgual}`);
console.log(`Promedio entero de números de 6 dígitos: ${promedio}`);
