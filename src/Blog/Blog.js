import React, { Component } from "react";

import { BrowserRouter as Router } from "react-router-dom";
import "typeface-raleway";
import Blogpage from "./Blogpage";
class Blog extends Component {
  render() {
    return (
      <div className="page-container ">
        <div className="content-wrap">
          <Router>
            <Blogpage />
          </Router>
        </div>
      </div>
    );
  }
}

export default Blog;
