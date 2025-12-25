console.log("DASHBOARD.JS LOADED");

import { apiFetch } from "./api.js";

async function loadDashboard() {
  try {
    console.log("LOAD DASHBOARD DATA");

    const res = await apiFetch("/api/hafalan");

    // res di sini adalah Response, BUKAN JSON
    const data = await res.json();

    console.log("DASHBOARD DATA:", data);

    const container = document.getElementById("hafalanList");

    if (!data || !data.data || data.data.length === 0) {
      container.innerHTML = "<p>Tidak ada data hafalan</p>";
      return;
    }

    container.innerHTML = data.data
      .map(
        (item) => `
        <div>
          <strong>${item.surah}</strong><br />
          Ayat: ${item.ayat}<br />
          Status: ${item.status}
        </div>
        <hr />
      `
      )
      .join("");
  } catch (err) {
    console.error("DASHBOARD ERROR:", err);
    // JANGAN redirect di sini
    // redirect sudah ditangani apiFetch
  }
}

// JALANKAN
loadDashboard();
