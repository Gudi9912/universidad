// Script con funcionalidad del index...

async function getStatus() {
    try {
        const resp = await fetch("http://localhost:3001/status");
        const { respuesta } = await resp.json();
        return respuesta;
    }
    catch (error) {
        console.log(error);
        return "API fuera de línea";
    }

}


document.addEventListener('DOMContentLoaded', async function (e) {
    
    console.log("Script ejecutado...");

    const respuesta = await getStatus();
    // console.log("Respuesta obtenida: " + respuesta);
    const label = document.getElementById("estado_api");
    label.textContent = respuesta;


});
