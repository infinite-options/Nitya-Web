import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "typeface-raleway";
import Blogpage from "./Blogpage";
import ScrollToTop from "./ScrollToTop";
function Blog() {
  return (
    <>
      <div id="blog" className="page-container ">
        <div className="content-wrap">
          <ScrollToTop />
          <Blogpage />
        </div>
      </div>
    </>
  );
}

export default Blog;
