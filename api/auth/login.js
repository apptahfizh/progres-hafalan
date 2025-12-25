import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev-secret";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  // USER DUMMY (SIMULASI DB)
  if (username !== "ortu1" || password !== "123456") {
    return res.status(401).json({ message: "Username atau password salah" });
  }

  const user = {
    id: 1,
    username: "ortu1",
    role: "ortu",
  };

  const token = jwt.sign(user, SECRET, { expiresIn: "1h" });

  return res.status(200).json({
    token,
    user,
  });
}
