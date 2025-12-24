apiFetch("/api/hafalan").then((data) => {
  console.log("Data hafalan:", data);
});

document.getElementById("btnLogout")?.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/login.html";
});
