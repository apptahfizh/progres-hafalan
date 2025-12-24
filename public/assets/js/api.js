async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    alert("Sesi habis, silakan login ulang");
    localStorage.clear();
    window.location.href = "/login.html";
    return;
  }

  return res.json();
}
