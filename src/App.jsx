import { useState } from "react";
import { useWeather } from "./hooks/useWeather";
import { sanitizeString } from "./utils/validators";

export default function App() {
  const [city, setCity] = useState("GRAND PRAIRIE");
  const { loading, error, result, suggestions, searchTemperature } = useWeather();

  function formatSuggestion(place) {
    const parts = [place.name, place.admin1, place.country].filter(Boolean).map(sanitizeString);
    return parts.join(", ");
  }

  function handleSuggestionClick(place) {
    const suggestedText = formatSuggestion(place);
    setCity(suggestedText);
    searchTemperature(suggestedText);
  }

  function handleInputChange(event) {
    const value = event.target.value;
    // Limitar a 100 caracteres en el input directamente
    if (value.length <= 100) {
      setCity(value);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    searchTemperature(city);
  }

  return (
    <main className="page">
      <section className="card">
        <h1>Clima por ciudad</h1>
        <p className="subtitle">Ingresa una ciudad, por ejemplo: GRAND PRAIRIE</p>

        <form className="form" onSubmit={handleSubmit}>
          <input
            value={city}
            onChange={handleInputChange}
            placeholder="Ciudad y país"
            aria-label="Ciudad y país"
            maxLength="100"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Consultando..." : "Consultar"}
          </button>
        </form>

        {error && <p className="error">{sanitizeString(error)}</p>}

        {suggestions.length > 0 && (
          <section className="suggestions" aria-label="Sugerencias de ciudad">
            <p className="suggestions-title">Quisiste decir:</p>
            <div className="suggestions-list">
              {suggestions.map((place) => {
                const label = formatSuggestion(place);
                const key = `${place.id || ""}-${place.latitude}-${place.longitude}`;
                return (
                  <button
                    key={key}
                    type="button"
                    className="suggestion-chip"
                    onClick={() => handleSuggestionClick(place)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {result && (
          <article className="result">
            <h2>
              {sanitizeString(result.city)}, {sanitizeString(result.country)}
            </h2>
            <p>Temperatura actual: {result.temperature.toFixed(1)} °C</p>
            <p>Condición: {sanitizeString(result.description)}</p>
          </article>
        )}
      </section>
    </main>
  );
}
