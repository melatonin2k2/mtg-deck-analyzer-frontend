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
    if (!manaCurve) return null;
    
    const maxCount = Math.max(...Object.values(manaCurve));
    
    return (
      <div className="mana-curve">
        <h3>Mana Curve</h3>
        <div className="curve-bars">
          {Object.entries(manaCurve).map(([cmc, count]) => (
            <div key={cmc} className="curve-bar-container">
              <div 
                className="curve-bar" 
                style={{ 
                  height: `${(count / maxCount) * 100}px`,
                  backgroundColor: count > 0 ? '#d4af37' : '#444'
                }}
              >
                <span className="curve-count">{count}</span>
              </div>
              <div className="curve-cmc">{cmc === '7' ? '7+' : cmc}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderColors = (colors) => {
    if (!colors || colors.length === 0) return <span>Colorless</span>;
    
    const colorMap = {
      'W': { name: 'White', symbol: '⚪' },
      'U': { name: 'Blue', symbol: '🔵' },
      'B': { name: 'Black', symbol: '⚫' },
      'R': { name: 'Red', symbol: '🔴' },
      'G': { name: 'Green', symbol: '🟢' }
    };

    return (
      <div className="colors">
        {colors.map(color => (
          <span key={color} className={`color color-${color}`}>
            {colorMap[color]?.symbol} {colorMap[color]?.name}
          </span>
        ))}
      </div>
    );
  };

  const renderReplacements = (replacements) => {
    if (!replacements || replacements.length === 0) {
      return <p className="no-replacements">No replacement suggestions found.</p>;
    }

    return (
      <div className="replacements">
        {replacements.map((replacement, index) => (
          <div key={index} className="replacement-item">
            <div className="replacement-header">
              <strong>Replace:</strong> {replacement.replace}
            </div>
            <div className="replacement-suggestion">
              <strong>With:</strong> {replacement.with}
            </div>
            <div className="replacement-reason">
              <em>Reason:</em> {replacement.reason}
            </div>
            {replacement.alternatives && replacement.alternatives.length > 0 && (
              <div className="alternatives">
                <strong>Other options:</strong>
                <ul>
                  {replacement.alternatives.slice(1).map((alt, i) => (
                    <li key={i}>{alt.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>⚔️ MTG Deck Analyzer ⚔️</h1>
        <p>Analyze your Magic: The Gathering deck and get strategic insights</p>
      </header>

      <div className="input-section">
        <textarea
          rows="15"
          value={decklist}
          onChange={(e) => setDecklist(e.target.value)}
          placeholder={`Enter your decklist here, one card per line:

4 Lightning Bolt
2 Counterspell
1 Black Lotus
...

You can include quantities (4x, 2x) or just list card names.`}
        />
        <div className="button-group">
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "🔍 Analyzing..." : "🎯 Analyze Deck"}
          </button>
          {result && (
            <button onClick={handleClearResults} className="clear-btn">
              🗑️ Clear Results
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="error-message">
          <h3>❌ Error</h3>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="results-section">
          <div className="archetype-section">
            <h2>🏛️ Deck Archetype</h2>
            <div className="archetype-name">{result.archetype}</div>
            <div className="deck-stats">
              <div className="stat">
                <strong>Total Cards:</strong> {result.totalCards || 'Unknown'}
              </div>
              <div className="stat">
                <strong>Colors:</strong> {renderColors(result.colors)}
              </div>
              <div className="stat">
                <strong>Creatures:</strong> {result.creatureCount || 0}
              </div>
              <div className="stat">
                <strong>Spells:</strong> {result.spellCount || 0}
              </div>
              <div className="stat">
                <strong>Lands:</strong> {result.landCount || 0}
              </div>
            </div>
          </div>

          {renderManaCurve(result.manaCurve)}

          {result.synergies && result.synergies.length > 0 && (
            <div className="synergies-section">
              <h3>⚡ Detected Synergies</h3>
              <div className="synergies-list">
                {result.synergies.map((synergy, index) => (
                  <span key={index} className="synergy-tag">
                    {synergy}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result.matchups && (
            <div className="matchups-section">
              <div className="matchup-column favorable">
                <h3>✅ Favorable Matchups</h3>
                {result.matchups.favorable && result.matchups.favorable.length > 0 ? (
                  <ul>
                    {result.matchups.favorable.map((matchup, index) => (
                      <li key={index}>{matchup}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No specific favorable matchups identified.</p>
                )}
              </div>

              <div className="matchup-column challenging">
                <h3>⚠️ Challenging Matchups</h3>
                {result.matchups.challenging && result.matchups.challenging.length > 0 ? (
                  <ul>
                    {result.matchups.challenging.map((matchup, index) => (
                      <li key={index}>{matchup}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No specific challenging matchups identified.</p>
                )}
              </div>
            </div>
          )}

          <div className="recommendations-section">
            <h3>💡 Recommendations</h3>
            <p className="recommendations-text">{result.recommendations}</p>
          </div>

          {result.replacementSuggestions && result.replacementSuggestions.length > 0 && (
            <div className="replacements-section">
              <h3>🔄 Suggested Card Replacements</h3>
              {renderReplacements(result.replacementSuggestions)}
            </div>
          )}

          {result.cardTypes && (
            <div className="card-types-section">
              <h3>📊 Card Type Breakdown</h3>
              <div className="card-types-grid">
                {Object.entries(result.cardTypes).map(([type, count]) => (
                  <div key={type} className="card-type-item">
                    <span className="type-name">{type}</span>
                    <span className="type-count">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
