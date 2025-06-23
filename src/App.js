import React, { useState } from "react";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

function App() {
  const [decklist, setDecklist] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeDeck = async (decklistText) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/api/analyze-deck`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decklist: decklistText }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Server returned an error");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!decklist.trim()) {
      setError("Please enter a decklist");
      return;
    }
    analyzeDeck(decklist);
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "auto",
        padding: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>MTG Deck Analyzer</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={12}
          cols={50}
          value={decklist}
          onChange={(e) => setDecklist(e.target.value)}
          placeholder="Paste your decklist here, one card per line"
          style={{ width: "100%", fontSize: 16, padding: 8, resize: "vertical", minHeight: 200 }}
          disabled={loading}
        />
        <br />
        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: 10, padding: "8px 16px" }}
        >
          {loading ? "Analyzing..." : "Analyze Deck"}
        </button>
      </form>

      {loading && <p style={{ marginTop: 20 }}>Loading analysis...</p>}

      {error && (
        <div style={{ marginTop: 20, color: "red", fontWeight: "bold" }}>
          Error: {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: 20 }}>
          <h2>Analysis Results</h2>
          <p>
            <strong>Favorable Matchups:</strong>{" "}
            {Array.isArray(result.favorable) && result.favorable.length > 0
              ? result.favorable.join(", ")
              : "None"}
          </p>
          <p>
            <strong>Challenging Matchups:</strong>{" "}
            {Array.isArray(result.challenging) && result.challenging.length > 0
              ? result.challenging.join(", ")
              : "None"}
          </p>
          <p>
            <strong>Recommendations:</strong>{" "}
            {result.recommendations || "No recommendations available."}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
