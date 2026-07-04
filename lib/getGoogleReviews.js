const BASE = "https://maps.googleapis.com/maps/api/place";

// Centre de La Réunion
const LAT = -21.1151;
const LNG = 55.5364;

async function fetchPlaceId(apiKey) {
  // 1. nearbysearch keyword "wenten" — fonctionnel d'après diagnostic
  const nearby = await fetch(
    `${BASE}/nearbysearch/json?location=${LAT},${LNG}&radius=100000&keyword=wenten&key=${apiKey}`
  );
  const nearbyData = await nearby.json();
  if (nearbyData.status === "OK" && nearbyData.results?.[0]?.place_id) {
    return nearbyData.results[0].place_id;
  }

  // 2. textsearch fallback avec termes courts
  for (const q of ["Wenten", "Wenten evenementiel"]) {
    const ts = await fetch(`${BASE}/textsearch/json?query=${encodeURIComponent(q)}&key=${apiKey}`);
    const tsData = await ts.json();
    if (tsData.status === "OK" && tsData.results?.[0]?.place_id) {
      return tsData.results[0].place_id;
    }
  }

  throw new Error("Wenten introuvable via nearbysearch et textsearch");
}

async function fetchReviews(apiKey, placeId) {
  const url = `${BASE}/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&language=fr&reviews_sort=most_relevant&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== "OK" || !data.result) {
    throw new Error(`Place Details failed: ${data.status}`);
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

export async function getGoogleReviews(apiKey) {
  const placeId = await fetchPlaceId(apiKey);
  return fetchReviews(apiKey, placeId);
}
