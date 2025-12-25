// ================================
// AUTH MIDDLEWARE (JWT + ROLE)
// ================================
const { verifyToken } = require("../_utils/jwt");

function auth(allowedRoles = []) {
  return function (req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    let payload;
    try {
      payload = verifyToken(token);
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(payload.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // inject user info
    req.user = payload;

    return true;
  };
}

module.exports = auth;
