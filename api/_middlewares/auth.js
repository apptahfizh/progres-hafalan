const jwt = require("jsonwebtoken");

module.exports = (roles = []) => {
  return (req, res) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        res.status(401).json({ message: "No token provided" });
        return false;
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (roles.length && !roles.includes(decoded.role)) {
        res.status(403).json({ message: "Access denied" });
        return false;
      }

      req.user = decoded;
      return true;
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
      return false;
    }
  };
};
