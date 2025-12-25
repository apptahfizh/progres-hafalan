const auth = require("../_middlewares/auth");

module.exports = (req, res) => {
  if (auth(["admin"])(req, res) !== true) return;

  res.status(200).json({
    message: "Admin stats",
    totalUsers: 10,
  });
};
