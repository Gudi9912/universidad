Primera parte: Consignas generales y objetivos.
Desarrolle un script Javascript que permita generar números aleatorios según las consignas que se definen a continuación y luego al obtener los resultados cargarlos en las sucesivas preguntas del presente cuestionario. Se le pedirá que ejecute su programa e ingrese los resultados de cada una de los requerimientos, tenga en cuenta de seguir las instrucciones al cargar los resultados para evitar falsos errores.
Su tarea se plantea con los siguientes objetivos:
•	Escritura de un primer script a ejecutar con NodeJs o con la consola del browser.
•	Uso de una librería externa para la generación de números aleatorios.
•	Programación estructurada con variables, estructuras de control y arreglos.
Segunda parte: Requerimientos específicos solicitados.
Desarrollar un programa Javascript que genere 1000000 de números aleatorios enteros. Para ello debe utilizarse la librería seedrandom y al hacerlo debe utilizar como semilla el número: 1763519 y obtener cada siguiente número aleatorio con llamadas al método int32.
A partir del conjunto de números generados se solicita obtener los siguientes resultados:
1.	Cantidad de números positivos y cantidad de números negativos.
2.	Cantidad de números cuyo resto al dividirlos en 7 sea exactamente 0, 3, 5 o 6.
3.	Un arreglo de contadores que indique la cantidad de números según su anteúltimo dígito (el de las decenas) coincida con el índice. De esta manera el número 2134 debe contarse en la posición 3 del arreglo, el número 32405 en la posición 0 del arreglo y así sucesivamente. Evidentemente el arreglo va a ser de 10 contadores con índices del 0 al 9 y deberá ser cargado usando llaves y valores separados por comas.
4.	Valor y posición del menor de todos. La posición del primer número generado debe considerarse como 1, es decir no se pide el índice del valor en el arreglo sino el número de orden del mismo.
5.	Cantidad de números cuyo signo sea igual al del anterior, evidentemente el primer elemento del conjunto no puede ser contabilizado porque no tiene anterior, es decir el máximo posible es la cantidad de elementos generados menos 1.
6.	Promedio entero (redondeado con Math.round) de todos los números que contengan exactamente 6 dígitos.
