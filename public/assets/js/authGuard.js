// ================================
// AUTH + ROLE GUARD (SAFE)
// ================================
(function authGuard() {
  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");

  if (!token || !userRaw) {
    window.location.href = "/login.html";
    return;
  }

  let user;
  try {
    user = JSON.parse(userRaw);
  } catch {
    localStorage.clear();
    window.location.href = "/login.html";
    return;
  }

  // 🔴 FIX UTAMA
  const role = user.role || user.type || user.level;

  if (!role) {
    console.error("ROLE TIDAK DITEMUKAN DI USER:", user);
    localStorage.clear();
    window.location.href = "/login.html";
    return;
  }

  const path = window.location.pathname;

  const roleAccess = {
    "/dashboard.html": ["ortu"],
    "/hafalan.html": ["ortu"],
  };

  if (roleAccess[path] && !roleAccess[path].includes(role)) {
    alert("Akses ditolak");
    window.location.href = "/login.html";
  }
})();
