function veryfyExcloudesRoutes(req, res, next) {
  const excloudesRoutes = [
    "/login",
    "/logout",
    "/create",
  ];
  try {
    const path = req.path;
    if (excloudesRoutes.includes(path)) {
      return next();
    }
    return res.status(401).send({ message: "No puedes realizar esta acción" });
  } catch (error) {
    return res.status(401).send({ message: "No puedes realizar esta acción" });
  }
}
module.exports = veryfyExcloudesRoutes;
