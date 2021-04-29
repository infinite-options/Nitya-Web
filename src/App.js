//import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, useContext } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Homepage from "./Components/Homepage";
import About from "./Components/Home/About";
import Services from "./Components/Home/Services";
import Contact from "./Components/Home/Contact";
import Blog from "./Blog/Blog";
import FullBlog from "./Blog/FullBlog";
import AddPost from "./Blog/AddPost";
import ServicePage from "./Components/ServicePage";
import AppointmentPage from "./Components/AppointmentPage";
import SignUp from "./Components/Home/SignUp";

import React, { useState } from "react";
import ReactDOM from "react-dom";



const count = "supercool";
export const MyContext = React.createContext();

export default function App() {
   
  return (
   
    <Router>
      <Navbar />

      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/home" component={Homepage} />
        <Route path="/about" component={About} />
        <Route path="/blog" component={Blog} />
        <Route path="/:blog_uid/fullblog" component={FullBlog} />
        <Route path="/addpost" component={AddPost} />
        <Route path="/services" component={Services} />
        <Route path="/contact" component={Contact} />
        <Route exact path="/:treatmentID/service/" component={ServicePage} />
        <Route exact path="/:treatmentID/appt/" component={AppointmentPage} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
      {/*  <Route exact path="/" component={} />
          <Route exact path="/blog" component={} /> */}

      <Footer />
    </Router>
    
  );
}

