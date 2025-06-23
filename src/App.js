// src/App.js
import React, { useState } from "react";
import "./App.css";

function App() {
  const [decklist, setDecklist] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const res = await fetch("https://mtg-deck-analyzer-backend.onrender.com/api/analyze-deck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ decklist }),
      });

      if (!res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Unexpected server error.");
        } else {
          const text = await res.text();
          throw new Error("Server returned non-JSON response:\n" + text.slice(0, 100));
        }
      }

      const data = await res.json();
      setAnalysis(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>MTG Deck Analyzer</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Paste your decklist here..."
          rows={12}
          value={decklist}
          onChange={(e) => setDecklist(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Deck"}
        </button>
      </form>

      {error && <div className="error">Error: {error}</div>}

      {analysis && (
        <div className="results">
          <h2>Matchup Analysis</h2>
          <p><strong>Archetype:</strong> {analysis.archetype}</p>
          <p><strong>Favorable Matchups:</strong> {analysis.favorable?.join(", ") || "N/A"}</p>
          <p><strong>Challenging Matchups:</strong> {analysis.challenging?.join(", ") || "N/A"}</p>
          <p><strong>Win Conditions:</strong> {analysis.winConditions?.join(", ") || "N/A"}</p>
          <h3>Mana Curve</h3>
          <ul>
            {analysis.manaCurve &&
              Object.entries(analysis.manaCurve).map(([cmc, count]) => (
                <li key={cmc}>CMC {cmc}: {count} cards</li>
              ))}
          </ul>
          <h3>Recommendations</h3>
          <pre>{analysis.recommendations}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
