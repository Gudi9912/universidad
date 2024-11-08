const request = require("supertest")
const app = require("../index")

//Test para la ruta /articulosCocina/get
describe("GET /articulosCocina/get", () => {
    it("Debería devolver todos los artículos", async () => { //Se describe la funcionalidad para facilidad de lectura
        const res = await request(app).get("/articulosCocina/get"); //Se hace la solicitud al endpoint
        expect(res.statusCode).toEqual(200); //Se chequea si la solicitud fue un exito

        expect(res.body).toEqual(expect.arrayContaining([   //La respuesta deberia ser un array
            expect.objectContaining({                       //Este array deberia tener objetos con las siguientes propiedades:
                IdarticulosCocina: expect.any(Number),
                Nombre: expect.any(String),
                Precio: expect.any(Number),
                FechaCreacion: expect.any(String),
                IdmarcaArticulosCocina: expect.any(Number),
            })
        ]),
    );
    });
});

//Test para la ruta /articulosCocina/getById
describe("GET /articulosCocina/getById", () => {
    it("Deberia devolver un articulo por Id", async () => {

        const res = await request(app).get("/articulosCocina/getById?IdarticulosCocina=1")
        expect(res.statusCode).toEqual(200)

        //A diferencia del otro get, este no nos devuelve un array de objetos, sino un objeto
        //Asi que vemos solo si tiene las propiedades esperadas
        expect.objectContaining({
            IdarticulosCocina: expect.any(Number),
            Nombre: expect.any(String),
            Precio: expect.any(Number),
            FechaCreacion: expect.any(String),
            IdmarcaArticulosCocina: expect.any(Number),
        })
    })
})

//Test para la ruta /articulosCocina/post
describe("POST /articulosCocina/post", () => {
    it("Deberia devolver el articulo que acaba de crear", async () => {

        //Definimos el articulo que se dara de alta a modo de prueba
        const articuloCocinaAlta = {
            Nombre: "Articulo nuevo 3333",
            Precio: 10399,
            FechaCreacion: "2026-03-25",
            IdmarcaArticulosCocina: 1
        }

        //Se envia al solicitud de alta
        const res = await request(app).post("/articulosCocina/post").send(articuloCocinaAlta) 
        //Se verifica que el statusCode sea 201, creacion exitosa
        expect(res.statusCode).toEqual(201)

        //Se verifica que se devuelva un articulo valido
            expect.objectContaining({
                IdarticulosCocina: expect.any(Number),
                Nombre: expect.any(String),
                Precio: expect.any(Number),
                FechaCreacion: expect.any(String),
                IdmarcaArticulosCocina: expect.any(Number),
            })
    })
})

//Test para la ruta /articulosCocina/put
describe("PUT /articulosCocina/put", () => {
    it("Deberia devolver el articulo actualizado", async () => {

        //Se crean los datos del articulo que se va a modificar
        const articuloCocinaModificacion = {
            Nombre: "Articulo actualizado 3333",
            Precio: 10399,
            FechaCreacion: "2026-03-25",
            IdmarcaArticulosCocina: 2
    
}
        //Se envia la peticion de put
        const res = await request(app).put("/articulosCocina/put?IdarticulosCocina=1").send(articuloCocinaModificacion)
        expect(res.statusCode).toEqual(200)

        //Se verifica que se devuelva un articulo valido
            expect.objectContaining({
                IdarticulosCocina: expect.any(Number),
                Nombre: expect.any(String),
                Precio: expect.any(Number),
                FechaCreacion: expect.any(String),
                IdmarcaArticulosCocina: expect.any(Number),
            })
    })
})

//Test para la ruta /articulosCocina/delete
describe("DELETE /articulosCocina/delete", () => {
    it("Deberia devolver un mensaje de confirmacion tras eliminar el articuloCocina", async () => {
        const res = await request(app).delete("/articulosCocina/delete?IdarticulosCocina=13")
        expect(res.statusCode).toEqual(200)

        //En nuestro endpoint esta fue la respuesta que se daba si todo estaba en orden
        expect(res.body).toEqual({ message: 'articulo Cocina eliminado' })
    })
})