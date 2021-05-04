//import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useContext,
} from "react-router-dom";
import Cookies from "universal-cookie";

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

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { AuthContext } from "./auth/AuthContext";

export default function App() {
  const cookies = new Cookies();
  let uid =
    cookies.get("customer_uid") == null ? "" : cookies.get("customer_uid");
  let role = cookies.get("role") == null ? "" : cookies.get("role");
  let guesProfile =
    localStorage.getItem("guestProfile") == null
      ? ""
      : localStorage.getItem("guestProfile");
  const [isGuest, setIsGuest] = useState(guesProfile === "" ? false : true); // checks if user is logged in
  const [isAuth, setIsAuth] = useState(uid === "" ? false : true); // checks if user is logged in

  const [authLevel, setAuthLevel] = useState();
  return (
    <Router>
      <Navbar />
      <AuthContext.Provider
        value={{
          isGuest,
          setIsGuest,
          isAuth,
          setIsAuth,
          authLevel,
          setAuthLevel,
        }}
      ></AuthContext.Provider>
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
      </Switch>
      {/*  <Route exact path="/" component={} />
          <Route exact path="/blog" component={} /> */}

      <Footer />
    </Router>
  );
}
