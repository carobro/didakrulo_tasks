import React from 'react';
import './App.css';
import DragAndDrop from './DragAndDrop';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Drag and Drop Game</h1>
        <p>Ordne die Objekte den richtigen Zonen zu</p>
      </header>
      <DragAndDrop />
    </div>
  );
}

export default App;
