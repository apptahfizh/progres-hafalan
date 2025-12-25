console.log("LOGIN.JS LOADED");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  if (!form) {
    console.error("LOGIN FORM NOT FOUND");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // ⛔ PENTING: STOP RELOAD

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log("SUBMIT LOGIN:", username);

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

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    console.log("LOGIN SUCCESS → REDIRECT DASHBOARD");

    window.location.href = "/dashboard.html";
  });
});
