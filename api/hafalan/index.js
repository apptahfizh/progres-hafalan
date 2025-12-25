const auth = require("../_middlewares/auth");
const db = require("../_utils/db");

module.exports = async (req, res) => {
  // Auth ORTU
  const allowed = auth(["ortu"])(req, res);
  if (allowed !== true) return;

  try {
    const userId = req.user.id;

    const { rows } = await db.query(
      `
      SELECT
        id,
        tanggal,
        surah,
        mulai_setor_ayat,
        selesai_setor_ayat,
        ayat_setor,
        ayat_hafal,
        keterangan
      FROM hafalan
      WHERE user_id = $1
      ORDER BY tanggal DESC
      `,
      [userId]
    );

    return res.json({
      message: "Data hafalan ORTU",
      data: rows,
    });
  } catch (err) {
    console.error("HAFALAN DB ERROR:", err);
    return res.status(500).json({
      message: "Gagal mengambil data hafalan",
    });
  }
};
