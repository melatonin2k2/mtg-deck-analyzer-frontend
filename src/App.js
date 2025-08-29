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
      console.log("Received analysis data:", data);
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
    
    // Convert manaCurve object to array of [cmc, count] pairs
    const curveEntries = Object.entries(manaCurve).map(([cmc, count]) => [
      parseInt(cmc), 
      typeof count === 'number' ? count : 0
    ]);
    
    // Sort by CMC and ensure we have entries for 0-7+
    const fullCurve = [];
    for (let i = 0; i <= 7; i++) {
      const found = curveEntries.find(([cmc]) => cmc === i);
      fullCurve.push([i, found ? found[1] : 0]);
    }
    
    const maxCount = Math.max(...fullCurve.map(([, count]) => count), 1);
    
    return (
      <div className="mana-curve">
        <h3>Mana Curve</h3>
        <div className="curve-bars">
          {fullCurve.map(([cmc, count]) => (
            <div key={cmc} className="curve-bar-container">
              <div 
                className="curve-bar" 
                style={{ 
                  height: `${Math.max((count / maxCount) * 100, 20)}px`,
                  backgroundColor: count > 0 ? '#d4af37' : '#444'
                }}
              >
                <span className="curve-count">{count}</span>
              </div>
              <div className="curve-cmc">{cmc === 7 ? '7+' : cmc}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderColors = (colors) => {
    if (!colors || !Array.isArray(colors) || colors.length === 0) {
      return <span>Colorless</span>;
    }
    
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
    if (!replacements || !Array.isArray(replacements) || replacements.length === 0) {
      return <p className="no-replacements">No replacement suggestions found.</p>;
    }

    return (
      <div className="replacements">
        {replacements.map((replacement, index) => (
          <div key={index} className="replacement-item">
            <div className="replacement-header">
              <strong>Replace:</strong> {replacement.replace || 'Unknown'}
            </div>
            <div className="replacement-suggestion">
              <strong>With:</strong> {replacement.with || 'No suggestion'}
            </div>
            <div className="replacement-reason">
              <em>Reason:</em> {replacement.reason || 'No reason provided'}
            </div>
            {replacement.alternatives && Array.isArray(replacement.alternatives) && replacement.alternatives.length > 0 && (
              <div className="alternatives">
                <strong>Other options:</strong>
                <ul>
                  {replacement.alternatives.slice(0, 3).map((alt, i) => (
                    <li key={i}>{alt.name || alt}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderSynergies = (synergies) => {
    if (!synergies || !Array.isArray(synergies) || synergies.length === 0) {
      return null;
    }

    return (
      <div className="synergies-section">
        <h3>⚡ Detected Synergies</h3>
        <div className="synergies-list">
          {synergies.map((synergy, index) => (
            <span key={index} className="synergy-tag">
              {synergy}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderMatchups = (matchups) => {
    if (!matchups || typeof matchups !== 'object') {
      return null;
    }

    const favorable = Array.isArray(matchups.favorable) ? matchups.favorable : [];
    const challenging = Array.isArray(matchups.challenging) ? matchups.challenging : [];

    return (
      <div className="matchups-section">
        <div className="matchup-column favorable">
          <h3>✅ Favorable Matchups</h3>
          {favorable.length > 0 ? (
            <ul>
              {favorable.map((matchup, index) => (
                <li key={index}>{matchup}</li>
              ))}
            </ul>
          ) : (
            <p>No specific favorable matchups identified.</p>
          )}
        </div>

        <div className="matchup-column challenging">
          <h3>⚠️ Challenging Matchups</h3>
          {challenging.length > 0 ? (
            <ul>
              {challenging.map((matchup, index) => (
                <li key={index}>{matchup}</li>
              ))}
            </ul>
          ) : (
            <p>No specific challenging matchups identified.</p>
          )}
        </div>
      </div>
    );
  };

  const renderSideboard = (sideboard) => {
    if (!sideboard) return null;

    return (
      <div className="sideboard-section">
        <h3>🎯 Sideboard Analysis</h3>
        <div className="sideboard-stats">
          <div className="stat">
            <strong>Sideboard Cards:</strong> {sideboard.cardCount || 0}
          </div>
          <div className="stat">
            <strong>Valid Cards:</strong> {sideboard.validCardCount || 0}
          </div>
        </div>

        {sideboard.purposes && typeof sideboard.purposes === 'object' && (
          <div className="sideboard-purposes">
            <h4>📋 Sideboard Breakdown</h4>
            <div className="purposes-grid">
              {Object.entries(sideboard.purposes).map(([purpose, cards]) => {
                if (!Array.isArray(cards) || cards.length === 0) return null;
                return (
                  <div key={purpose} className="purpose-category">
                    <h5>{purpose.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h5>
                    <ul>
                      {cards.map((card, idx) => (
                        <li key={idx}>{card}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {sideboard.strategy && Array.isArray(sideboard.strategy) && sideboard.strategy.length > 0 && (
          <div className="sideboard-strategy">
            <h4>⚔️ Sideboard Strategy</h4>
            <ul>
              {sideboard.strategy.map((strategy, idx) => (
                <li key={idx}>{strategy}</li>
              ))}
            </ul>
          </div>
        )}

        {sideboard.recommendations && Array.isArray(sideboard.recommendations) && sideboard.recommendations.length > 0 && (
          <div className="sideboard-recommendations">
            <h4>💡 Sideboard Recommendations</h4>
            <ul>
              {sideboard.recommendations.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const renderCardTypes = (cardTypes) => {
    if (!cardTypes || typeof cardTypes !== 'object') return null;

    return (
      <div className="card-types-section">
        <h3>📊 Card Type Breakdown</h3>
        <div className="card-types-grid">
          {Object.entries(cardTypes).map(([type, count]) => (
            <div key={type} className="card-type-item">
              <span className="type-name">{type}</span>
              <span className="type-count">{count || 0}</span>
            </div>
          ))}
        </div>
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

You can include quantities (4x, 2x) or just list card names.

Add "Sideboard" on its own line, then list sideboard cards below it.`}
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
            <div className="archetype-name">{result.archetype || 'Unknown Archetype'}</div>
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

          {renderManaCurve(result.
