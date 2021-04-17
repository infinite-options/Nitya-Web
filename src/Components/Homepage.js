import React, { Component } from "react";

import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import About from "./Home/About";
import Services from "./Home/Services";
import Blog from "./Home/Blog";
import Contact from "./Home/Contact";
import Footer from "./Footer/Footer";
// import Footer from "./src/Footer/Footer";

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
