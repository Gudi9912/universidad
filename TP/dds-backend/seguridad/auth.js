const jwt = require("jsonwebtoken"); //se importa el modulo

//Se definen dos secretos: uno para el token de acceso y otro para el token de actualización. 
const accessTokenSecret = "youraccesstokensecret";
const refreshTokenSecret = "yourrefreshtokensecrethere";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization; //Se obtiene el encabezado Authorization de la solicitud.

  if (authHeader) { //Se verifica si el encabezado de autorización existe.
    const token = authHeader.split(" ")[1]; //Si existe el encabezado, se divide en dos partes (el tipo de esquema y el token) y se extrae el token.

    //Se utiliza el método verify de jsonwebtoken para verificar la validez del token usando el secreto de acceso.
    jwt.verify(token, accessTokenSecret, (err, user) => {
        
      if (err) {
        //return res.sendStatus(400);
        return res.status(403).json({ message: "token no es valido" });
      }
      //Si el token es válido, se guarda la información del usuario decodificada en res.locals.user
      res.locals.user = user;
      next();
    });
  } else {
    //res.sendStatus(401);
    //Si no hay encabezado de autorización, se envía una respuesta con el estado 401 (Unauthorized)
    res.status(401).json({ message: "Acceso denegado" });
  }
};
//Se exporta el middleware y los secretos para que puedan ser utilizados en otras partes de la aplicación
module.exports = { authenticateJWT, accessTokenSecret, refreshTokenSecret };
