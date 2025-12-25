console.log("DASHBOARD.JS LOADED");

document.addEventListener("DOMContentLoaded", () => {
  console.log("LOAD DASHBOARD DATA");
  loadDashboard();
});

async function loadDashboard() {
  try {
    const data = await apiFetch("/api/hafalan");

    const el = document.getElementById("hafalanList");
    el.innerHTML = JSON.stringify(data, null, 2);
  } catch (err) {
    console.error("DASHBOARD ERROR:", err);
  }
}
