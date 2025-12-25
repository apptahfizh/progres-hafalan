console.log("LOGIN.JS LOADED");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  if (!form) {
    console.error("LOGIN FORM NOT FOUND");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // ⛔ Cegah reload browser

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log("SUBMIT LOGIN:", username);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (!res.ok) {
        alert(data.message || "Login gagal");
        return;
      }

      // 🔴 WAJIB — INI YANG SEBELUMNYA TIDAK TERJALAN
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("LOGIN SUCCESS → REDIRECT DASHBOARD");
      window.location.href = "/dashboard.html";
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      alert("Server error");
    }
  });
});
