const findUser = require("../services/CosmotologistService");

async function permissionMiddleware(req, res, next) {
  try {
    const user = await findUser.handlePermissons(req);
//aqui debe de ser doble validacion por rol y por permisom tambien añadir que cuando sea
//rol admin dejaer hacer todas las acciones
    switch (req.method) {
      case "GET":
        if (user.permissons.read) {
          return next();
        } else {
          res.status(403).send({ message: "No puedes realizar esta acción" });
          // return { message: "No puedes realizar esta acción" };
        }
        break;
      case "POST":
      case "PATCH":
      case "PUT":
        if (user.permissons.edit) {
          return next();
        } else {
          res.status(403).send({ message: "No puedes realizar esta acción" });
        }
        break;
      case "DELETE":
        if (user.permissons.delete) {
          return next();
        } else {
          res.status(403).send({ message: "No puedes realizar esta acción" });
        }
        break;
      default:
        res.status(405).send({ message: "Método no permitido" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
}

module.exports = permissionMiddleware;
