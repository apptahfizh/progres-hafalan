import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev-secret";

export default function auth(allowedRoles = []) {
  return (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized" });
      return false;
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, SECRET);

      if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
        res.status(403).json({ message: "Forbidden" });
        return false;
      }

      req.user = decoded;
      return true;
    } catch (err) {
      res.status(401).json({ message: "Unauthorized" });
      return false;
    }
  };
}
