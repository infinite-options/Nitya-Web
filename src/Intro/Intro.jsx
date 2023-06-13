import React from "react";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet";
import card1 from "../Assets/Images/card1.webp";
import ScrollToTop from "../Blog/ScrollToTop";
import "../Home/Home.css";

export default function Intro() {
  const history = useHistory();
  return (
    <div className="HomeContainer">
      <Helmet>
        <title>About</title>
        <meta
          name="description"
          content="We offer Ayurvedic health consultations, Panchakarma (cleansing & purification treatments) and classical Ayurvedic wellness therapies"
        />
        <link rel="canonical" href="/about" />
      </Helmet>

      <ScrollToTop />
      <div className="Card">
        <div className="CardGrid">
          <div className="IntroGrid">
            <div className="CardTitle">Helping your body heal itself</div>

            <button
              className="CardButton"
              onClick={() => {
                history.push("/services");
              }}
            >
              Book a Session
            </button>
          </div>
          <div>
            <img src={card1} className="CardImage" />
          </div>
        </div>
      </div>
    </div>
  );
}
