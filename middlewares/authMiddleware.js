const verifyToken = require("../middlewares/validate-token");
const verifyExcloudesRoutes = require("./excloudesRoutes");

function authenticateMiddleware(req, res, next) {
  try {
    const isExcludedRoute = verifyExcloudesRoutes(req);
    if (isExcludedRoute) {
      return next();
    }
    const isUserAuthenticated = verifyToken(req, res, next);

    // If the token is invalid, deny the request
    if (!isUserAuthenticated) {
      res.status(401).send({ error: "Access denied" });
      // return { error: "Access denied" };
    }

    // If the token is valid, continue with the request
    return next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
    // return { error: "Internal server error" };
  }
}

module.exports = authenticateMiddleware;
