import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { Helmet } from "react-helmet";

import Navigation from "./Navigation/navigation";
import Home from "./Home/Home";
import Footer from "./Footer/Footer";
import About from "./About/About";
import Contact from "./Contact/Contact";
import Services from "./Services/Services";
import LearnMore from "./Services/LearnMore";
import Appointment from "./Appointment/AppointmentPage";
import AppointmentConfirm from "./Appointment/AppointmentPageConfirm";
import Blog from "./Blog/Blog";
import FullBlog from "./Blog/FullBlog";
import HealthyTips from "./Blog/HealthyTips";
import Recipes from "./Blog/Recipes";
import LivingWell from "./Blog/LivingWell";
import Login from "./Admin/Login";
import SignUp from "./Admin/SignUp";
import AddPost from "./Blog/AddPost";
import ConfirmationPage from "./Appointment/confirmationPage";
import { AuthContext } from "./auth/AuthContext";
import SeminarRegister from "./Seminar/SeminarRegister";
import DonationElement from "./Seminar/DonationElement";
import Availability from "./Admin/Availability";

export const MyContext = React.createContext();

function App() {
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const url =
    "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/treatments";
  const [servicesLoaded, setServicesLoaded] = useState(false);
  const [serviceArr, setServiceArr] = useState([]);

  useEffect(() => {
    if (!servicesLoaded) {
      console.log("app.js treatment");
      axios.get(url).then((res) => {
        setServiceArr(res.data.result);
        setServicesLoaded(true);
      });
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <AuthContext.Provider
          value={{
            isLoggedIn: isLoggedIn,
            login: login,
            logout: logout,
            isGuest,
            setIsGuest,
            isAuth,
            setIsAuth,
            authLevel,
            setAuthLevel,
            setIsLoggedIn,
          }}
        >
          <div>
            <Navigation />

            <Switch>
              <Route exact path="/:treatmentID/appt/">
                <MyContext.Provider value={{ serviceArr, servicesLoaded }}>
                  <Appointment />
                </MyContext.Provider>
              </Route>
              <Route path="/:treatmentID/confirm">
                <MyContext.Provider value={{ serviceArr, servicesLoaded }}>
                  <AppointmentConfirm />
                </MyContext.Provider>
              </Route>
              <Route path="/healthy tips">
                <HealthyTips />
              </Route>

              <Route path="/login">
                <Login />
              </Route>

              <Route path="/apptconfirm">
                <ConfirmationPage />
              </Route>

              <Route path="/donation">
                <DonationElement />
              </Route>
              <Route path="/addpost">
                <AddPost />
              </Route>

              <Route path="/:blog_uid/addpost">
                <AddPost />
              </Route>
              <Route path="/availability">
                <Availability />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>

              <Route path="/recipes">
                <Recipes />
              </Route>

              <Route path="/living well">
                <LivingWell />
              </Route>

              <Route path="/learnMore">
                <MyContext.Provider value={{ serviceArr, servicesLoaded }}>
                  <LearnMore />
                </MyContext.Provider>
              </Route>

              <Route path="/about">
                <About />
              </Route>
              <Route path="/:blog_uid/fullblog">
                <FullBlog />
              </Route>

              <Route path="/blog">
                <Blog />
              </Route>

              <Route path="/contact">
                <Contact />
              </Route>

              <Route path="/services">
                <MyContext.Provider value={{ serviceArr, servicesLoaded }}>
                  <Services />
                </MyContext.Provider>
              </Route>

              <Route exact path="/seminar" component={SeminarRegister} />
              <Route path="/">
                <MyContext.Provider value={{ serviceArr, servicesLoaded }}>
                  <Home />
                </MyContext.Provider>
              </Route>
            </Switch>

            <Footer />
          </div>
        </AuthContext.Provider>
      </Router>

      <Helmet>
        <title>Nitya Ayurveda South Bay Healing Center</title>
        <meta
          name="description"
          content="Nitya Ayurveda is a holistic healing center that offers classical Ayurvedic solutions for your health issues with herbal plans, diet and lifestyle guidance, and follow ups."
        />
        <link rel="canonical" href="/Home" />
      </Helmet>
    </div>
  );
}

export default App;
