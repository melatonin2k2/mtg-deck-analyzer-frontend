// frontend/src/App.js (example)

import React, { useState } from "react";

export default function App() {
  const [decklist, setDecklist] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function submitDeck() {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const response = await fetch("/api/analyze-deck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decklist }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Unknown error");
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <h1>MTG Deck Analyzer</h1>
      <textarea
        rows={15}
        placeholder="Paste your decklist here"
        value={decklist}
        onChange={(e) => setDecklist(e.target.value)}
      />
      <br />
      <button onClick={submitDeck} disabled={loading || !decklist.trim()}>
        {loading ? "Analyzing..." : "Analyze Deck"}
      </button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {analysis && (
        <div className="analysis-results">
          <h2>Deck Analysis</h2>
          <p><strong>Archetype:</strong> {analysis.archetype}</p>
          <p><strong>Mana Curve:</strong></p>
          <ul>
            {Object.entries(analysis.manaCurve).map(([cmc, count]) => (
              <li key={cmc}>CMC {cmc}: {count}</li>
            ))}
          </ul>
          <p><strong>Win Conditions:</strong> {analysis.winConditions.length > 0 ? analysis.winConditions.join(", ") : "None detected"}</p>
          <p><strong>Favorable Matchups:</strong> {analysis.favorable.join(", ") || "None detected"}</p>
          <p><strong>Challenging Matchups:</strong> {analysis.challenging.join(", ") || "None detected"}</p>
          <p><strong>Recommendations:</strong><br />{analysis.recommendations}</p>
        </div>
      )}
    </div>
  );
}
