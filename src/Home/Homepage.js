import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Services from "./Components/Services";
import Blog from "./Components/Blog";
import Contact from "./Components/Contact";
import Footer from "./Footer/Footer";
class Homepage extends Component {
  render() {
    return (
      <div className="page-container">
        <div className="content-wrap">
          <Router>
            <Navbar />
            <Switch>
              <Route path="/Home" exact component={Home} />
              <Route path="/About" component={About} />
              <Route path="/Services" component={Services} />
              <Route path="/Contact" component={Contact} />
            </Switch>
            <Home />
            <About />
            <Services />
            <Contact />
            <Footer />
          </Router>
        </div>
      </div>
    );
  }
}

export default Homepage;
