# Guía Interactiva de Museos - Ejercitación de Desarrollo de Software

## Objetivo
El objetivo de esta ejercitación es que los estudiantes demuestren su capacidad para integrar y completar código en una aplicación web que utiliza tecnologías de frontend y backend. La aplicación mostrará una lista de museos con detalles como ubicación, exposiciones actuales, horarios de visita y precios de entrada.

## Descripción de la Ejercitación
Los estudiantes recibirán un código base para una aplicación web que incluye componentes de frontend y backend. Deberán completar ciertas funciones para que la aplicación funcione correctamente. El frontend debe usar HTML y JavaScript para mostrar una lista de museos. El backend, desarrollado con Node.js, servirá estos museos desde una base de datos en memoria SQLite gestionada por Sequelize.

### Requisitos del Backend
- Completar la implementación de la ruta `GET` en el backend para recuperar museos desde la base de datos SQLite utilizando Sequelize.

### Requisitos del Frontend
- Completar la función `cargarMuseos` en JavaScript para obtener los museos desde el backend usando la API Fetch y renderizarlos dinámicamente en la página web.

## Instrucciones
1. **Configuración del Backend:**
   - Se proporcionará el código base para la aplicación Node.js.
   - Los estudiantes deben completar la implementación de la ruta `app.get('/museos', async (req, res) => {...})` para que devuelva los museos desde la base de datos.

2. **Configuración del Frontend:**
   - Se proporcionará un archivo HTML básico y el código JavaScript inicial.
   - Los estudiantes deben completar la función `cargarMuseos` en el código JavaScript para realizar una solicitud fetch al backend, procesar la respuesta y mostrar los museos dinámicamente en la página HTML.

3. **Pruebas:**
   - Verificar que la función `cargarMuseos` obtiene y muestra correctamente los museos del backend.
   - Asegurarse de que la ruta del backend devuelve los datos correctos y maneja posibles errores.

## Criterios de Evaluación
- Funcionalidad: La aplicación funciona como se describe, completando correctamente las partes del código requeridas.
- Calidad del Código: El código es limpio, bien organizado y adecuadamente comentado.
- Diseño: El frontend muestra los museos de manera clara y organizada.

## Pruebas y Ejecución:
Para probar y ejecutar este servidor ejecuta los siguientes comandos en tu terminal para instalar las dependencias y arrancar el servidor:

```bash
npm install express sequelize sqlite3 cors
node app.js
Esto iniciará el servidor en http://localhost:3000, y podrás acceder a los datos de los museos accediendo a http://localhost:3000/museos desde un navegador o utilizando herramientas como Postman.\
```