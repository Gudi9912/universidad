const request = require("supertest")
const app = require("../index")

//Test para la ruta /proveedoresLimpieza/get
describe("GET /proveedoresLimpieza/get", () => {
    it("Debería devolver todos los artículos", async () => { //Se describe la funcionalidad para facilidad de lectura
        const res = await request(app).get("/proveedoresLimpieza/get"); //Se hace la solicitud al endpoint
        expect(res.statusCode).toEqual(200); //Se chequea si la solicitud fue un exito

        expect(res.body).toEqual(expect.arrayContaining([   //La respuesta deberia ser un array
            expect.objectContaining({                       //Este array deberia tener objetos con las siguientes propiedades:
                IdProveedor: expect.any(Number),
                NombreProveedor: expect.any(String),
                Telefono: expect.any(Number),
                ProximaEntrega: expect.any(String)
            })
        ]),
    );
    });
});

//Test para la ruta /proveedoresLimpieza/getById
describe("GET /proveedoresLimpieza/getById", () => {
    it("Deberia devolver un proveedor por Id", async () => {

        const res = await request(app).get("/proveedoresLimpieza/getById?IdProveedor=2")
        expect(res.statusCode).toEqual(200)

        //A diferencia del otro get, este no nos devuelve un array de objetos, sino un objeto
        //Asi que vemos solo si tiene las propiedades esperadas
        expect.objectContaining({
            IdProveedor: expect.any(Number),
            NombreProveedor: expect.any(String),
            Telefono: expect.any(Number),
            ProximaEntrega: expect.any(String)
        })
    })
})

//Test para la ruta /proveedoresLimpieza/post
describe("POST /proveedoresLimpieza/post", () => {
    it("Deberia devolver el proveedor que acaba de crear", async () => {

        //Definimos el articulo que se dara de alta a modo de prueba
        const proveedorLimpiezaAlta = {
            NombreProveedor: "Proveedor nuevo 222",
            Telefono: 10399,
            ProximaEntrega: "2025-01-15"
        }

        //Se envia al solicitud de alta
        const res = await request(app).post("/proveedoresLimpieza/post").send(proveedorLimpiezaAlta) 
        //Se verifica que el statusCode sea 201, creacion exitosa
        expect(res.statusCode).toEqual(201)

        //Se verifica que se devuelva un articulo valido
            expect.objectContaining({
                IdProveedor: expect.any(Number),
                NombreProveedor: expect.any(String),
                Telefono: expect.any(Number),
                ProximaEntrega: expect.any(String)
            })
    })
})

//Test para la ruta /proveedoresLimpieza/put
describe("PUT /proveedoresLimpieza/put", () => {
    it("Deberia devolver el proveedor actualizado", async () => {

        //Se crean los datos del articulo que se va a modificar
        const proveedorLimpiezaModificacion = {
            NombreProveedor: "Proveedor modificado 222",
            Telefono: 10399,
            ProximaEntrega: "2025-01-15"
        }

        //Se envia la peticion de put
        const res = await request(app).put("/proveedoresLimpieza/put?IdProveedor=2").send(proveedorLimpiezaModificacion)
        expect(res.statusCode).toEqual(200)

        //Se verifica que se devuelva un articulo valido
        expect.objectContaining({
            IdProveedor: expect.any(Number),
            NombreProveedor: expect.any(String),
            Telefono: expect.any(Number),
            ProximaEntrega: expect.any(String)
        })
    })
})

//Test para la ruta /proveedoresLimpieza/delete
describe("DELETE /proveedoresLimpieza/delete", () => {
    it("Deberia devolver un mensaje de confirmacion tras eliminar el articuloLimpieza", async () => {
        const res = await request(app).delete("/proveedoresLimpieza/delete?IdProveedor=12")
        expect(res.statusCode).toEqual(200)

        //En nuestro endpoint esta fue la respuesta que se daba si todo estaba en orden
        expect(res.body).toEqual({ message: 'proveedor Limpieza eliminado' })
    })
})