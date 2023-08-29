const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });
const { excloudedRoutes } = require("./excloudedroutes");

const verifyToken = (req, res, next) => {
  if (excloudedRoutes.includes(req.path)) {
    return next();
  }

  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ error: "Expired credentials or not valid token" });
  }
};

module.exports = verifyToken;
