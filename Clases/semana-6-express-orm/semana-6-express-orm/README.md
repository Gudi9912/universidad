# Ejercicio Integrador Desarrollo de Software 3K2

## Introducción

En esta ejercitación seguiremos con el dominio del Cine con algunas extensiones para tener una mejor base para desarrollar una api en un futuro.


## Dominio del problema

Se desea crear un sistema para un cine que permita gestionar las películas que se proyectan y los horarios de las funciones. Para ello, se necesita una estructura de tablas de base de datos relacionadas entre sí.

La tabla Películas debe incluir los siguientes campos:

- Id (clave primaria)
- Título
- Director
- Genero
- Sinopsis
- Duracion (en minutos)
- IdClasificacion (clave foranea referenciando a la tabla Clasificaciones)

La tabla Funciones debe incluir los siguientes campos:

- Id (clave primaria)
- IdPelicula (clave foránea referenciando a la tabla Películas)
- Fecha
- HoraInicio
- HoraFin
- IdSala (clave foránea referenciando a la tabla Salas)

La tabla Salas debe incluir los siguientes campos:

- Id (clave primaria)
- Nombre 

La tabla Filas debe incluir los siguientes campos:

- Id (clave primaria)
- Codigo (de la A a la E)
- IdSala (clave foránea referenciando a la tabla Salas)

La tabla Asientos debe incluir los siguientes campos:

- Id (clave primaria)
- Numero
- IdFila (clave foránea referenciando a la tabla Filas)

La tabla Clasificaciones debe incluir los siguientes campos (Esta tabla no está dada en lo scripts `.sql`):

- Id (clave primaria)
- Titulo
- Descripcion

Se desea que el sistema permita, además de lo desarrollado anteriormente:
- `getPeliculas()`: Listar, ordenando por título, todas las películas.
    - Argumentos de función: N/A
    - Salida:
    ```
        [
            {
                Id: 2
                Titulo: "El gran pez", 
                Director: "...",
                Genero: "...",
                Sinopsis: "...",
                Duracion: "...",
                Eliminado: "0"
            },
            {
                Id: 3
                Titulo: "El gran pez", 
                Director: "...",
                Genero: "...",
                Sinopsis: "...",
                Duracion: "...",
                Eliminado: "0"
            }
        ] 
    ```
- **`getPeliculas(idClasificacion)`: Listar, filtrando por clasificación, todas las funciones con sus Películas.**
    - Argumentos de función: `idClasificacion`
    - Salida: Colección de funciones (con todas sus propiedades). 
    ```
        [
            {
                titulo: "El gran pez", 
                genero: "...",
                sinopsis: "...",
                duracion: "XX min",
                director: "..."
            },
            {
                titulo: "El gran pez 2", 
                genero: "...",
                sinopsis: "...",
                duracion: "XX min",
                director: "..."
            }
        ] 
    ```
- `getPeliculaMasPopular()`: Buscar que película es la que se reproduce más veces. Película con más funciones.
    - Argumentos de función: N/A
    - Salida: Objeto película
    ```
        {
            titulo: "El gran pez", 
            genero: "...",
            sinopsis: "...",
            duracion: "XX min",
            director: "..."
        }
    ```
- Crear `getFinFuncion({...})`, donde su horaFin debe estar dada por la Duracion de la pelicula a proyectar
    - Argumentos de función:
    ```
        {
            fecha: new Date(), #hoy o 2023-04-25
            horaInicio: "20:48",
            sala: 3,
            idPelicula: 2
        }
    ```
    - Salida: Objeto película
    ```
        {
            titulo: "El gran pez", 
            horaFinalizacion: "22:32:43"
        }
    ```
- `getGeneros()`: Listar todos los géneros sin duplicados **ordenadas de mayor a menor**.
    - Argumentos de función: N/A
    - Salida:
    ```
        [
            "Drama",
            "Acción",
            "Fantasía",
            "Crimen",
            "Ciencia ficción"
        ] 
    ```
- `insertarFuncion({...})`: 
    - Argumentos de función: 
    ```
        {
            idPelicula: 4, 
            fecha: "2023-05-01",
            horaInicio: "10:25",
            horaFin: "12:25",
            idSala: 2
        }
    ``` 
    - Salida:
    ```
        {
            id: ..., 
            idPelicula: 4,
            fecha: "2023-05-01",
            horaInicio: "10:25",
            horaFin: "12:25",
            idSala: 2
        }
    ```
-  `getPeliculasByFecha(fecha)`: Buscar que películas se reproducen un día en específico.
    - Argumentos de función: `fecha` Date
    - Salida:
    ```
        [
            {
                Id: 2
                Titulo: "El gran pez", 
                Director: "...",
                Genero: "...",
                Sinopsis: "...",
                Duracion: "...",
                Eliminado: "0"
            },
            {
                Id: 3
                Titulo: "El gran pez", 
                Director: "...",
                Genero: "...",
                Sinopsis: "...",
                Duracion: "...",
                Eliminado: "0"
            }
        ] 
    ```
- `getMaxTicketsAVender({...})`: Indicar la máxima cantidad de tickets que se podrían vender (cantidad de asientos) para una película y fecha específicas.
    - Argumentos de función: 
    ```
        {
            idPelicula: 4, 
            fecha: "2023-05-01",
        }
    ``` 
    - Salida:
    ```
        {
            titulo: "El gran pez 2", 
            fecha: "2023-05-01",
            capacidadTickets: 47
        }
    ```



Deben crear, a traves del DB Browser, la consulta SQL para crear la tabla Clasificaciones. Recuerden de también realizar la relación con la tabla Películas.

La eliminación, en el caso de Funciones y Películas, debe ser lógica, no física.

Puedes encontrar en la carpeta scripts las queries necesarias para el armado de la base de datos y la carga de varios datos a sus tablas.