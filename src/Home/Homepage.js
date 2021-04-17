import React, { Component } from "react";

//import Navbar from "./Navbar/Navbar";
//import Footer from "./Footer/Footer";
import Home from "./Components/Home";
import About from "./Components/About";
import Services from "./Components/Services";
import Contact from "./Components/Contact";

class Homepage extends Component {
  render() {
    return (
      <>
        <div className="page-container ">
          <Home />
          <About />
          <p
            style={{
              textAlign: "center",
              fontFamily: "DidoteTextW01-Italic",
              fontStyle: "italic",
              fontSize: "4.5rem",
              wordWrap: "break-word",
              color: "#d3a625",
              lineHeight: "0",
            }}
          >
            Services
          </p>
          <Services />
          <Contact />
        </div>
      </>
    );
  }
}

export default Homepage;
