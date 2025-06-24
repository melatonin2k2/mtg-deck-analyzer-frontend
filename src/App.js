import React, { useState } from "react";
import "./App.css";

function App() {
  const [decklist, setDecklist] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || ""}/api/analyze-deck`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decklist }),
      });

      if (!response.ok) throw new Error("Failed to analyze deck");
      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError("Error analyzing deck. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>MTG Deck Analyzer</h1>
      <textarea
        rows="20"
        cols="60"
        value={decklist}
        onChange={(e) => setDecklist(e.target.value)}
        placeholder="Paste your decklist here"
      />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Deck"}
      </button>

      {error && <p className="error">{error}</p>}

      {analysis && (
        <div className="results">
          <h2>Archetype: {analysis.archetype}</h2>
          <p><strong>Learned Cluster:</strong> {analysis.learnedCluster?.cluster}</p>

          <h3>Favorable Matchups:</h3>
          <ul>{analysis.favorable?.map((m, i) => <li key={i}>{m}</li>)}</ul>

          <h3>Challenging Matchups:</h3>
          <ul>{analysis.challenging?.map((m, i) => <li key={i}>{m}</li>)}</ul>

          <h3>Mana Curve</h3>
          <ul>
            {Object.entries(analysis.manaCurve || {}).map(([cmc, count]) => (
              <li key={cmc}>CMC {cmc}: {count}</li>
            ))}
          </ul>

          <h3>Synergies</h3>
          <p>{analysis.synergies?.join(", ") || "None detected"}</p>

          <h3>Card Roles</h3>
          {analysis.cardRoles && Object.entries(analysis.cardRoles).map(([card, roles]) => (
            <p key={card}><strong>{card}</strong>: {roles.join(", ")}</p>
          ))}

          <h3>Recommendations</h3>
          <p>{analysis.recommendations}</p>
        </div>
      )}
    </div>
  );
}

export default App;
