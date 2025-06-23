import React, { useState } from "react";

export default function App() {
  const [deckList, setDeckList] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async () => {
    if (!deckList.trim()) return;
    setLoading(true);
    setAnalysis(null);

    try {
      const response = await fetch(
        "https://your-backend-url.onrender.com/api/analyze-deck",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ decklist: deckList }),
        }
      );

      if (!response.ok) throw new Error("Failed to analyze deck");

      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      alert("Error analyzing deck: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <h1>Standard MTG Deck Analyzer</h1>

      <textarea
        rows={10}
        style={{ width: "100%", fontSize: 16 }}
        placeholder="Paste your deck list here..."
        value={deckList}
        onChange={(e) => setDeckList(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading || !deckList.trim()}
        style={{ marginTop: 10, padding: "10px 20px", fontSize: 16 }}
      >
        {loading ? "Analyzing..." : "Analyze Deck"}
      </button>

      {analysis && (
        <div style={{ marginTop: 20 }}>
          <h2>Favorable Matchups</h2>
          <ul>
            {analysis.favorable.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>

          <h2>Challenging Matchups</h2>
          <ul>
