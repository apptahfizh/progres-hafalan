export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  if (username === "ortu1" && password === "123456") {
    return res.status(200).json({
      token: "DUMMY_TOKEN",
      user: { username, role: "ortu" },
    });
  }

  res.status(401).json({ message: "Login gagal" });
}
