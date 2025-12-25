const jwt = require("jsonwebtoken");

module.exports = (roles = []) => {
  return (req, res) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized" });
        return false;
      }

      const token = authHeader.split(" ")[1];

      if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return false;
      }

      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        res.status(401).json({ message: "Unauthorized" });
        return false;
      }

      if (roles.length && !roles.includes(decoded.role)) {
        res.status(403).json({ message: "Akses ditolak" });
        return false;
      }

      req.user = decoded;
      return true;
    } catch (err) {
      console.error("AUTH MIDDLEWARE ERROR:", err);
      res.status(401).json({ message: "Unauthorized" });
      return false;
    }
  };
};
