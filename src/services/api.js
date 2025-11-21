export const API_KEY = "bmbry-7b7a0f5e-4828-4455-bcb9-d8932ce0f4f8";

// Default to "/api" so local dev uses the Vite proxy and prod uses the CF path.
const API_BASE = import.meta.env.VITE_API_BASE || "/api";

export async function solveRequest(body) {
  const response = await fetch(`${API_BASE}/solve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Erro ao chamar a API: " + response.status);
  }

  return response.json();
}
