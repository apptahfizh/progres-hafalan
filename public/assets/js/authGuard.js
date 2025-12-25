// ================================
// AUTH + ROLE GUARD (GLOBAL)
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

  const role = user.role;
  const path = window.location.pathname;

  const roleAccess = {
    "/dashboard.html": ["ortu"],
    "/hafalan.html": ["ortu"],
    "/admin.html": ["admin"],
    "/ustadz.html": ["ustadz"],
  };

  if (roleAccess[path] && !roleAccess[path].includes(role)) {
    alert("Akses ditolak");
    window.location.href = "/login.html";
  }
})();
