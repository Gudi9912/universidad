const cargarMuseos = async () => {
   //Agregar codigo
   try{
      const response = await fetch("http://localhost:3000/museo")
      const museos = await response.json()

      const listaMuseos = document.getElementById("lista-museos")
      listaMuseos.innerHTML = ""

      museos.forEach((museo) => {
         const row = `
         <tr>
            <td>${libro.nombre}</td>
            <td>${libro.ubicacion}</td>
            <td>${libro.exposiciones}</td>
            <td>${libro.horarios}</td>
            <td>${libro.precioEntrada}</td>
         </tr>
         `
      listaMuseos.innerHTML += row
      });
   }catch(err){
      console.log(err.message)
   }
};

const cargarFiltrados = async(nombre) =>{
   try{
      const response = await fetch(`http://localhost:3000/museo?nombre=${nombre}`)
      const museos = await response.json()

      const listaMuseos = document.getElementById("lista-museos")
      listaMuseos.innerHTML = ""
      museos.forEach((museo) => {
         const row = `
         <tr>
            <td>${libro.nombre}</td>
            <td>${libro.ubicacion}</td>
            <td>${libro.exposiciones}</td>
            <td>${libro.horarios}</td>
            <td>${libro.precioEntrada}</td>
         </tr>
         `
         listaMuseos.innerHTML += row
      }) 
   }catch(err){
      console.log(err.message)
   }
}

cargarMuseos();
