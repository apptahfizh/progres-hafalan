const auth = require("../_middlewares/auth");

module.exports = async (req, res) => {
  // Jalankan middleware auth (khusus ORTU)
  const allowed = auth(["ortu"])(req, res);
  if (allowed !== true) return;

  // Jika lolos auth
  return res.json({
    message: "Data hafalan ORTU",
    user: req.user,
    data: [
      {
        surah: "Al-Baqarah",
        ayat: "1-5",
        status: "Lancar",
      },
    ],
  });
};
