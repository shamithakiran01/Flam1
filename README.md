# React Bottom Sheet Component

A modern, accessible bottom sheet component for React applications with smooth animations, keyboard controls, and touch gestures.

## Features

- 🎯 Multiple snap points (fully open, half-open, closed)
- 🎨 Smooth spring animations
- ⌨️ Comprehensive keyboard controls
- 👆 Touch and drag support
- ♿ Accessibility features
- 📱 Responsive design

## Keyboard Controls

- **Arrow Up/Down**: Scroll content
- **Home**: Open sheet fully
- **End**: Close sheet
- **Ctrl/Cmd + Home**: Scroll to top
- **Ctrl/Cmd + End**: Scroll to bottom
- **Page Up/Down**: Scroll one page
- **Space**: Toggle sheet (open/close)
- **Escape**: Close sheet

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-bottom-sheet
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Usage

```jsx
import BottomSheet from './components/BottomSheet';

function App() {
  const [sheetPosition, setSheetPosition] = useState(2); // 0: open, 1: half, 2: closed

  return (
    <div>
      <BottomSheet 
        position={sheetPosition} 
        onPositionChange={setSheetPosition}
      >
        <div className="sheet-content">
          <h2>Your Content Here</h2>
          <p>Add any content you want in the bottom sheet.</p>
        </div>
      </BottomSheet>
    </div>
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `position` | number | Current position (0: open, 1: half, 2: closed) |
| `onPositionChange` | function | Callback when position changes |
| `children` | node | Content to display in the sheet |

## Development

- Built with React 18
- Uses CSS for animations and styling
- No external dependencies required

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
