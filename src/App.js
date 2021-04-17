import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Home/Navbar/Navbar";
import Footer from "./Home/Footer/Footer";
import Homepage from "./Home/Homepage";
import Blog from "./Blog/Blog";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div>
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/blog">
              <Blog />
            </Route>
          </Switch>
          {/*  <Route exact path="/" component={} />
          <Route exact path="/blog" component={} /> */}
        </div>
        <Footer />
      </Router>
      ,
    </div>
  );
}

export default App;
