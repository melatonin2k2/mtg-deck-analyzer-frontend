// src/App.js
import React, { useState } from "react";
import "./App.css";

function App() {
  const [decklist, setDecklist] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://mtg-deck-analyzer-backend.onrender.com/api/analyze-deck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decklist })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing deck:", error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>MTG Deck Analyzer</h1>
      <textarea
        rows="10"
        cols="50"
        value={decklist}
        onChange={(e) => setDecklist(e.target.value)}
        placeholder="Paste your Standard decklist here..."
      />
      <br />
      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Deck"}
      </button>
      {result && (
        <div>
          <h2>Results</h2>
          <p><strong>Favorable Matchups:</strong> {result.favorable.join(", ")}</p>
          <p><strong>Challenging Matchups:</strong> {result.challenging.join(", ")}</p>
          <p><strong>Recommendations:</strong> {result.recommendations}</p>
        </div>
      )}
    </div>
  );
}

export default App;
