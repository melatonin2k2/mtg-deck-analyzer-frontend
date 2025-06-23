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
        val
