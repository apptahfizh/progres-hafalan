console.log("LOGIN.JS LOADED");

// AMBIL FORM
const form = document.getElementById("loginForm");

// HUBUNGKAN EVENT SUBMIT
form.addEventListener("submit", async function (e) {
  e.preventDefault(); // WAJIB

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  console.log("LOGIN SUBMIT CLICKED");

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

  // SIMPAN TOKEN & USER
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  console.log("LOGIN SUCCESS, REDIRECTING");

  // REDIRECT
  window.location.href = "/dashboard.html";
});
