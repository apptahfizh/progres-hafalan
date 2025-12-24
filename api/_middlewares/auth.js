const { verifyToken } = require("../_utils/jwt");

module.exports = function auth(requiredRoles = []) {
  return (req, res) => {
    try {
      const authHeader = req.headers.authorization || "";
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : null;

      if (!token) {
        return res.status(401).json({
          message: "Token tidak ditemukan",
        });
      }

      const payload = verifyToken(token);
      if (!payload) {
        return res.status(401).json({
          message: "Token tidak valid atau expired",
        });
      }

      // Cek role jika ditentukan
      if (requiredRoles.length > 0 && !requiredRoles.includes(payload.role)) {
        return res.status(403).json({
          message: "Akses ditolak",
        });
      }

      // Inject user ke request
      req.user = payload;

      return true; // lanjut ke handler
    } catch (err) {
      return res.status(500).json({
        message: "Auth middleware error",
      });
    }
  };
};
