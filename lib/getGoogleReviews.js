const SEARCH_QUERY = "Wenten Événementiel Réunion";
const BASE = "https://maps.googleapis.com/maps/api/place";

async function fetchFreshPlaceId(apiKey) {
  const url = `${BASE}/findplacefromtext/json?input=${encodeURIComponent(SEARCH_QUERY)}&inputtype=textquery&fields=place_id&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== "OK" || !data.candidates?.[0]?.place_id) {
    throw new Error(`Text Search failed: ${data.status} — ${data.error_message || ""}`);
  }
  return data.candidates[0].place_id;
}

export async function getGoogleReviews(apiKey) {
  const placeId = await fetchFreshPlaceId(apiKey);

  const url = `${BASE}/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&language=fr&reviews_sort=most_relevant&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.status !== "OK" || !data.result) {
    throw new Error(`Place Details failed: ${data.status} — ${data.error_message || ""}`);
  }

  const result = data.result;
  const reviews = (result.reviews || [])
    .filter((r) => r.rating >= 4)
    .slice(0, 5);

  return {
    placeId,
    rating: result.rating ?? null,
    total: result.user_ratings_total ?? 0,
    reviews,
  };
}
