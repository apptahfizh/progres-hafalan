console.log("API.JS LOADED");

async function apiFetch(url, options = {}) {
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

  if (res.status === 401) {
    console.warn("API 401 → LOGOUT");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login.html";
    throw new Error("Unauthorized");
  }

  return res.json();
}
