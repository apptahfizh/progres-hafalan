console.log("LOGIN.JS LOADED");

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // ⛔ STOP reload default browser

    console.log("LOGIN SUBMIT TRIGGERED");

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

    console.log("TOKEN SAVED:", localStorage.getItem("token"));
    console.log("USER SAVED:", localStorage.getItem("user"));
    console.log("LOGIN SUCCESS, REDIRECTING");

    window.location.href = "/dashboard.html";
  });
