import React, { useState } from "react";
import "./App.css";

function App() {
  const [decklist, setDecklist] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);

  const handleSubmit = async () => {
    if (!decklist.trim()) {
      setError("Please enter a decklist");
      return;
    }

    setError(null);
    setResult(null);
    setDebugInfo(null);
    setLoading(true);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'https://mtg-deck-analyzer-backend.onrender.com';
      console.log('Making request to:', `${apiUrl}/api/analyze-deck`);
      
      const response = await fetch(`${apiUrl}/api/analyze-deck`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decklist }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received data:', data);
      
      // Store debug info
      setDebugInfo({
        responseReceived: true,
        dataKeys: Object.keys(data),
        dataPreview: JSON.stringify(data, null, 2).substring(0, 500) + '...'
      });
      
      setResult(data);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Failed to analyze deck. Please try again.");
      setDebugInfo({
        errorOccurred: true,
        errorMessage: err.message,
        errorStack: err.stack
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClearResults = () => {
    setResult(null);
    setError(null);
    setDebugInfo(null);
  };

  const safeRenderManaCurve = (manaCurve) => {
    try {
      if (!manaCurve || typeof manaCurve !== 'object') {
        console.log('No mana curve data:', manaCurve);
        return null;
      }
      
      const entries = Object.entries(manaCurve);
      if (entries.length === 0) return null;
      
      const maxCount = Math.max(...Object.values(manaCurve));
      if (maxCount === 0) return null;
      
      return (
        <div className="mana-curve">
          <h3>Mana Curve</h3>
          <div className="curve-bars">
            {entries.map(([cmc, count]) => (
              <div key={cmc} className="curve-bar-container">
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
    } catch (err) {
      console.error('Error rendering mana curve:', err);
      return (
        <div className="mana-curve">
          <h3>Mana Curve</h3>
          <p>Error displaying mana curve</p>
        </div>
      );
    }
  };

  const safeRenderColors = (colors) => {
    try {
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
          {colors.map(color => {
            const colorInfo = colorMap[color];
            if (!colorInfo) return null;
            return (
              <span key={color} className={`color color-${color}`}>
                {colorInfo.symbol} {colorInfo.name}
              </span>
            );
          })}
        </div>
      );
    } catch (err) {
      console.error('Error rendering colors:', err);
      return <span>Error displaying colors</span>;
    }
  };

  const safeRenderReplacements = (replacements) => {
    try {
      if (!replacements || !Array.isArray(replacements) || replacements.length === 0) {
        return <p className="no-replacements">No replacement suggestions found.</p>;
      }

      return (
        <div className="replacements">
          {replacements.map((replacement, index) => {
            if (!replacement || typeof replacement !== 'object') return null;
            
            return (
              <div key={index} className="replacement-item">
                <div className="replacement-header">
                  <strong>Replace:</strong> {replacement.replace || 'Unknown'}
                </div>
                <div className="replacement-suggestion">
                  <strong>With:</strong> {replacement.with || 'Unknown'}
                </div>
                <div className="replacement-reason">
                  <em>Reason:</em> {replacement.reason || 'No reason given'}
                </div>
                {replacement.alternatives && Array.isArray(replacement.alternatives) && replacement.alternatives.length > 1 && (
                  <div className="alternatives">
                    <strong>Other options:</strong>
                    <ul>
                      {replacement.alternatives.slice(1).map((alt, i) => (
                        <li key={i}>{alt?.name || alt || 'Unknown'}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    } catch (err) {
      console.error('Error rendering replacements:', err);
      return <p>Error displaying replacement suggestions</p>;
    }
  };

  const safeRenderArray = (items, title) => {
    try {
      if (!items || !Array.isArray(items) || items.length === 0) {
        return <p>No {title.toLowerCase()} identified.</p>;
      }
      
      return (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item || 'Unknown'}</li>
          ))}
        </ul>
      );
    } catch (err) {
      console.error(`Error rendering ${title}:`, err);
      return <p>Error displaying {title.toLowerCase()}</p>;
    }
  };

  const safeRenderSideboard = (sideboard) => {
    try {
      if (!sideboard || typeof sideboard !== 'object') return null;
      
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
                          <li key={idx}>{card || 'Unknown'}</li>
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
                  <li key={idx}>{strategy || 'Unknown'}</li>
                ))}
              </ul>
            </div>
          )}

          {sideboard.recommendations && Array.isArray(sideboard.recommendations) && sideboard.recommendations.length > 0 && (
            <div className="sideboard-recommendations">
              <h4>💡 Sideboard Recommendations</h4>
              <ul>
                {sideboard.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec || 'Unknown'}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    } catch (err) {
      console.error('Error rendering sideboard:', err);
      return (
        <div className="sideboard-section">
          <h3>🎯 Sideboard Analysis</h3>
          <p>Error displaying sideboard analysis</p>
        </div>
      );
    }
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
          {(result || error) && (
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

      {debugInfo && process.env.NODE_ENV === 'development' && (
        <div className="debug-section" style={{ background: '#333', padding: '15px', borderRadius: '5px', margin: '20px 0' }}>
          <h3>Debug Info</h3>
          <pre style={{ fontSize: '12px', overflow: 'auto' }}>
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      )}

      {result && (
        <div className="results-section">
          <div className="archetype-section">
            <h2>🏛️ Deck Archetype</h2>
            <div className="archetype-name">{result.archetype || 'Unknown'}</div>
            <div className="deck-stats">
              <div className="stat">
                <strong>Total Cards:</strong> {result.totalCards || 0}
              </div>
              <div className="stat">
                <strong>Colors:</strong> {safeRenderColors(result.colors)}
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

          {safeRenderManaCurve(result.manaCurve)}

          {result.synergies && Array.isArray(result.synergies) && result.synergies.length > 0 && (
            <div className="synergies-section">
              <h3>⚡ Detected Synergies</h3>
              <div className="synergies-list">
                {result.synergies.map((synergy, index) => (
                  <span key={index} className="synergy-tag">
                    {synergy || 'Unknown'}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result.matchups && typeof result.matchups === 'object' && (
            <div className="matchups-section">
              <div className="matchup-column favorable">
                <h3>✅ Favorable Matchups</h3>
                {safeRenderArray(result.matchups.favorable, 'Favorable Matchups')}
              </div>

              <div className="matchup-column challenging">
                <h3>⚠️ Challenging Matchups</h3>
                {safeRenderArray(result.matchups.challenging, 'Challenging Matchups')}
              </div>
            </div>
          )}

          <div className="recommendations-section">
            <h3>💡 Recommendations</h3>
            <p className="recommendations-text">{result.recommendations || 'No recommendations available'}</p>
          </div>

          {result.replacementSuggestions && (
            <div className="replacements-section">
              <h3>🔄 Replacement Suggestions</h3>
              {safeRenderReplacements(result.replacementSuggestions)}
            </div>
          )}

          {safeRenderSideboard(result.sideboard)}

          {result.cardTypes && typeof result.cardTypes === 'object' && (
            <div className="card-types-section">
              <h3>📊 Card Type Breakdown</h3>
              <div className="card-types-grid">
                {Object.entries(result.cardTypes).map(([type, count]) => (
                  <div key={type} className="card-type-item">
                    <span className="type-name">{type}</span>
                    <span className="type-count">{count || 0}</span>
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
