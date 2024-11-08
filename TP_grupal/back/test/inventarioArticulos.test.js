const request = require("supertest")
const app = require("../index")

//Test para la ruta /inventarioArticulos/get
describe("GET /inventarioArticulos/get", () => {
    it("Debería devolver todos los artículos", async () => { //Se describe la funcionalidad para facilidad de lectura
        const res = await request(app).get("/inventarioArticulos/get"); //Se hace la solicitud al endpoint
        expect(res.statusCode).toEqual(200); //Se chequea si la solicitud fue un exito

        expect(res.body).toEqual(expect.arrayContaining([   //La respuesta deberia ser un array
            expect.objectContaining({                       //Este array deberia tener objetos con las siguientes propiedades:
                IdInventario: expect.any(Number),
                NombreArticulo: expect.any(String),
                Cantidad: expect.any(Number),
                Ubicacion: expect.any(String),
                FechaRegistro: expect.any(String),
                IdHistorialPrecios: expect.any(Number),
            })
        ]),
    );
    });
});

//Test para la ruta /inventarioArticulos/getById
describe("GET /inventarioArticulos/getById", () => {
    it("Deberia devolver un articulo por Id", async () => {

        const res = await request(app).get("/inventarioArticulos/getById?IdInventario=1")
        expect(res.statusCode).toEqual(200)

        //A diferencia del otro get, este no nos devuelve un array de objetos, sino un objeto
        //Asi que vemos solo si tiene las propiedades esperadas
        expect.objectContaining({
            IdarticulosCocina: expect.any(Number),
            NombreArticulo: expect.any(String),
            Cantidad: expect.any(Number),
            Ubicacion: expect.any(String),
            FechaRegistro: expect.any(String),
            IdHistorialPrecios: expect.any(Number),
        })
    })
})

//Test para la ruta /inventarioArticulos/post
describe("POST /inventarioArticulos/post", () => {
    it("Deberia devolver el articulo que acaba de crear", async () => {

        //Definimos el articulo que se dara de alta a modo de prueba
        const articuloInventarioAlta = {
            NombreArticulo: "Articulo nuevo 3333",
            Cantidad: 10399,
            Ubicacion: "2026-03-25",
            FechaRegistro: "2026-03-25",
            IdHistorialPrecios: 1
        }

        //Se envia al solicitud de alta
        const res = await request(app).post("/inventarioArticulos/post").send(articuloInventarioAlta) 
        //Se verifica que el statusCode sea 201, creacion exitosa
        expect(res.statusCode).toEqual(201)

        //Se verifica que se devuelva un articulo valido
            expect.objectContaining({
                IdarticulosCocina: expect.any(Number),
                NombreArticulo: expect.any(String),
                Cantidad: expect.any(Number),
                Ubicacion: expect.any(String),
                FechaRegistro: expect.any(String),
                IdHistorialPrecios: expect.any(Number),
            })
    })
})

//Test para la ruta /inventarioArticulos/put
describe("PUT /inventarioArticulos/put", () => {
  it("Deberia devolver el articulo actualizado", async () => {

      //Se crean los datos del articulo que se va a modificar
      const articuloInventarioModificacion = {  // Nombre de variable incorrecto
          NombreArticulo: "Articulo actualizado 3333",
          Cantidad: 10399,
          Ubicacion: "2026-03-25",
          FechaRegistro: "2026-03-25",
          IdHistorialPrecios: 2
      }
      //Se envia la peticion de put
      const res = await request(app).put("/inventarioArticulos/put?IdInventario=4").send(articuloInventarioModificacion)
      expect(res.statusCode).toEqual(200)

      //Se verifica que se devuelva un articulo valido
      expect(res.body).toEqual(  // Faltaba el expect(res.body).toEqual()
          expect.objectContaining({
              IdInventario: expect.any(Number),  // Nombre de propiedad incorrecto
              NombreArticulo: expect.any(String),
              Cantidad: expect.any(Number),
              Ubicacion: expect.any(String),
              FechaRegistro: expect.any(String),
              IdHistorialPrecios: expect.any(Number),
          })
      )
  })
})

//Test para la ruta /inventarioArticulos/delete
describe("DELETE /inventarioArticulos/delete", () => {
    it("Deberia devolver un mensaje de confirmacion tras eliminar el articuloInventario", async () => {
        const res = await request(app).delete("/inventarioArticulos/delete?IdInventario=7")
        expect(res.statusCode).toEqual(200)

        //En nuestro endpoint esta fue la respuesta que se daba si todo estaba en orden
        expect(res.body).toEqual({ message: 'articulo del inventario eliminado' })
    })
})