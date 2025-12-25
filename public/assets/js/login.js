console.log("LOGIN.JS LOADED");
console.log("USER DARI BACKEND:", data.user);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // 🔴 INI KUNCI UTAMA

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login gagal");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    console.log("LOGIN SUCCESS, REDIRECTING");

    window.location.href = "/dashboard.html";
  });
});
