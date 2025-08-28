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
      console.log("Received analysis data:", data); // Debug log
      console.log("Data structure:", JSON.stringify(data, null, 2)); // Full data structure
      
      // Convert any object-like arrays back to proper arrays
      const cleanedData = cleanDataStructure(data);
      console.log("Cleaned data:", cleanedData);
      setResult(cleanedData);
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

  // Function to clean data structure and convert object-like arrays to proper arrays
  const cleanDataStructure = (data) => {
    if (!data || typeof data !== 'object') return data;

    const cleaned = { ...data };

    // Convert manaCurve object to proper object if it has numeric keys
    if (cleaned.manaCurve && typeof cleaned.manaCurve === 'object') {
      const curve = {};
      Object.keys(cleaned.manaCurve).forEach(key => {
        curve[key] = cleaned.manaCurve[key];
      });
      cleaned.manaCurve = curve;
    }

    // Ensure colors is an array
    if (cleaned.colors && typeof cleaned.colors === 'object' && !Array.isArray(cleaned.colors)) {
      cleaned.colors = Object.values(cleaned.colors);
    }

    // Ensure synergies is an array
    if (cleaned.synergies && typeof cleaned.synergies === 'object' && !Array.isArray(cleaned.synergies)) {
      cleaned.synergies = Object.values(cleaned.synergies);
    }

    // Clean matchups
    if (cleaned.matchups) {
      if (cleaned.matchups.favorable && !Array.isArray(cleaned.matchups.favorable)) {
        cleaned.matchups.favorable = Object.values(cleaned.matchups.favorable);
      }
      if (cleaned.matchups.challenging && !Array.isArray(cleaned.matchups.challenging)) {
        cleaned.matchups.challenging = Object.values(cleaned.matchups.challenging);
      }
    }

    // Clean sideboard data
    if (cleaned.sideboard) {
      if (cleaned.sideboard.strategy && !Array.isArray(cleaned.sideboard.strategy)) {
        cleaned.sideboard.strategy = Object.values(cleaned.sideboard.strategy);
      }
      if (cleaned.sideboard.recommendations && !Array.isArray(cleaned.sideboard.recommendations)) {
        cleaned.sideboard.recommendations = Object.values(cleaned.sideboard.recommendations);
      }
    }

    // Clean replacement suggestions
    if (cleaned.replacementSuggestions && !Array.isArray(cleaned.replacementSuggestions)) {
      cleaned.replacementSuggestions = Object.values(cleaned.replacementSuggestions);
    }

    return cleaned;
  };

  const renderManaCurve = (manaCurve) => {
    if (!manaCurve || typeof manaCurve !== 'object') return null;
    
    // Convert object to entries safely
    let curveEntries;
    try {
      curveEntries = Object.entries(manaCurve).filter(([cmc, count]) => 
        !isNaN(cmc) && typeof count === 'number'
      );
    } catch (e) {
      console.error("Error processing mana curve:", e);
      return null;
    }
    
    if (curveEntries.length === 0) return null;
    
    const maxCount = Math.max(...curveEntries.map(([, count]) => count), 1);
    
    return (
      <div className="mana-curve">
        <h3>Mana Curve</h3>
        <div className="curve-bars">
          {curveEntries.map(([cmc, count]) => (
            <div key={`curve-${cmc}`} className="curve-bar-container">
              <div 
                className="curve-bar" 
                style={{ 
                  height: `${Math.max((count / maxCount) * 100, 20)}px`,
                  backgroundColor: count > 0 ? '#d4af37' : '#444'
                }}
              >
                <span className="curve-count">{count || 0}</span>
              </div>
              <div className="curve-cmc">{cmc === '7' ? '7+' : cmc}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderColors = (colors) => {
    // Ensure we have a valid array
    let colorArray = [];
    
    if (Array.isArray(colors)) {
      colorArray = colors;
    } else if (colors && typeof colors === 'object') {
      // Convert object to array if needed
      colorArray = Object.values(colors);
    } else if (typeof colors === 'string') {
      // Handle single color as string
      colorArray = [colors];
    }

    // Filter out any non-string values
    colorArray = colorArray.filter(color => typeof color === 'string');
    
    if (colorArray.length === 0) {
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
        {colorArray.map((color, index) => (
          <span key={`color-${index}`} className={`color color-${color}`}>
            {colorMap[color]?.symbol || '?'} {colorMap[color]?.name || color}
          </span>
        ))}
      </div>
    );
  };

  const renderReplacements = (replacements) => {
    if (!Array.isArray(replacements) || replacements.length === 0) {
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
            {Array.isArray(replacement.alternatives) && replacement.alternatives.length > 1 && (
              <div className="alternatives">
                <strong>Other options:</strong>
                <ul>
                  {replacement.alternatives.slice(1).map((alt, i) => (
                    <li key={i}>{alt?.name || 'Unknown alternative'}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderMatchupsList = (matchups, type) => {
    if (!Array.isArray(matchups) || matchups.length === 0) {
      return <p>No specific {type} matchups identified.</p>;
    }

    return (
      <ul>
        {matchups.map((matchup, index) => (
          <li key={index}>{matchup}</li>
        ))}
      </ul>
    );
  };

  const safeGetValue = (obj, key, defaultValue = 0) => {
    if (!obj || typeof obj !== 'object') return defaultValue;
    const value = obj[key];
    return (typeof value === 'number') ? value : defaultValue;
  };

  const safeGetArray = (obj, key, defaultValue = []) => {
    if (!obj || typeof obj !== 'object') return defaultValue;
    const value = obj[key];
    
    // If it's already an array, return it
    if (Array.isArray(value)) return value;
    
    // If it's an object with numeric keys (like {0: 'item1', 1: 'item2'}), convert to array
    if (value && typeof value === 'object') {
      const keys = Object.keys(value);
      const isNumericKeys = keys.every(key => !isNaN(key));
      if (isNumericKeys && keys.length > 0) {
        return Object.values(value);
      }
    }
    
    // If it's a single value, wrap in array
    if (value != null) return [value];
    
    return defaultValue;
  };

  const safeGetString = (obj, key, defaultValue = '') => {
    if (!obj || typeof obj !== 'object') return defaultValue;
    const value = obj[key];
    return (typeof value === 'string') ? value : defaultValue;
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
            <div className="archetype-name">{safeGetString(result, 'archetype', 'Unknown Archetype')}</div>
            <div className="deck-stats">
              <div className="stat">
                <strong>Total Cards:</strong> {safeGetValue(result, 'totalCards', 'Unknown')}
              </div>
              <div className="stat">
                <strong>Colors:</strong> {renderColors(safeGetArray(result, 'colors'))}
              </div>
              <div className="stat">
                <strong>Creatures:</strong> {safeGetValue(result, 'creatureCount')}
              </div>
              <div className="stat">
                <strong>Spells:</strong> {safeGetValue(result, 'spellCount')}
              </div>
              <div className="stat">
                <strong>Lands:</strong> {safeGetValue(result, 'landCount')}
              </div>
            </div>
          </div>

          {renderManaCurve(result.manaCurve)}

          {safeGetArray(result, 'synergies').length > 0 && (
            <div className="synergies-section">
              <h3>⚡ Detected Synergies</h3>
              <div className="synergies-list">
                {safeGetArray(result, 'synergies').map((synergy, index) => (
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
                {renderMatchupsList(result.matchups.favorable, 'favorable')}
              </div>

              <div className="matchup-column challenging">
                <h3>⚠️ Challenging Matchups</h3>
                {renderMatchupsList(result.matchups.challenging, 'challenging')}
              </div>
            </div>
          )}

          <div className="recommendations-section">
            <h3>💡 Recommendations</h3>
            <p className="recommendations-text">{safeGetString(result, 'recommendations', 'No recommendations available.')}</p>
          </div>

          {result.sideboard && (
            <div className="sideboard-section">
              <h3>🎯 Sideboard Analysis</h3>
              <div className="sideboard-stats">
                <div className="stat">
                  <strong>Sideboard Cards:</strong> {safeGetValue(result.sideboard, 'cardCount')}
                </div>
                <div className="stat">
                  <strong>Valid Cards:</strong> {safeGetValue(result.sideboard, 'validCardCount')}
                </div>
              </div>

              {result.sideboard.purposes && (
                <div className="sideboard-purposes">
                  <h4>📋 Sideboard Breakdown</h4>
                  <div className="purposes-grid">
                    {Object.entries(result.sideboard.purposes).map(([purpose, cards]) => {
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

              {safeGetArray(result.sideboard, 'strategy').length > 0 && (
                <div className="sideboard-strategy">
                  <h4>⚔️ Sideboard Strategy</h4>
                  <ul>
                    {safeGetArray(result.sideboard, 'strategy').map((strategy, idx) => (
                      <li key={idx}>{strategy}</li>
                    ))}
                  </ul>
                </div>
              )}

              {safeGetArray(result.sideboard, 'recommendations').length > 0 && (
                <div className="sideboard-recommendations">
                  <h4>💡 Sideboard Recommendations</h4>
                  <ul>
                    {safeGetArray(result.sideboard, 'recommendations').map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
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

          {result.replacementSuggestions && (
            <div className="replacements-section">
              <h3>🔄 Card Replacement Suggestions</h3>
              {renderReplacements(result.replacementSuggestions)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
