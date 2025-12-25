console.log("API.JS LOADED");

// helper fetch dengan token otomatis
export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  // JIKA TOKEN INVALID / EXPIRED
  if (res.status === 401) {
    console.warn("API 401 → LOGOUT");

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login.html";

    // HENTIKAN eksekusi file pemanggil
    throw new Error("Unauthorized");
  }

  // KEMBALIKAN RESPONSE UTUH
  return res;
}
