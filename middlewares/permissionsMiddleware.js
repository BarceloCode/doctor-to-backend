const findUser = require("../services/CosmotologistService");
const { excloudedRoutes } = require("./excloudedroutes");


async function permissionMiddleware(req, res, next) {
  try {
    if (excloudedRoutes.includes(req.path)) {
      return next();
    }
    const user = await findUser.handlePermissions(req, res);
    if (!user) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    //aqui debe de ser doble validacion por rol y por permisom tambien añadir que cuando sea
    //rol admin dejaer hacer todas las acciones
    const role = user.permissions.role;
    if (role === "administrator") {
      return next();
    }

    switch (req.method) {
      case "GET":
        if (user.permissions.read) {
          return next();
        } else {
          res.status(403).send({ message: "you do not have permissions" });
        }
        break;
      case "POST":
      case "PATCH":
      case "PUT":
        if (user.permissions.edit) {
          return next();
        } else {
          res.status(403).send({ message: "you do not have permissions" });
        }
        break;
      case "DELETE":
        if (user.permissions.delete) {
          return next();
        } else {
          res.status(403).send({ message: "you do not have permissions" });
        }
        break;
      default:
        res.status(405).send({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    return {
      message: "Error in the server, can not process your request",
      error: error.message,
    };
  }
}

module.exports = permissionMiddleware;
