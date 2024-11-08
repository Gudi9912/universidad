/*#######################################CONSIDERACIONES######################################################*/
<script src="js/scripts.js" defer></script> //defer hace que el script se lea luego de cargar la pagina
/*
<link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
Link bootstrap
*/

/*#######################################BACKEND##############################################################*/

//Crear un modelo con sus atributos y tipos de datos
const Libro = sequelize.define('Libro', {
    titulo: DataTypes.STRING,
    autor: DataTypes.STRING,
    genero: DataTypes.STRING,
    año_publicacion: DataTypes.INTEGER,
    editorial: DataTypes.STRING
})

// Ruta GET para obtener solo el id y el nombre de todas las familias de artículos
let arr_ArticulosFamilias = [] //Arreglo que luego se va a recorrer
router.get("/api/articulosfamilias", async function (req, res) {
    let data = await db.articulosfamilias.findAll({
      attributes: ["IdArticuloFamilia", "Nombre"],
    })
  
    // Guardar los resultados en el array arr_ArticulosFamilias
    arr_ArticulosFamilias = data.map(item => item.toJSON()) // Convertir a JSON
  
    res.json(arr_ArticulosFamilias) // Enviar la respuesta
  })

// Ruta GET para obtener un artículo por ID (id parametro obligatorio)
router.get('/api/articulosfamilias/:id', async function (req, res) {
    let articuloFamilia = arr_ArticulosFamilias.find(
      (x) => x.IdArticuloFamilia == req.params.id
    )
  
    if (articuloFamilia) {
      res.json(articuloFamilia)
    } else {
      res.status(404).json({ message: 'articulofamilia no encontrado' })
    }
  })

  //Ruta GET para filtrar un libro segun un titulo tomado como parametro opcional, en caso de no encontrar devuelve todos
  app.get('/api/libros', async (req, res) => {
    try{
        if(req.query.titulo) {
            const libros = await Libro.findAll({
                where: {
                    titulo: { [Op.like]: `%${req.query.titulo}%`} //Se filtra segun el req.query.titulo
                }
            });
            return res.json(libros);
        }

        const libros = await Libro.findAll(); //Si no se encuentra ninguno se devuelven todos
        res.json(libros);

    } catch (err) {
        console.log(err.message) //Se da un error si no se puede hacer
    }
})


/*#######################################FRONTEND##############################################################*/

//Llamar a un GET usando fetch para luego mostrarlo en un html
const cargarLibros = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/libros"); //Llama al get ubicado en esa ruta
      const libros = await response.json(); //Se traduce la respuesta a json
  
      const listaLibros = document.getElementById("lista-libros"); //Se encuentra la tabla en el html
      listaLibros.innerHTML = ""; //Se asegura que la tabla actual este limpia
  
      libros.forEach((libro) => { //Se itera cada uno de los libros
        const row = `
             <tr>
               <td>${libro.titulo}</td>
               <td>${libro.autor}</td>
               <td>${libro.genero}</td>
               <td>${libro.editorial}</td>
               <td>${libro.año_publicacion}</td>
             </tr>
           `; //Se crea una variable fila con la estructura html y los atributos de libro
        listaLibros.innerHTML += row; //Se agrega esa fila a la tabla
      });
    } catch (err) {
      console.log(err.message); //Si pasa algo se avisa
    }
  };

  //Llamar a un get usando fetch, filtrar si se tiene un atributo titulo y mostrarlo, si no se tiene titulo mostrar todo
  const cargarFiltrados = async (titulo) => {
    try {
        const response = await fetch(`http://localhost:3000/api/libros?titulo=${titulo}`); //Llama al get ubicado en esa ruta pasandole un titulo
        const libros = await response.json(); //Se traduce la respuesta a json
    
        const listaLibros = document.getElementById("lista-libros"); //Se encuentra la tabla en el html
        listaLibros.innerHTML = ""; //Se asegura que la tabla actual este limpia
    
        libros.forEach((libro) => { //Se itera cada uno de los libros
          const row = `
               <tr>
                 <td>${libro.titulo}</td>
                 <td>${libro.autor}</td>
                 <td>${libro.genero}</td>
                 <td>${libro.editorial}</td>
                 <td>${libro.año_publicacion}</td>
               </tr>
             `; //Se crea una variable fila con la estructura html y los atributos de libro
          listaLibros.innerHTML += row; //Se agrega esa fila a la tabla
        });
      } catch (err) {
        console.log(err.message); //Si pasa algo se avisa
      }
}

const btnFiltrar = document.getElementById('btnFiltrar'); //Se encuentra el boton en el html
  btnFiltrar.addEventListener('click', async function (event) { //Se escucha para cuando lo toquen
      // console.log('click event', event)
      const tituloIngresado = document.getElementById('titulo').value.trim(); 
      //En el momento en que es presionado, se busca el elemento titulo y se guarda el valor sin espacios
      await cargarFiltrados(tituloIngresado) //Se llama a la funcion de filtrado
  })

