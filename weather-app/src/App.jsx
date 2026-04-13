import { useState } from "react";
import { useWeather } from "./hooks/useWeather";

export default function App() {
  const [city, setCity] = useState("GRAND PRAIRIE CANADA");
  const { loading, error, result, searchTemperature } = useWeather();

  function handleSubmit(event) {
    event.preventDefault();
    if (!city.trim()) {
      return;
    }
    searchTemperature(city.trim());
  }

  return (
    <main className="page">
      <section className="card">
        <h1>Clima por ciudad</h1>
        <p className="subtitle">Ingresa una ciudad, por ejemplo: GRAND PRAIRIE CANADA</p>

        <form className="form" onSubmit={handleSubmit}>
          <input
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="Ciudad y país"
            aria-label="Ciudad y país"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Consultando..." : "Consultar"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {result && (
          <article className="result">
            <h2>
              {result.city}, {result.country}
            </h2>
            <p>Temperatura actual: {result.temperature} °C</p>
          </article>
        )}
      </section>
    </main>
  );
}
