// ================================
// AUTH + ROLE GUARD (FINAL FIX)
// ================================
(function authGuard() {
  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");

  // Jika di halaman login, JANGAN guard
  if (window.location.pathname.endsWith("/login.html")) {
    return;
  }

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

  const role = user.role;
  const page = window.location.pathname.split("/").pop();

  const roleAccess = {
    "dashboard.html": ["ortu"],
    "hafalan.html": ["ortu"],
    "admin.html": ["admin"],
    "ustadz.html": ["ustadz"],
  };

  if (roleAccess[page] && !roleAccess[page].includes(role)) {
    alert("Akses ditolak");
    window.location.href = "/login.html";
  }
})();
