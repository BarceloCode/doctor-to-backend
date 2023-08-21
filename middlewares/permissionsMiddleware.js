const findUser = require("../services/CosmotologistService");

async function permissionMiddleware(req, res, next) {
  try {
    const user = await findUser.handlePermissions(req);
//aqui debe de ser doble validacion por rol y por permisom tambien añadir que cuando sea
//rol admin dejaer hacer todas las acciones
console.log(user, "USER");
if (user.permissions.role === 'administrator'){
  return next();
}
    switch (req.method) {
      case "GET":
        if (user.permissions.read || user.permissions.role === 'cosmetologist') {
          return next();
        } else {
          res.status(403).send({ message: "you don not have permissions" });
        }
        break;
      case "POST":
      case "PATCH":
      case "PUT":
        if (user.permissions.edit || user.permissions.role === 'cosmetologist') {
          return next();
        } else {
          res.status(403).send({ message: "you don not have permissions" });
        }
        break;
      case "DELETE":
        if (user.permissions.delete) {
          return next();
        } else {
          res.status(403).send({ message: "you don not have permissions" });
        }
        break;
      default:
        res.status(405).send({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error in the server, can not process your request" , error: error.message });
  }
}

module.exports = permissionMiddleware;
