import React, { Component } from "react";

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
      <>
        <div className="page-container ">
          <Navbar />
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
             Services {/*This piece of text is flexible, and does not remain stationary */}
          </p>
          <Services />
          <Contact />
          <Footer />
        </div>
      </>
    );
  }
}

export default Homepage;
