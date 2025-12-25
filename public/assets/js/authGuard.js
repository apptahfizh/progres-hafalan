// ================================
// AUTH + ROLE GUARD (FINAL SAFE)
// ================================
(function authGuard() {
  const path = window.location.pathname;

  // ⛔ JANGAN PERNAH JALANKAN GUARD DI LOGIN PAGE
  if (path === "/login.html" || path === "/") {
    console.log("AUTH GUARD SKIPPED ON LOGIN PAGE");
    return;
  }

  console.log("AUTH GUARD RUNNING ON:", path);

  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");

  if (!token || !userRaw) {
    console.warn("NO TOKEN / USER → REDIRECT LOGIN");
    window.location.href = "/login.html";
    return;
  }

  let user;
  try {
    user = JSON.parse(userRaw);
  } catch (e) {
    console.error("USER PARSE ERROR", e);
    localStorage.clear();
    window.location.href = "/login.html";
    return;
  }

  const role = user.role;

  const roleAccess = {
    "/dashboard.html": ["ortu"],
    "/hafalan.html": ["ortu"],
    "/admin.html": ["admin"],
    "/ustadz.html": ["ustadz"],
  };

  if (roleAccess[path] && !roleAccess[path].includes(role)) {
    alert("Akses ditolak");
    window.location.href = "/login.html";
    return;
  }

  console.log("AUTH GUARD PASS:", role);
})();
