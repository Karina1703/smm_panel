import API_URL from "@lib/apiUrl";

export async function getReviews() {
  const response = await fetch(`${API_URL}/api/admin/reviews`, {
    next: { revalidate: 10 },
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await response.json();

  return res;
}
