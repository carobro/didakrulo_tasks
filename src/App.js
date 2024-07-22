import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import DragAndDrop from './DragAndDrop';
import Head from './Head';
import FlowchartEditor from './FlowchartEditor';

function App() {
  return (
    <Router>
    <div className="App">
        <Head/>
        <Routes>
        <Route exact path="/draganddrop" element={<DragAndDrop />} />
        <Route path="/flowchart" element={<FlowchartEditor />} />
    </Routes>
    </div>
    </Router>
  );
};

export default App;