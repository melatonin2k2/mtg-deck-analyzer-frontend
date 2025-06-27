
import React, { useState } from "react";

function App() {
  const [decklist, setDecklist] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/analyze-deck`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decklist }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Unknown error");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Failed to fetch analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>MTG Deck Analyzer</h1>
      <textarea
        rows="12"
        cols="50"
        value={decklist}
        onChange={(e) => setDecklist(e.target.value)}
        placeholder="Paste your decklist here..."
      />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Deck"}
      </button>

      {error && <div style={{ color: "red", marginTop: "1rem" }}>Error: {error}</div>}

      {result && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Archetype: {result.archetype}</h2>
          <p>{result.recommendations}</p>
          <h3>Synergies:</h3>
          <ul>{result.synergies?.map((s, i) => <li key={i}>{s}</li>)}</ul>
          <h3>Card Roles:</h3>
          <ul>
            {Object.entries(result.cardRoles || {}).map(([card, roles]) => (
              <li key={card}>
                <strong>{card}</strong>: {roles.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
