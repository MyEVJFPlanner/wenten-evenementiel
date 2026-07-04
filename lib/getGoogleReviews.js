// La Réunion center coords — bias the search
const REUNION_LAT = -21.1151;
const REUNION_LNG = 55.5364;
const BASE = "https://maps.googleapis.com/maps/api/place";

// Tries multiple query strategies to find the Place ID
async function fetchFreshPlaceId(apiKey) {
  const queries = [
    "Wenten Evenementiel Reunion",
    "Wenten Événementiel Réunion",
    "Wenten Evenementiel",
  ];

  for (const q of queries) {
    // textsearch with location bias (more lenient than findplacefromtext)
    const url = `${BASE}/textsearch/json?query=${encodeURIComponent(q)}&location=${REUNION_LAT},${REUNION_LNG}&radius=50000&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.status === "OK" && data.results?.[0]?.place_id) {
      return data.results[0].place_id;
    }
  }

  throw new Error("Aucun résultat Places pour Wenten Événementiel Réunion");
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
