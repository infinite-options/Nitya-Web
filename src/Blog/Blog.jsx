import React, { Component } from "react";
import Blogpage from "./Blogpage";
import ScrollToTop from "./ScrollToTop";
import { Helmet } from "react-helmet";

function Blog() {
  return (
    <>
      <div id="blog" className="page-container ">
        <Helmet>
          <title>Blog</title>
          <meta
            name="description"
            content="We address different topics in Ayurveda that may be of interest for those who are curious and interested in exploring Ayurvedic principles, philosophy and treatment practice"
          />
        </Helmet>
        <div className="content-wrap">
          <ScrollToTop />
          <Blogpage />
        </div>
      </div>
    </>
  );
}

export default Blog;
