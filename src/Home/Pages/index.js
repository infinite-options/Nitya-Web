import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Footer from "./Footer/Footer";
class Homepage extends Component {
  render() {
    return (
      <div className="page-container">
        <div className="content-wrap">
          <Navbar />
          <Home />
          <About />
          <Footer />
        </div>
      </div>
    );
  }
}

export default Homepage;
