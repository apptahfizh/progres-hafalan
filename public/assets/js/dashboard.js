console.log("DASHBOARD.JS LOADED");

document.addEventListener("DOMContentLoaded", loadDashboard);

async function loadDashboard() {
  const container = document.getElementById("hafalanList");

  try {
    const data = await apiFetch("/api/hafalan");

    if (!data || !data.data) {
      container.innerHTML = "<p>Tidak ada data</p>";
      return;
    }

    container.innerHTML = `
      <ul>
        ${data.data
          .map(
            (item) => `<li>${item.surah} (${item.ayat}) - ${item.status}</li>`
          )
          .join("")}
      </ul>
    `;
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Gagal memuat data</p>";
  }
}
