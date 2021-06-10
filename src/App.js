import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "universal-cookie";
import { AuthContext } from "./auth/AuthContext";
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

//Below is everything for Stripe
import CheckoutForm from "./Components/Stripe/CheckoutForm";
// import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
// import "./styles.css";

export default function App(props) {
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

import React, { useState, useEffect } from "react";
import axios from "axios";

// import ReactDOM from "react-dom";


export const MyContext = React.createContext();
const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto"
    }
  ]
};
const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");


  const url =
  "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/treatments";
  const [servicesLoaded, setServicesLoaded] = useState(false);
  const [serviceArr, setServiceArr] = useState([]);


  useEffect(() => {
    if (!servicesLoaded) {
      axios.get(url).then((res) => {
        setServiceArr(res.data.result);
        setServicesLoaded(true);
      });
    }
  });

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };
   
  return (
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
        }}
      >
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
        <Route exact path = "/:treatmentID/service/">
          <MyContext.Provider value = {{serviceArr, servicesLoaded}}>
            <ServicePage/>
          </MyContext.Provider>
        </Route>
        <Route exact path = "/:treatmentID/appt/">
          <MyContext.Provider value = {{serviceArr, servicesLoaded}}>
            <AppointmentPage/>
          </MyContext.Provider>
        </Route>
        <Route exact path = "/:treatmentID/appt/stripe">
          <MyContext.Provider value = {{serviceArr, servicesLoaded}}>
            <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
              <CheckoutForm />
            </Elements>
          </MyContext.Provider>
        </Route>
        <Route exact path="/signup" component={SignUp} />
      </Switch>
      
      <Footer />
      </AuthContext.Provider>
    </Router>
  );
}


