//Se importa la libreria seedrandom
const seedrandom = require('seedrandom');

//Se incializa el arreglo
const rng = seedrandom('1763519');
const randomNumbers = [];

for (let i = 0; i < 1000000; i++) {
    randomNumbers.push(rng.int32());
}

console.log(`Se generaron ${randomNumbers.length} números aleatorios.`);

//Se realiza el punto 1
function punto1(randomNumbers){
    let cantPositivos = 0
    let cantNegativos = 0

    for (let i = 0; i < randomNumbers.length; i++){
        if (randomNumbers[i] > 0){
            cantPositivos += 1
        }
        else if (randomNumbers[i] < 0) {
            cantNegativos += 1
        }
    }
    return `Numeros positivos: ${cantPositivos}, numeros negativos: ${cantNegativos}`
}

//Se realiza el punto 2
function punto2(randomNumbers){
    let cantDiv7 = 0
    for (let i = 0; i < randomNumbers.length; i++){
        const resto = randomNumbers[i] % 7
        if (resto === 0 || resto === 3 || resto === 5 || resto === 6){
            cantDiv7 += 1
        }
    }
    return `Total de numeros con resto 0 3 5 o 6 despues de ser divididos por 7: ${cantDiv7}`
}

//Se realiza el punto 3
function punto3(randomNumbers){
    const contadores = new Array(10).fill(0)
    for (let i = 0; i < randomNumbers.length; i++){
        const decena = Math.floor(Math.abs((randomNumbers[i] % 100) / 10))
        contadores[decena] += 1
    }
    let total = 0
    for (let i = 0; i < contadores.length; i++) {
        total += contadores[i]
        console.log(`Existen ${contadores[i]} numeros con la decena ${i}`)
    }
    console.log(`El total es de ${total}`)    
}

//Se realiza el punto 4
function punto4(randomNumbers){
    let masChico = randomNumbers[0]
    let indiceChico = 0
    for (let i = 1; i <randomNumbers.length; i++){
        if (randomNumbers[i] < masChico){
            masChico = randomNumbers[i]
            indiceChico = i
        }
    }
    return `El numero mas chico es ${masChico}, y su indice es de ${indiceChico + 1}`
}

//Se realiza el punto 5
function punto5(randomNumbers){
    let contadorMismoSignoAnterior = 0
    for (let i = 1; i < randomNumbers.length; i++){
        if (randomNumbers[i] < 0 && randomNumbers[i-1] < 0 || randomNumbers[i] > 0 && randomNumbers[i-1] > 0){
            contadorMismoSignoAnterior += 1
        }  
    }
    return `${contadorMismoSignoAnterior} numeros tienen el mismo signo que su anterior`
}

//Se realiza el punto 6
function punto6(randomNumbers){
    let contador6dig = 0
    let total6dig = 0
    for (i = 0; i < randomNumbers.length; i++){
        if ((randomNumbers[i]>= 100000 && randomNumbers[i] < 1000000) || 
            (randomNumbers[i] <= -100000 && randomNumbers[i] > -1000000)){
                total6dig += randomNumbers[i]
                contador6dig += 1
            }
    }
    const prom6dig = Math.round(total6dig/contador6dig)
    return `El promedio de los numeros con 6 digitos es de ${prom6dig}`
}

//Se imprime el resultado de cada uno de los puntos
console.log(punto1(randomNumbers))
console.log(punto2(randomNumbers))
punto3(randomNumbers)
console.log(punto4(randomNumbers))
console.log(punto5(randomNumbers))
console.log(punto6(randomNumbers))