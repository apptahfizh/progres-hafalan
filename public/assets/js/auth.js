// AUTH GUARD GLOBAL

(function () {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login.html";
  }
})();
