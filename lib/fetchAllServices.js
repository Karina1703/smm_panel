import API_URL from "@lib/apiUrl";

export async function fetchAllServices() {
  const res = await fetch(`${API_URL}/api/services`, {
    next: { revalidate: 10 },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}
