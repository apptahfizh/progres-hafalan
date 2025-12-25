console.log("LOGIN.JS LOADED");

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // ⬅️ INI KUNCI NYAWA

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
