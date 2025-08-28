# MTG Deck Analyzer - Frontend

A modern React frontend for analyzing Magic: The Gathering decks. Get detailed insights about your deck's archetype, mana curve, synergies, and receive strategic recommendations.

![MTG Deck Analyzer](https://images.unsplash.com/photo-1596495577886-d920f1fb7238?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)

## Features

✨ **Comprehensive Deck Analysis**
- Automatic archetype detection
- Detailed mana curve visualization
- Color identity analysis
- Synergy detection

🎯 **Strategic Insights**
- Favorable and challenging matchup predictions
- Card replacement suggestions
- Optimization recommendations
- Card type breakdown

🎨 **Modern UI**
- Responsive design for all devices
- MTG-themed styling with elegant gradients
- Interactive mana curve charts
- Clean, professional interface

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd mtg-deck-analyzer-frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Input Your Decklist**: Paste your decklist in the textarea. The analyzer accepts various formats:
   ```
   4 Lightning Bolt
   2x Counterspell
   1 Black Lotus
   SB: 3 Negate
   ```

2. **Analyze**: Click the "Analyze Deck" button to process your deck

3. **Review Results**: Get comprehensive analysis including:
   - Deck archetype classification
   - Mana curve visualization
   - Detected synergies
   - Matchup analysis
   - Card replacement suggestions

## API Integration

The frontend connects to the MTG Deck Analyzer backend API. Configure the API URL in your `.env` file:

```env
REACT_APP_API_URL=https://your-backend-url.com
```

## Backend API Endpoints

- `POST /api/analyze-deck` - Analyzes a submitted decklist
- `GET /api/health` - Health check endpoint

## Project Structure

```
src/
├── App.js          # Main application component
├── App.css         # Application styles
├── index.js        # React entry point
├── index.css       # Global styles
public/
├── index.html      # HTML template
package.json        # Dependencies and scripts
```

## Features in Detail

### Archetype Detection
The analyzer can identify various MTG archetypes including:
- Aggro decks (Mono-Red Aggro, Boros Aggro, etc.)
- Control decks (Esper Control, Azorius Control, etc.)
- Midrange strategies
- Combo decks
- And many more specialized archetypes

### Mana Curve Analysis
Visual representation of your deck's mana distribution with:
- Interactive bar chart
- CMC 0-7+ buckets
- Color-coded visualization
- Statistical insights

### Card Recommendations
Get suggestions for:
- Replacing non-Standard legal cards
- Upgrading vanilla creatures
- Optimizing high-cost spells
- Improving overall deck consistency

### Matchup Analysis
Heuristic-based predictions for:
- Favorable matchups against specific archetypes
- Challenging matchups to prepare for
- Strategic sideboard considerations

## Environment Configuration

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=https://mtg-deck-analyzer-backend.onrender.com
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (irreversible)

## Styling

The application uses:
- Modern CSS Grid and Flexbox layouts
- CSS Custom Properties for theming
- Google Fonts (Cinzel for headers, Garamond for body text)
- Responsive design principles
- MTG-inspired color scheme with gold accents

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## Troubleshooting

### Common Issues

**API Connection Errors:**
- Verify the `REACT_APP_API_URL` in your `.env` file
- Check that the backend server is running
- Ensure CORS is properly configured on the backend

**Card Not Found Errors:**
- Check card name spelling
- Ensure cards are from supported MTG sets
- Try using exact card names without quantities

**Slow Loading:**
- The Scryfall API has rate limits
- Large decklists may take longer to process
- Consider reducing decklist size for testing

## Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-scripts": "5.0.1",
  "web-vitals": "^2.1.4"
}
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- **Scryfall API** - For comprehensive MTG card data
- **Magic: The Gathering** - Wizards of the Coast
- **React** - Facebook's React team
- **Create React App** - For the initial project structure

---

**Note**: This application is not affiliated with Wizards of the Coast. Magic: The Gathering is a trademark of Wizards of the Coast LLC.
