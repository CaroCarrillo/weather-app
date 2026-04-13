import { useState } from "react";
import { geocodeCity, getCurrentTemperature } from "../services/openMeteoApi";

export function useWeather() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function searchTemperature(cityQuery) {
    setLoading(true);
    setError("");

    try {
      const place = await geocodeCity(cityQuery);
      const temperature = await getCurrentTemperature(place.latitude, place.longitude);

      setResult({
        city: place.name,
        country: place.country || "",
        temperature,
      });
    } catch (err) {
      setResult(null);
      setError(err.message || "Error inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, result, searchTemperature };
}
