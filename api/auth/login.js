const usersModule = require("../_utils/users");
const jwtModule = require("../_utils/jwt");

async function parseJSON(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch {
        reject();
      }
    });
  });
}

module.exports = async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    if (!usersModule.users) {
      return res.status(500).json({
        message: "Users module error",
      });
    }

    const data = await parseJSON(req);
    const { username, password } = data;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username dan password wajib diisi",
      });
    }

    const user = usersModule.users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return res.status(401).json({
        message: "Login gagal",
      });
    }

    const token = jwtModule.generateToken({
      id: user.id,
      role: user.role,
      name: user.name,
    });

    return res.status(200).json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));

window.location.href = "dashboard.html";
