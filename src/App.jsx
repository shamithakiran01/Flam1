import React, { useState } from "react";
import BottomSheet from "./components/BottomSheet";
import "./App.css";

function App() {
  const [sheetPosition, setSheetPosition] = useState(2);

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Bottom Sheet Demo</h1>
        <p>Drag the handle or use the buttons to control the sheet</p>
        <div className="header-controls">
          <button 
            onClick={() => setSheetPosition(0)}
            className="control-button"
          >
            Open Sheet
          </button>
          <button 
            onClick={() => setSheetPosition(1)}
            className="control-button"
          >
            Half Open
          </button>
          <button 
            onClick={() => setSheetPosition(2)}
            className="control-button"
          >
            Close Sheet
          </button>
        </div>
      </header>
      
      <main className="app-content">
        <div className="content-section">
          <h2>Welcome to the Demo</h2>
          <p>This is a demonstration of a custom bottom sheet component with:</p>
          <ul>
            <li>Multiple snap points (closed, half-open, fully open)</li>
            <li>Spring animations</li>
            <li>Drag and drop functionality</li>
            <li>Keyboard controls (arrow keys, home, end, escape)</li>
            <li>Accessibility features</li>
          </ul>
        </div>
      </main>

      <BottomSheet position={sheetPosition} onPositionChange={setSheetPosition}>
        <div className="sheet-content">
          <h2>Bottom Sheet Content</h2>
          <p>This is the content inside the bottom sheet. You can:</p>
          <ul>
            <li>Drag the handle to move the sheet</li>
            <li>Use the buttons below to snap to positions</li>
            <li>Use keyboard controls (arrow keys, home, end, escape)</li>
          </ul>
          <div className="demo-content">
            <p>Try scrolling this content when the sheet is open!</p>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="demo-item">
                <h3>Item {i + 1}</h3>
                <p>This is a sample item to demonstrate scrolling within the bottom sheet.</p>
              </div>
            ))}
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}

export default App; 