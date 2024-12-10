import API_URL from "@lib/apiUrl";

export async function getLiveChechkout(type) {
  const response = await fetch(
    `${API_URL}/api/admin/live-checkout?key=${process.env.SECRET_KEY}`,
    {
      next: { revalidate: 10 },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const res = await response.json();

  return res.count;
}
