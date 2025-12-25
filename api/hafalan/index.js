import auth from "../_middlewares/auth.js";

export default async function handler(req, res) {
  const allowed = auth(["ortu"])(req, res);
  if (allowed !== true) return;

  return res.json({
    data: [{ surah: "Al-Baqarah", ayat: "1-5", status: "Lancar" }],
    user: req.user,
  });
}
