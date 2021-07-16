import React from "react";
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
