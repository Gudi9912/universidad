//se accede a la base usando aa-sqlite para poder manipularla despues facilmente
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste(){
    //Se intenta abrir la base de datos, si no existe se crea
    await db.open("./.data/ArticulosDB.db")
    
    let res = null //res nos ayudara a saber si la tabla existe dentro de la base de datos
    let existe = false //esta variable booleana la usaremos para mejorar la legibilidad del codigo
    

    // =============================
    // CREACIÓN DE LA TABLA 1 GONZA
    // =============================
    res = await db.get(
        "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'proveedoresLimpieza' ",
        []
    )
    if (res.contar > 0) existe = true

    if (!existe){
        await db.run( 
            "CREATE TABLE proveedoresLimpieza (" +
            "IdProveedor INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "NombreProveedor TEXT NOT NULL, " + // Campo STRING para el nombre del proveedor
            "Telefono INTEGER NOT NULL, " +      // Campo INTEGER para el teléfono del proveedor
            "ProximaEntrega DATE NOT NULL" +     // Campo DATE para la próxima entrega
            ");"
    )
    console.log("Tabla proveedoresLimpieza creada con exito!")
    await db.run( 
        "INSERT INTO proveedoresLimpieza (NombreProveedor, Telefono, ProximaEntrega) VALUES " +
        "('Limpio S.A.', 1234567890, '2024-11-01'), " +
        "('Proveedores Eco', 2345678901, '2024-11-15'), " +
        "('Higiene Total', 3456789012, '2024-12-01'), " +
        "('Soluciones de Limpieza', 4567890123, '2024-12-10'), " +
        "('Limpieza Express', 5678901234, '2025-01-05'), " +
        "('Cuidado y Limpieza', 6789012345, '2025-01-20'), " +
        "('Productos del Hogar', 7890123456, '2025-02-01'), " +
        "('Limpieza Verde', 8901234567, '2025-02-15'), " +
        "('Todo Limpio', 9012345678, '2025-03-01'), " +
        "('Limpieza Eficaz', 1023456789, '2025-03-10');"
    );
    console.log("Datos cargados en la tabla con exito!")
}
    // =============================
    // CREACIÓN DE LA TABLA 2 GONZA
    // =============================


    res = await db.get(
        //Se cuentan la cantidad de tablas llamadas REEMPLAZAR en la base de datos 
        //y se lo asigna como la propiedad contar
        "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'articulosLimpieza'",
        [] 
    )

    if (res.contar > 0) existe = true //Si existe una tabla REEMPLAZAR se cambia el valor de la bandera existe

    if (!existe){ //Si la tabla NO EXISTE se crea con las columnas señaladas
        await db.run( 
            "CREATE TABLE articulosLimpieza (" +
            "IdarticulosLimpieza INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "Nombre TEXT NOT NULL, " +
            "Precio INTEGER NOT NULL, " +
            "FechaCaducidad DATE NOT NULL, " +
            "IdProveedor INTEGER NOT NULL, " +
            "FOREIGN KEY(IdProveedor) REFERENCES proveedoresLimpieza(IdProveedor)" +
            ");"
        );
        console.log("Tabla articulosLimpieza creada!"); // Se avisa que la tabla fue creada con éxito
        
        await db.run( // Se cargan los valores dentro de la tabla
            "INSERT INTO articulosLimpieza (Nombre, Precio, FechaCaducidad, IdProveedor) VALUES " +
            "('Detergente', 1500, '2025-01-15', 1), " +
            "('Jabón Líquido', 2500, '2025-02-20', 2), " +
            "('Limpiador Multiusos', 3500, '2025-03-10', 3), " +
            "('Esponjas', 1200, '2025-04-05', 4), " +
            "('Guantes de Limpieza', 3000, '2025-05-01', 5), " +
            "('Desinfectante', 8000, '2025-06-18', 6), " +
            "('Bolsas de Basura', 1000, '2025-07-25', 7), " +
            "('Fregona', 4500, '2025-08-15', 8), " +
            "('Trapeador', 2500, '2025-09-10', 9), " +
            "('Paños de Microfibra', 2000, '2025-10-05', 10);"
        );
        console.log("Datos cargados en la tabla con exito")
    }
    
    // =============================
    // CREACIÓN DE LA TABLA 3 MATEO
    // =============================

    res = await db.get(
        //Se cuentan la cantidad de tablas llamadas articulosCocina en la base de datos 
        //y se lo asigna como la propiedad contar
        "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'articulosCocina'",
        [] 
    )

    if (res.contar > 0) existe = true //Si existe una tabla articulosCocina se cambia el valor de la bandera existe

    if (!existe){ //Si la tabla NO EXISTE se crea con las columnas señaladas
        await db.run(
            "CREATE table articulosCocina(" +
            "IdarticulosCocina INTEGER PRIMARY KEY AUTOINCREMENT," +
            "Nombre text NOT NULL ," +
            "Precio INTEGER NOT NULL," +
            "FechaCreacion DATE NOT NULL," +
            "IdmarcaArticulosCocina INTEGER," +  // Definición de la clave foránea correcta
            "FOREIGN KEY(IdmarcaArticulosCocina) REFERENCES marcaArticulosCocina(IdmarcaArticulosCocina)" +
            ");"
        );
        console.log("Tabla articulosCocina creada!") //Se avisa que la tabla fue creada con exito
        await db.run(
            "INSERT INTO articulosCocina (Nombre, Precio, FechaCreacion, IdmarcaArticulosCocina) VALUES " +
            "('Cuchillo Chef', 3200, '2023-02-15', 1), " +
            "('Sartén Antiadherente', 4500, '2023-05-23', 2), " +
            "('Olla de Acero', 3800, '2023-07-12', 3), " +
            "('Batidora de Mano', 2990, '2023-09-08', 4), " +
            "('Tostadora', 2700, '2023-03-29', 5), " +
            "('Set de Tazas Medidoras', 1200, '2023-10-20', 6), " +
            "('Pelador de Verduras', 1050, '2023-01-18', 7), " +
            "('Rallador de Queso', 1350, '2023-08-30', 8), " +
            "('Tabla de Corte Bambú', 4100, '2023-06-10', 9), " +
            "('Exprimidor Manual', 1600, '2023-04-05', 10);"
        );
        console.log("Datos cargados de articulosCocina en la tabla con exito")
    }

    // =============================
    // CREACIÓN DE LA TABLA 4 MATEO
    // =============================

    res = await db.get(
        //Se cuentan la cantidad de tablas llamadas marcaARticulosCocina en la base de datos 
        //y se lo asigna como la propiedad contar
        "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'marcaArticulosCocina'",
        [] 
    )

    if (res.contar > 0) existe = true //Si existe una tabla articulosPanificados se cambia el valor de la bandera existe

    if (!existe){ //Si la tabla NO EXISTE se crea con las columnas señaladas
        await db.run( 
            "CREATE table marcaArticulosCocina(" +
            "IdmarcaArticulosCocina INTEGER PRIMARY KEY AUTOINCREMENT," +
            "Nombre text NOT NULL ," +
            "CantSucursales INTEGER NOT NULL" + 
            ");"
        )
        console.log("Tabla marcaArticulosCocina creada!") //Se avisa que la tabla fue creada con exito
        await db.run( // Se cargan los valores dentro de la tabla
            "INSERT INTO marcaArticulosCocina (Nombre, CantSucursales) VALUES " +
            "('La Anónima', 55), " +
            "('Tupperware Argentina', 72), " +
            "('Cocinero', 33), " +
            "('Peabody', 12), " +
            "('Atma', 89), " +
            "('BGH', 44), " +
            "('Philco', 18), " +
            "('Ultracomb', 67), " +
            "('Lumi', 25), " +
            "('Essen', 41);"
        );
        console.log("Datos cargados de marcaArticulosCocina en la tabla con exito")
    }

    //await mostrarRegistrosRelacionados(); // Llamamos a la función para mostrar registros relacionados
    // =============================
    // CREACIÓN DE LA TABLA 5 ARIADNA
    // =============================
    res = await db.get(
        "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'historialPrecios'",
        []
    );
    existe = res.contar > 0;
    
    if (!existe) {
        await db.run(
            "CREATE TABLE historialPrecios (" +
            "IdHistorialPrecios INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "Precio INTEGER NOT NULL, " +
            "FechaCambio DATE NOT NULL" +
            ");"
        );
        console.log("Tabla historialPrecios creada con éxito!");
        
        await db.run(
            "INSERT INTO historialPrecios (Precio, FechaCambio) VALUES " +
            "(1500, '2024-01-15'), " +
            "(2000, '2024-02-01'), " +
            "(2500, '2024-02-15'), " +
            "(1800, '2024-03-01'), " +
            "(3000, '2024-03-15'), " +
            "(2200, '2024-04-01'), " +
            "(2800, '2024-04-15'), " +
            "(1900, '2024-05-01'), " +
            "(2600, '2024-05-15'), " +
            "(3200, '2024-06-01');"
        );
        console.log("Datos cargados en historialPrecios con éxito!");
    }

    
    // =============================
    // CREACIÓN DE LA TABLA 6 ARIADNA
    // =============================

    res = await db.get(
        "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'inventarioArticulos'",
        []
    );
    existe = res.contar > 0;

    if (!existe) {
        await db.run(
            "CREATE TABLE inventarioArticulos (" +
            "IdInventario INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "NombreArticulo TEXT NOT NULL, " +
            "Cantidad INTEGER NOT NULL, " +
            "Ubicacion TEXT NOT NULL, " +
            "FechaRegistro DATE NOT NULL, " +
            "IdHistorialPrecios INTEGER, " +
            "FOREIGN KEY(IdHistorialPrecios) REFERENCES historialPrecios(IdHistorialPrecios)" +
            ");"
        );
        console.log("Tabla inventarioArticulos creada con éxito!");
        await db.run(
            "INSERT INTO inventarioArticulos (NombreArticulo, Cantidad, Ubicacion, FechaRegistro, IdHistorialPrecios) VALUES " +
            "('Detergente Multiuso', 100, 'Estante A1', '2024-03-01', 1), " +
            "('Jabón en Polvo', 150, 'Estante B2', '2024-03-02', 2), " +
            "('Limpiador de Pisos', 80, 'Estante C3', '2024-03-03', 3), " +
            "('Desinfectante', 120, 'Estante D4', '2024-03-04', 4), " +
            "('Lavandina', 200, 'Estante E5', '2024-03-05', 5), " +
            "('Suavizante', 90, 'Estante F6', '2024-03-06', 6), " +
            "('Quitamanchas', 70, 'Estante G7', '2024-03-07', 7), " +
            "('Limpiador de Vidrios', 110, 'Estante H8', '2024-03-08', 8), " +
            "('Desodorante de Ambientes', 85, 'Estante I9', '2024-03-09', 9), " +
            "('Cera para Pisos', 95, 'Estante J10', '2024-03-10', 10);"
        );
        console.log("Datos cargados en inventarioArticulos con éxito!");
    }
    db.close() //Se cierra la base de datos


}

/*
async function mostrarRegistrosRelacionados() {
    // Esta función ejecuta una consulta JOIN para verificar la relación entre las tablas
    const registros = await db.all(
        `SELECT articulosCocina.Nombre AS Articulo, articulosCocina.Precio, articulosCocina.FechaCreacion, 
        marcaArticulosCocina.Nombre AS Marca 
        FROM articulosCocina 
        JOIN marcaArticulosCocina ON articulosCocina.IdmarcaArticulosCocina = marcaArticulosCocina.IdmarcaArticulosCocina;`
    );

    console.log("Registros relacionados:");
    console.table(registros);
}
*/

CrearBaseSiNoExiste()
