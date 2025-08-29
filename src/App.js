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
      console.log('Received data:', data); // Debug log
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

  // Extract main deck analysis from the result
  const mainDeckAnalysis = result?.mainDeck || result; // Fallback to legacy structure
  const sideboardAnalysis = result?.sideboard;
  const replacementSuggestions = result?.replacementSuggestions;

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

You can also include a sideboard:
Sideboard:
3 Duress
2 Negate

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

      {mainDeckAnalysis && (
        <div className="results-section">
          <div className="archetype-section">
            <h2>🏛️ Main Deck Analysis</h2>
            <div className="archetype-name">{mainDeckAnalysis.archetype || 'Unknown Archetype'}</div>
            <div className="deck-stats">
              <div className="stat">
                <strong>Total Cards:</strong> {mainDeckAnalysis.cardCount || mainDeckAnalysis.totalCards || 'Unknown'}
              </div>
              <div className="stat">
                <strong>Colors:</strong> {renderColors(mainDeckAnalysis.colors)}
              </div>
              <div className="stat">
                <strong>Creatures:</strong> {mainDeckAnalysis.creatureCount || 0}
              </div>
              <div className="stat">
                <strong>Spells:</strong> {mainDeckAnalysis.spellCount || 0}
              </div>
              <div className="stat">
                <strong>Lands:</strong> {mainDeckAnalysis.landCount || 0}
              </div>
            </div>
          </div>

          {renderManaCurve(mainDeckAnalysis.manaCurve)}

          {mainDeckAnalysis.synergies && mainDeckAnalysis.synergies.length > 0 && (
            <div className="synergies-section">
              <h3>⚡ Detected Synergies</h3>
              <div className="synergies-list">
                {mainDeckAnalysis.synergies.map((synergy, index) => (
                  <span key={index} className="synergy-tag">
                    {synergy}
                  </span>
                ))}
              </div>
            </div>
          )}

          {mainDeckAnalysis.matchups && (
            <div className="matchups-section">
              <div className="matchup-column favorable">
                <h3>✅ Favorable Matchups</h3>
                {mainDeckAnalysis.matchups.favorable && mainDeckAnalysis.matchups.favorable.length > 0 ? (
                  <ul>
                    {mainDeckAnalysis.matchups.favorable.map((matchup, index) => (
                      <li key={index}>{matchup}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No specific favorable matchups identified.</p>
                )}
              </div>

              <div className="matchup-column challenging">
                <h3>⚠️ Challenging Matchups</h3>
                {mainDeckAnalysis.matchups.challenging && mainDeckAnalysis.matchups.challenging.length > 0 ? (
                  <ul>
                    {mainDeckAnalysis.matchups.challenging.map((matchup, index) => (
                      <li key={index}>{matchup}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No specific challenging matchups identified.</p>
                )}
              </div>
            </div>
          )}

          {mainDeckAnalysis.cardTypes && (
            <div className="card-types-section">
              <h3>📊 Card Type Breakdown</h3>
              <div className="card-types-grid">
                {Object.entries(mainDeckAnalysis.cardTypes).map(([type, count]) => (
                  <div key={type} className="card-type-item">
                    <span className="type-name">{type}</span>
                    <span className="type-count">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="recommendations-section">
            <h3>💡 Main Deck Recommendations</h3>
            <div className="recommendations-text">
              {mainDeckAnalysis.recommendations ? (
                mainDeckAnalysis.recommendations.split('. ').map((rec, index) => (
                  rec.trim() && (
                    <div key={index} className="recommendation-item">
                      <span className="recommendation-bullet">•</span>
                      <span>{rec.trim()}{rec.endsWith('.') ? '' : '.'}</span>
                    </div>
                  )
                ))
              ) : (
                <p>No specific recommendations available.</p>
              )}
            </div>
          </div>

          {replacementSuggestions && replacementSuggestions.length > 0 && (
            <div className="replacements-section">
              <h3>🔄 Card Replacement Suggestions</h3>
              {renderReplacements(replacementSuggestions)}
            </div>
          )}

          {sideboardAnalysis && (
            <div className="sideboard-section">
              <h3>🎯 Sideboard Analysis</h3>
              <div className="sideboard-stats">
                <div className="stat">
                  <strong>Sideboard Cards:</strong> {sideboardAnalysis.cardCount}
                </div>
                <div className="stat">
                  <strong>Valid Cards:</strong> {sideboardAnalysis.validCardCount}
                </div>
              </div>

              {sideboardAnalysis.purposes && (
                <div className="sideboard-purposes">
                  <h4>📋 Sideboard Breakdown</h4>
                  <div className="purposes-grid">
                    {Object.entries(sideboardAnalysis.purposes).map(([purpose, cards]) => {
                      if (cards.length === 0) return null;
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

              {sideboardAnalysis.strategy && sideboardAnalysis.strategy.length > 0 && (
                <div className="sideboard-strategy">
                  <h4>⚔️ Sideboard Strategy</h4>
                  <ul>
                    {sideboardAnalysis.strategy.map((strategy, idx) => (
                      <li key={idx}>{strategy}</li>
                    ))}
                  </ul>
                </div>
              )}

              {sideboardAnalysis.recommendations && sideboardAnalysis.recommendations.length > 0 && (
                <div className="sideboard-recommendations">
                  <h4>💡 Sideboard Recommendations</h4>
                  <ul>
                    {sideboardAnalysis.recommendations.map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
