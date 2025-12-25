// ================================
// AUTH GUARD DEBUG FINAL
// ================================
(function authGuard() {
  console.log("AUTH GUARD RUNNING ON:", window.location.pathname);

  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");

  console.log("TOKEN:", token);
  console.log("USER RAW:", userRaw);

  // Jangan guard halaman login
  if (window.location.pathname.endsWith("login.html")) {
    console.log("AUTH GUARD SKIPPED (LOGIN PAGE)");
    return;
  }

  if (!token || !userRaw) {
    console.log("NO TOKEN OR USER → REDIRECT LOGIN");
    window.location.href = "/login.html";
    return;
  }

  let user;
  try {
    user = JSON.parse(userRaw);
  } catch (e) {
    console.log("USER JSON INVALID → CLEAR & REDIRECT");
    localStorage.clear();
    window.location.href = "/login.html";
    return;
  }

  const role = user.role;
  const page = window.location.pathname.split("/").pop();

  console.log("ROLE:", role);
  console.log("PAGE:", page);

  const roleAccess = {
    "dashboard.html": ["ortu"],
    "hafalan.html": ["ortu"],
    "admin.html": ["admin"],
    "ustadz.html": ["ustadz"],
  };

  if (roleAccess[page] && !roleAccess[page].includes(role)) {
    console.log("ROLE NOT ALLOWED → REDIRECT");
    window.location.href = "/login.html";
  } else {
    console.log("ACCESS GRANTED");
  }
})();
