const PLACE_ID = "ChIJK-OeryiCGBgRAnfIiBO0ae4";

export default async function handler(req, res) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GOOGLE_PLACES_API_KEY non définie" });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,user_ratings_total,reviews&language=fr&reviews_sort=most_relevant&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      return res.status(502).json({ error: data.status, detail: data.error_message });
    }

    const result = data.result || {};
    const reviews = (result.reviews || [])
      .filter((r) => r.rating >= 4)
      .slice(0, 5);

    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=3600");
    return res.status(200).json({
      rating: result.rating ?? null,
      total: result.user_ratings_total ?? 0,
      reviews,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
