===================================CAMBIOS REALIZADOS====================================================
1- En back>routes>articulosLimpieza.js se agrego el codigo de abajo a los endpoints get, para mostrar la informacion
del proveedor en lugar de solo su id
{
    include: [
        {
            model: db.proveedoresLimpieza,
            attributes: ["IdProveedor", "NombreProveedor", "Telefono", "ProximaEntrega"]
        }
      ]
}
2- Inicializado el front
3- Realizado un Menu.jsx con dropdowns para cada pagina de la aplicacion
4- Preparado un Consultar.jsx generico y andando
5- Añadido TablaLimpieza.jsx y andando
6- Añadido endpoint en el back getByNombre
7- Añadido el uso de cors en index.js del back
8- Añadido componente FiltrosLimpieza.jsx y andando
