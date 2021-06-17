import React, { Component } from "react";
import ScrollToTop from "../Blog/ScrollToTop";
import Home from "./Home/Home";
import About from "./Home/About";
import Services from "./Home/Services";
import Contact from "./Home/Contact";

class Homepage extends Component {
  render() {
    return (
      <>
        <div className="homepage" id="homepage">
          <div className="page-container ">
            <ScrollToTop />
            <Home />
            {/* <About />
            <p
              style={{
                textAlign: "center",
                fontFamily: "DidoteTextW01-Italic",
                fontStyle: "italic",
                fontSize: "4.5rem",
                wordWrap: "break-word",
                color: "#d3a625",
                lineHeight: "0",
                paddingBottom: "20px",
              }}
            >
              Services
            </p> */}
            <Services />
            <About />
            <Contact />
          </div>
        </div>
      </>
    );
  }
}

export default Homepage;
