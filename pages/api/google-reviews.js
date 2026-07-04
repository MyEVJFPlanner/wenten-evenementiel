import { getGoogleReviews } from "../../lib/getGoogleReviews";

export default async function handler(req, res) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GOOGLE_PLACES_API_KEY non définie" });
  }

  // ?debug=1 → retourne les réponses brutes de chaque tentative
  if (req.query.debug === "1") {
    const results = {};

    // Test 1 : Places API (New) searchText
    try {
      const r = await fetch("https://places.googleapis.com/v1/places:searchText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "places.id,places.displayName",
        },
        body: JSON.stringify({ textQuery: "Wenten Evenementiel Reunion", languageCode: "fr" }),
      });
      results.placesApiNew = await r.json();
    } catch (e) { results.placesApiNew = { error: e.message }; }

    // Test 2 : Legacy textsearch
    try {
      const r = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=Wenten+Evenementiel&key=${apiKey}`);
      results.legacyTextsearch = await r.json();
    } catch (e) { results.legacyTextsearch = { error: e.message }; }

    // Test 3 : nearbysearch keyword "wenten" toute la Réunion
    try {
      const r = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-21.1151,55.5364&radius=100000&keyword=wenten&key=${apiKey}`);
      const d = await r.json();
      results.nearbyWenten = {
        status: d.status,
        count: d.results?.length,
        results: d.results?.slice(0, 5).map(p => ({ name: p.name, place_id: p.place_id, rating: p.rating, user_ratings_total: p.user_ratings_total, vicinity: p.vicinity })),
      };
    } catch (e) { results.nearbyWenten = { error: e.message }; }

    return res.status(200).json(results);
  }

  try {
    const data = await getGoogleReviews(apiKey);
    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=3600");
    return res.status(200).json(data);
  } catch (err) {
    return res.status(502).json({ error: err.message });
  }
}
