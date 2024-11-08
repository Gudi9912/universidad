## Introducción

Para cerrar esta parte de la materia sobre Javascript y ORM con SQLite3 les pedimos que realicen el siguiente ejercicio integrador para la proxima clase.

Pero antes, les dejaremos material de soporte para cubrir pequeños temas sobre Sequelize que no llegamos a cubrir al completo, toda esta información también puede ser encontrada en la documentacion de Sequelize.

### Visualizacion de Resultados

En clase vimos como realizar una consulta del tipo SELECT a través de la función findAll( ) del modelo Peliculas:

```js
const peliculasGetAll = async () => {
    const resultado = await sequelize.models.Peliculas.findAll({
        attributes: [
            'Id',
            'Titulo',
            'Director',
            'Genero',
            'Sinopsis',
            'Eliminado',
            'IdClasificacion'
        ],
        order: [['Titulo', 'ASC']],
    })
    return resultado;
}
```

Ahora bien, como podemos mostrar por consola dichos resultados?

Podemos realizarlo de dos maneras distintas, dependiendo del metodo que querramos usar de sincronismo:

```js
let resultado = await peliculasGetAll();
resultado.forEach((articulo) => {
    console.log(articulo.dataValues);
});
```

En este método, utilizamos await para esperar a que la consulta se realize y se almacene en la variable resultado para luego recorrerla con un forEach, los datos de cada Pelicula se almacenarán en el atributo `dataValues`.

Por otro lado, es también comun utilizar el metodo `then( )` a continuacion de la invocación de la función peliculasGetAll( ):

```js
peliculasGetAll().then((result) => {
    result.forEach((articulo) => {
        console.log(articulo.dataValues);
    })
});
```

Como dicha función es asíncronica, el método then( ) ejecutará su función de callback al finalizar la función inicial.

### Consultas con acceso a tablas con JOIN

Como vimos en clases, podemos crear diferentes tablas y generar una relacion entre ambas a través de funciónes propuestas por Sequelize:

```js
sequelize.models.Peliculas.belongsTo(sequelize.models.Clasificaciones, {
    foreignKey: 'IdClasificacion'
});
```

de esta forma, una película pertenece a una clasificación a través de la clave foranea `IdClasificacion` que posee como atributo un artículo.

Ahora bien, si se quiere realizar una función para listar todos los articulos que tengo en base de datos, la solución en Sequelize sería esta, como vimos en clase:

```js
const peliculasGetAll = async () => {
    const resultado = await sequelize.models.Peliculas.findAll({
        attributes: [
            'Id',
            'Titulo',
            'Director',
            'Genero',
            'Sinopsis',
            'Eliminado',
            'IdClasificacion'
        ],
        order: [['Titulo', 'ASC']],
    })
    return resultado;
}
```

Pero esta función solo me devuelve la información que contenga la tabla `PELICULAS`, si yo quiero saber también el nombre de la clasificación que contiene esa pelicula, necesito acceder a la tabla `CLASIFICACIONES` y buscar su nombre.

Para ello, lo que se debe hacer es agregar al parámetro que le pasamos a la función `findAll( )` un atributo llamado `include: [ ]`, esto permitira cruzar o realizar un `JOIN` de tablas para obtener la información de la Clasificación relacionada a cada película:

```js
const peliculasGetAll = async () => {
    const resultado = await sequelize.models.Peliculas.findAll({
        attributes: [
            'Id',
            'Titulo',
            'Director',
            'Genero',
            'Sinopsis',
            'Eliminado',
            'IdClasificacion'
        ],
        order: [['Titulo', 'ASC']],
        include: [sequelize.models.Clasificaciones]
    })
    return resultado;
}
```

Como se observa, es necesario indicarle a la función que modelo quiero incluir en la peticion, en este caso le pasamos el modelo de ArticulosFamilias que es la tabla de la cual queremos obtener esa información.

Pero eso no es todo, ya que el dejar en ese estado el atributo include me devolvera tanto el id como el nombre de ese ArticuloFamilia, pero si quiero que solo me devuelva el nombre, debemos especificarle los atributos de la siguiente manera:

```js
const peliculasGetAll = async () => {
    const resultado = await sequelize.models.Peliculas.findAll({
        attributes: [
            'Id',
            'Titulo',
            'Director',
            'Genero',
            'Sinopsis',
            'Eliminado',
            'IdClasificacion'
        ],
        order: [['Titulo', 'ASC']],
        include: [
					{
						model: sequelize.models.Clasificaciones, 
						attributes: ['NombreDescripcion']
					}
				]
    })
    return resultado;
}
```

De esta manera obtendremos unicamente el nombre del ArticuloFamilia asociado a cada articulo.
