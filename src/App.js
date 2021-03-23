import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Homepage from "./Home/Homepage";
import { Navbar } from "reactstrap";

function App() {
  return (
    <div className="App">
      <Homepage />
    </div>
  );
}

export default App;
