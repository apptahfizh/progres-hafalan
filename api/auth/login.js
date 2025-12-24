document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  if (!form) {
    console.error("Form login tidak ditemukan");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login gagal");
        return;
      }

      // SIMPAN TOKEN (KRITIS)
      localStorage.setItem("token", data.token);

      // REDIRECT (KRITIS)
      window.location.href = "/dashboard.html";
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat login");
    }
  });
});
