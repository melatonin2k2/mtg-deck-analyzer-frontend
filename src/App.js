import React, { useState } from "react";
import "./App.css";

function App() {
  const [decklist, setDecklist] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    if (!decklist.trim()) {
      setError("Please enter a decklist");
      return;
    }

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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Analysis result:", data); // Debug log
      setResult(data);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Failed to analyze deck. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearResults = () => {
    setResult(null);
    setError(null);
  };

  const renderManaCurve = (manaCurve) => {
    if (!manaCurve || typeof manaCurve !== 'object') return null;
    
    // Ensure we have all CMC values from 0-7
    const fullCurve = {
      0: manaCurve[0] || 0,
      1: manaCurve[1] || 0,
      2: manaCurve[2] || 0,
      3: manaCurve[3] || 0,
      4: manaCurve[4] || 0
