const BASE_NEW = "https://places.googleapis.com/v1/places";
const BASE_LEGACY = "https://maps.googleapis.com/maps/api/place";

// ── Places API (New) — searchText ────────────────────────────────────────────
async function fetchPlaceIdNew(apiKey) {
  const res = await fetch(`${BASE_NEW}:searchText`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id,places.displayName,places.rating,places.userRatingCount",
    },
    body: JSON.stringify({
      textQuery: "Wenten Evenementiel Reunion La Reunion",
      languageCode: "fr",
      locationBias: {
        circle: {
          center: { latitude: -21.1151, longitude: 55.5364 },
          radius: 50000,
        },
      },
    }),
  });
  const data = await res.json();
  if (data.places?.[0]?.id) return { placeId: data.places[0].id, api: "new" };
  return null;
}

// ── Places API (New) — getPlace reviews ─────────────────────────────────────
async function fetchReviewsNew(apiKey, placeId) {
  const res = await fetch(`${BASE_NEW}/${placeId}`, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "id,displayName,rating,userRatingCount,reviews",
    },
  });
  const data = await res.json();
  if (!data.id) throw new Error(`Places API (New) getPlace failed: ${JSON.stringify(data)}`);

  const reviews = (data.reviews || [])
    .filter((r) => r.rating >= 4)
    .slice(0, 5)
    .map((r) => ({
      author_name: r.authorAttribution?.displayName || "Anonyme",
      profile_photo_url: r.authorAttribution?.photoUri || null,
      rating: r.rating,
      relative_time_description: r.relativePublishTimeDescription || "",
      text: r.text?.text || "",
    }));

  return {
    placeId,
    rating: data.rating ?? null,
    total: data.userRatingCount ?? 0,
    reviews,
  };
}

// ── Places API (Legacy) — textsearch fallback ────────────────────────────────
async function fetchPlaceIdLegacy(apiKey) {
  const queries = ["Wenten Evenementiel", "Wenten evenementiel reunion"];
  for (const q of queries) {
    const url = `${BASE_LEGACY}/textsearch/json?query=${encodeURIComponent(q)}&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.status === "OK" && data.results?.[0]?.place_id) {
      return data.results[0].place_id;
    }
  }
  return null;
}

async function fetchReviewsLegacy(apiKey, placeId) {
  const url = `${BASE_LEGACY}/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&language=fr&reviews_sort=most_relevant&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== "OK" || !data.result) {
    throw new Error(`Legacy Place Details failed: ${data.status}`);
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

// ── Public export ─────────────────────────────────────────────────────────────
export async function getGoogleReviews(apiKey) {
  // Try Places API (New) first
  try {
    const found = await fetchPlaceIdNew(apiKey);
    if (found) {
      const data = await fetchReviewsNew(apiKey, found.placeId);
      return data;
    }
  } catch {
    // fall through to legacy
  }

  // Fallback: legacy Places API
  const legacyId = await fetchPlaceIdLegacy(apiKey);
  if (!legacyId) throw new Error("Business introuvable via Places API (new) et legacy");
  return fetchReviewsLegacy(apiKey, legacyId);
}
