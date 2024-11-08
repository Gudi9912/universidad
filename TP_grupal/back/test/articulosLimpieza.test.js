const request = require("supertest")
const app = require("../index")

//Test para la ruta /articulosLimpieza/get
describe("GET /articulosLimpieza/get", () => {
    it("Debería devolver todos los artículos", async () => { //Se describe la funcionalidad para facilidad de lectura
        const res = await request(app).get("/articulosLimpieza/get"); //Se hace la solicitud al endpoint
        expect(res.statusCode).toEqual(200); //Se chequea si la solicitud fue un exito

        expect(res.body).toEqual(expect.arrayContaining([   //La respuesta deberia ser un array
            expect.objectContaining({                       //Este array deberia tener objetos con las siguientes propiedades:
                IdarticulosLimpieza: expect.any(Number),
                Nombre: expect.any(String),
                Precio: expect.any(Number),
                FechaCaducidad: expect.any(String),
                IdProveedor: expect.any(Number),
            })
        ]),
    );
    });
});

//Test para la ruta /articulosLimpieza/getById
describe("GET /articulosLimpieza/getById", () => {
    it("Deberia devolver un articulo por Id", async () => {

        const res = await request(app).get("/articulosLimpieza/getById?IdarticulosLimpieza=1")
        expect(res.statusCode).toEqual(200)

        //A diferencia del otro get, este no nos devuelve un array de objetos, sino un objeto
        //Asi que vemos solo si tiene las propiedades esperadas
        expect.objectContaining({
            IdarticulosLimpieza: expect.any(Number),
            Nombre: expect.any(String),
            Precio: expect.any(Number),
            FechaCaducidad: expect.any(String),
            IdProveedor: expect.any(Number),
        })
    })
})

//Test para la ruta /articulosLimpieza/post
describe("POST /articulosLimpieza/post", () => {
    it("Deberia devolver el articulo que acaba de crear", async () => {

        //Definimos el articulo que se dara de alta a modo de prueba
        const articuloLimpiezaAlta = {
            Nombre: "Articulo nuevo 222",
            Precio: 10399,
            FechaCaducidad: "2025-01-15",
            IdProveedor: 1
        }

        //Se envia al solicitud de alta
        const res = await request(app).post("/articulosLimpieza/post").send(articuloLimpiezaAlta) 
        //Se verifica que el statusCode sea 201, creacion exitosa
        expect(res.statusCode).toEqual(201)

        //Se verifica que se devuelva un articulo valido
            expect.objectContaining({
                IdarticulosLimpieza: expect.any(Number),
                Nombre: expect.any(String),
                Precio: expect.any(Number),
                FechaCaducidad: expect.any(String),
                IdProveedor: expect.any(Number),
            })
    })
})

//Test para la ruta /articulosLimpieza/put
describe("PUT /articulosLimpieza/put", () => {
    it("Deberia devolver el articulo actualizado", async () => {

        //Se crean los datos del articulo que se va a modificar
        const articuloLimpiezaModificacion = {
            Nombre: "Articulo actualizado 23",
            Precio: 10399,
            FechaCaducidad: "2025-01-15",
            IdProveedor: 2
    
}
        //Se envia la peticion de put
        const res = await request(app).put("/articulosLimpieza/put?IdarticulosLimpieza=1").send(articuloLimpiezaModificacion)
        expect(res.statusCode).toEqual(200)

        //Se verifica que se devuelva un articulo valido
            expect.objectContaining({
                IdarticulosLimpieza: expect.any(Number),
                Nombre: expect.any(String),
                Precio: expect.any(Number),
                FechaCaducidad: expect.any(String),
                IdProveedor: expect.any(Number),
            })
    })
})

//Test para la ruta /articulosLimpieza/delete
describe("DELETE /articulosLimpieza/delete", () => {
    it("Deberia devolver un mensaje de confirmacion tras eliminar el articuloLimpieza", async () => {
        const res = await request(app).delete("/articulosLimpieza/delete?IdarticulosLimpieza=12")
        expect(res.statusCode).toEqual(200)

        //En nuestro endpoint esta fue la respuesta que se daba si todo estaba en orden
        expect(res.body).toEqual({ message: 'articulo Limpieza eliminado' })
    })
})