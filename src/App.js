import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Homepage from "./Home/Homepage";

function App() {
  return (
    <Router>
      <div className="App">
        <Homepage />
      </div>
    </Router>
  );
}

export default App;
