const cargarLibros = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/libros");
      const libros = await response.json();
  
      const listaLibros = document.getElementById("lista-libros");
      listaLibros.innerHTML = "";
  
      libros.forEach((libro) => {
        const row = `
             <tr>
               <td>${libro.titulo}</td>
               <td>${libro.autor}</td>
               <td>${libro.genero}</td>
               <td>${libro.editorial}</td>
               <td>${libro.año_publicacion}</td>
             </tr>
           `;
        listaLibros.innerHTML += row;
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  
  const cargarFiltrados = async (titulo) => {
      try {
          const response = await fetch(`http://localhost:3000/api/libros?titulo=${titulo}`);
          const libros = await response.json();
      
          const listaLibros = document.getElementById("lista-libros");
          listaLibros.innerHTML = "";
      
          libros.forEach((libro) => {
            const row = `
                 <tr>
                   <td>${libro.titulo}</td>
                   <td>${libro.autor}</td>
                   <td>${libro.genero}</td>
                   <td>${libro.editorial}</td>
                   <td>${libro.año_publicacion}</td>
                 </tr>
               `;
            listaLibros.innerHTML += row;
          });
        } catch (err) {
          console.log(err.message);
        }
  }
  
  cargarLibros();
  const btnFiltrar = document.getElementById('btnFiltrar');
  btnFiltrar.addEventListener('click', async function (event) {
      // console.log('click event', event)
      const tituloIngresado = document.getElementById('titulo').value.trim();
      await cargarFiltrados(tituloIngresado)
  })
  