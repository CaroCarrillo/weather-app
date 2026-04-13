const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export async function geocodeCity(query) {
  const url = `${GEOCODING_URL}?name=${encodeURIComponent(query)}&count=5&language=es&format=json`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("No se pudo buscar la ciudad.");
  }

  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("No se encontraron resultados para esa ciudad.");
  }

  return data.results[0];
}

export async function getCurrentTemperature(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m",
    timezone: "auto",
  });

  const res = await fetch(`${FORECAST_URL}?${params.toString()}`);
  if (!res.ok) {
    throw new Error("No se pudo obtener la temperatura.");
  }

  const data = await res.json();
  return data.current.temperature_2m;
}
