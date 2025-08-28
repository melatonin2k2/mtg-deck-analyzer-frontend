/* App.css - MTG Deck Analyzer Styles */

@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Garamond:wght@400;500&display=swap');

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Garamond", serif;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  min-height: 100vh;
  color: #fffbe6;
  line-height: 1.6;
}

.App {
  min-height: 100vh;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.app-header {
  text-align: center;
  padding: 40px 20px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  border: 2px solid #d4af37;
}

.app-header h1 {
  font-family: "Cinzel", serif;
  font-size: 3rem;
  font-weight: 600;
  margin: 0 0 15px 0;
  color: #d4af37;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.app-header p {
  font-size: 1.2rem;
  margin: 0;
  color: #fffbe6;
  opacity: 0.9;
}

.input-section {
  background: rgba(0, 0, 0, 0.8);
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 30px;
  border: 1px solid #d4af37;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

textarea {
  width: 100%;
  font-size: 16px;
  padding: 20px;
  border: 2px solid #d4af37;
  border-radius: 10px;
  background-color: #1a1a1a;
  color: #fffbe6;
  resize: vertical;
  margin-bottom: 20px;
  font-family: 'Courier New', monospace;
  line-height: 1.5;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
}

textarea:focus {
  outline: none;
  border-color: #ffd700;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
}

textarea::placeholder {
  color: #888;
  opacity: 1;
}

.button-group {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

button {
  padding: 15px 30px;
  font-size: 16px;
  background: linear-gradient(45deg, #d4af37, #ffd700);
  color: #1a1a1a;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

button:hover {
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
}

button:disabled {
  background: #666;
  color: #999;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.clear-btn {
  background: linear-gradient(45deg, #dc3545, #ff4757) !important;
  color: white !important;
}

.clear-btn:hover {
  background: linear-gradient(45deg, #ff4757, #ff6b7a) !important;
}

.error-message {
  background: rgba(220, 53, 69, 0.1);
  border: 2px solid #dc3545;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  text-align: center;
}

.error-message h3 {
  color: #ff6b7a;
  margin: 0 0 10px 0;
}

.results-section {
  display: grid;
  gap: 25px;
  margin-top: 30px;
}

.archetype-section {
  background: rgba(0, 0, 0, 0.8);
  padding: 30px;
  border-radius: 15px;
  border: 2px solid #d4af37;
  text-align: center;
}

.archetype-section h2 {
  font-family: "Cinzel", serif;
  color: #d4af37;
  margin: 0 0 20px 0;
  font-size: 2rem;
}

.archetype-name {
  font-size: 1.8rem;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 25px;
  padding: 15px;
  background: rgba(212, 175, 55, 0.1);
  border-radius: 10px;
  border: 1px solid #d4af37;
}

.deck-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  text-align: left;
}

.stat {
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #d4af37;
}

.colors {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.color {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-size: 14px;
}

.mana-curve {
  background: rgba(0, 0, 0, 0.8);
  padding: 30px;
  border-radius: 15px;
  border: 1px solid #d4af37;
}

.mana-curve h3 {
  text-align: center;
  color: #d4af37;
  margin: 0 0 25px 0;
  font-size: 1.5rem;
}

.curve-bars {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 10px;
  height: 150px;
  padding: 20px 0;
}

.curve-bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.curve-bar {
  width: 40px;
  min-height: 20px;
  border-radius: 4px 4px 0 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
}

.curve-count {
  color: #1a1a1a;
  font-weight: bold;
  font-size: 14px;
  padding: 2px;
}

.curve-cmc {
  color: #d4af37;
  font-weight: bold;
  font-size: 14px;
}

.synergies-section {
  background: rgba(0, 0, 0, 0.8);
  padding: 25px;
  border-radius: 15px;
  border: 1px solid #d4af37;
}

.synergies-section h3 {
  color: #d4af37;
  text-align: center;
  margin: 0 0 20px 0;
}

.synergies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.synergy-tag {
  background: linear-gradient(45deg, #d4af37, #ffd700);
  color: #1a1a1a;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.matchups-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}

.matchup-column {
  background: rgba(0, 0, 0, 0.8);
  padding: 25px;
  border-radius: 15px;
}

.favorable {
  border: 2px solid #28a745;
}

.challenging {
  border: 2px solid #dc3545;
}

.matchup-column h3 {
  margin: 0 0 15px 0;
  text-align: center;
}

.favorable h3 {
  color: #4caf50;
}

.challenging h3 {
  color: #ff6b7a;
}

.matchup-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.matchup-column li {
  padding: 10px;
  margin: 5px 0;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 5px;
  border-left: 4px solid;
}

.favorable li {
  border-left-color: #28a745;
}

.challenging li {
  border-left-color: #dc3545;
}

.recommendations-section {
  background: rgba(0, 0, 0, 0.8);
  padding: 30px;
  border-radius: 15px;
  border: 1px solid #d4af37;
}

.recommendations-section h3 {
  color: #d4af37;
  text-align: center;
  margin: 0 0 20px 0;
  font-size: 1.5rem;
}

.recommendations-text {
  font-size: 16px;
  line-height: 1.8;
  text-align: center;
  color: #fffbe6;
}

.replacements-section {
  background: rgba(0, 0, 0, 0.8);
  padding: 30px;
  border-radius: 15px;
  border: 1px solid #d4af37;
}

.replacements-section h3 {
  color: #d4af37;
  text-align: center;
  margin: 0 0 25px 0;
  font-size: 1.5rem;
}

.replacement-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  margin: 15px 0;
  border-radius: 10px;
  border-left: 4px solid #ffd700;
}

.replacement-header {
  font-size: 16px;
  margin-bottom: 8px;
  color: #ff6b7a;
}

.replacement-suggestion {
  font-size: 16px;
  margin-bottom: 8px;
  color: #4caf50;
}

.replacement-reason {
  font-size: 14px;
  margin-bottom: 10px;
  color: #ffd700;
}

.alternatives ul {
  margin: 10px 0 0 20px;
  color: #ccc;
}

.card-types-section {
  background: rgba(0, 0, 0, 0.8);
  padding: 25px;
  border-radius: 15px;
  border: 1px solid #d4af37;
}

.card-types-section h3 {
  color: #d4af37;
  text-align: center;
  margin: 0 0 20px 0;
}

.card-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.card-type-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 4px solid #d4af37;
}

.type-name {
  text-transform: capitalize;
  font-weight: bold;
}

.type-count {
  background: #d4af37;
  color: #1a1a1a;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 14px;
}

.no-replacements {
  text-align: center;
  color: #4caf50;
  font-style: italic;
  padding: 20px;
}

.sideboard-section {
  background: rgba(0, 0, 0, 0.8);
  padding: 30px;
  border-radius: 15px;
  border: 2px solid #8B4513; /* Brown border for sideboard */
}

.sideboard-section h3 {
  color: #D2691E; /* Orange-brown color for sideboard */
  text-align: center;
  margin: 0 0 20px 0;
  font-size: 1.5rem;
}

.sideboard-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 25px;
}

.sideboard-purposes {
  margin: 20px 0;
}

.sideboard-purposes h4 {
  color: #D2691E;
  margin-bottom: 15px;
  text-align: center;
}

.purposes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.purpose-category {
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #D2691E;
}

.purpose-category h5 {
  color: #D2691E;
  margin: 0 0 10px 0;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.purpose-category ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.purpose-category li {
  padding: 3px 0;
  color: #fffbe6;
  font-size: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.purpose-category li:last-child {
  border-bottom: none;
}

.sideboard-strategy,
.sideboard-recommendations {
  margin: 20px 0;
}

.sideboard-strategy h4,
.sideboard-recommendations h4 {
  color: #D2691E;
  margin-bottom: 15px;
}

.sideboard-strategy ul,
.sideboard-recommendations ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sideboard-strategy li,
.sideboard-recommendations li {
  background: rgba(255, 255, 255, 0.05);
  padding: 10px 15px;
  margin: 8px 0;
  border-radius: 5px;
  border-left: 4px solid #D2691E;
}

/* Responsive design */
@media (max-width: 768px) {
  .App {
    padding: 10px;
  }
  
  .app-header h1 {
    font-size: 2rem;
  }
  
  .matchups-section {
    grid-template-columns: 1fr;
  }
  
  .deck-stats {
    grid-template-columns: 1fr;
  }
  
  .purposes-grid {
    grid-template-columns: 1fr;
  }
  
  .card-types-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.results-section {
  animation: fadeIn 0.5s ease-out;
}

.curve-bar:hover {
  transform: scale(1.1);
  filter: brightness(1.2);
}

.synergy-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(212, 175, 55, 0.3);
}

/* Deck Health Section */
.deck-health {
  background: rgba(0, 0, 0, 0.8);
  padding: 25px;
  border-radius: 15px;
  border: 2px solid #4caf50;
}

.deck-health h3 {
  color: #4caf50;
  text-align: center;
  margin: 0 0 20px 0;
}

.health-score {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
}

.health-grade {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

.health-score-number {
  font-size: 1.5rem;
  color: #d4af37;
  text-align: center;
}

.health-feedback ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.health-feedback li {
  background: rgba(255, 255, 255, 0.05);
  padding: 8px 15px;
  margin: 5px 0;
  border-radius: 5px;
  border-left: 4px solid #4caf50;
}

/* Consistency Analysis Section */
.consistency-section {
  background: rgba(0, 0, 0, 0.8);
  padding: 25px;
  border-radius: 15px;
  border: 1px solid #2196F3;
}

.consistency-section h3 {
  color: #2196F3;
  text-align: center;
  margin: 0 0 20px 0;
}

.consistency-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.multiples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin: 15px 0;
}

.multiple-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 10px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  border-left: 3px solid #2196F3;
}

.multiple-count {
  font-size: 14px;
}

.multiple-number {
  font-weight: bold;
  color: #2196F3;
}

.most-played ul {
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
}

.most-played li {
  background: rgba(255, 255, 255, 0.05);
  padding: 5px 10px;
  margin: 3px 0;
  border-radius: 5px;
  font-size: 14px;
}

/* Manabase Analysis Section */
.manabase-section {
  background: rgba(0, 0, 0, 0.8);
  padding: 25px;
  border-radius: 15px;
  border: 2px solid #795548;
}

.manabase-section h3 {
  color: #8D6E63;
  text-align: center;
  margin: 0 0 20px 0;
}

.manabase-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.land-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin: 15px 0;
}

.land-type-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 10px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  border-left: 3px solid #8D6E63;
}

.land-type {
  text-transform: capitalize;
  font-size: 14px;
}

.land-count {
  font-weight: bold;
  color: #8D6E63;
}

.color-symbols {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin: 15px 0;
}

.color-requirement {
  background: rgba(255, 255, 255, 0.05);
  padding: 8px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-symbol {
  font-weight: bold;
  font-size: 16px;
}

.symbol-count {
  background: rgba(212, 175, 55, 0.3);
  color: #d4af37;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: bold;
}

.manabase-feedback ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.manabase-feedback li {
  background: rgba(255, 255, 255, 0.05);
  padding: 8px 15px;
  margin: 5px 0;
  border-radius: 5px;
  border-left: 4px solid #8D6E63;
}

/* Detailed Synergies Section */
.detailed-synergies-section {
  background: rgba(0, 0, 0, 0.8);
  padding: 25px;
  border-radius: 15px;
  border: 1px solid #9C27B0;
}

.detailed-synergies-section h3 {
  color: #9C27B0;
  text-align: center;
  margin: 0 0 20px 0;
}

.synergy-detail {
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  margin: 10px 0;
  border-radius: 10px;
  border-left: 4px solid #9C27B0;
}

.synergy-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.synergy-count {
  color: #9C27B0;
  font-size: 14px;
  font-style: italic;
}

.synergy-cards {
  font-size: 14px;
  color: #ccc;
  margin-top: 8px;
}

/* Detailed Card Types Section */
.detailed-card-types-section {
  background: rgba(0, 0, 0, 0.8);
  padding: 25px;
  border-radius: 15px;
  border: 1px solid #FF5722;
}

.detailed-card-types-section h3 {
  color: #FF5722;
  text-align: center;
  margin: 0 0 20px 0;
}

.type-breakdown {
  margin: 20px 0;
}

.type-breakdown h4 {
  color: #FF5722;
  margin-bottom: 10px;
  text-transform: capitalize;
}

.type-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.type-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  color: #ccc;
}

.more-cards {
  background: rgba(255, 87, 34, 0.2);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  color: #FF5722;
  font-style: italic;
}

/* Color Analysis Section */
.color-analysis-section {
  background: rgba(0, 0, 0, 0.8);
  padding: 25px;
  border-radius: 15px;
  border: 2px solid #607D8B;
}

.color-analysis-section h3 {
  color: #607D8B;
  text-align: center;
  margin: 0 0 20px 0;
}

.color-distribution {
  margin-top: 20px;
}

.color-counts {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin: 15px 0;
}

.color-count-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 8px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-count {
  color: #607D8B;
  font-size: 14px;
}

/* Color-specific styling */
.color-W { color: #fffbd5; }
.color-U { color: #0e68ab; }
.color-B { color: #150b00; background-color: #ccc; padding: 2px 4px; border-radius: 3px; }
.color-R { color: #d3202a; }
.color-G { color: #00733e; }

/* Enhanced responsive design */
@media (max-width: 768px) {
  .App {
    padding: 10px;
  }
  
  .app-header h1 {
    font-size: 2rem;
  }
  
  .matchups-section {
    grid-template-columns: 1fr;
  }
  
  .deck-stats {
    grid-template-columns: 1fr;
  }
  
  .purposes-grid {
    grid-template-columns: 1fr;
  }
  
  .card-types-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
  
  .consistency-stats {
    grid-template-columns: 1fr;
  }
  
  .manabase-stats {
    grid-template-columns: 1fr;
  }
  
  .multiples-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .land-types-grid {
    grid-template-columns: 1fr;
  }
  
  .health-score {
    flex-direction: column;
    gap: 15px;
  }
  
  .color-symbols {
    justify-content: center;
  }
  
  .color-counts {
    justify-content: center;
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.results-section {
  animation: fadeIn 0.5s ease-out;
}

.curve-bar:hover {
  transform: scale(1.1);
  filter: brightness(1.2);
}

.synergy-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(212, 175, 55, 0.3);
}

.synergy-detail:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(156, 39, 176, 0.2);
}

.type-breakdown:hover {
  transform: translateY(-1px);
}

/* Loading states */
.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #d4af37;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Additional utility classes */
.section-divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, #d4af37, transparent);
  margin: 30px 0;
}

.highlight-box {
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid #d4af37;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
}

.warning-box {
  background: rgba(255, 152, 0, 0.1);
  border: 1px solid #ff9800;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  color: #ffb74d;
}

.success-box {
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid #4caf50;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  color: #81c784;
}
