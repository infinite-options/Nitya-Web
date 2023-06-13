import React from "react";
import { Helmet } from "react-helmet";
import Img from "../Assets/Images/card2.webp";
import ScrollToTop from "../Blog/ScrollToTop";

import "../Home/Home.css";

export default function About() {
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
          <div>
            <div className="CardTitle">Leena Marathay</div>
            <p className="CardText CardParagraphs">
              <p>
                Welcome to Nitya Ayurveda, where Ayurvedic medicine meets personalized 
                health and wellness plans. Our team is led by Leena, a NAMA-certified 
                Ayurvedic Practitioner and Health and Lifestyle Counselor with over 4,000 hours 
                of training from the Shubham Academy of Ayurveda in Fremont, California.
              </p>
              <p>
                With her deep understanding of traditional Ayurvedic texts, Leena 
                specializes in identifying the root cause of each client's health imbalance. 
                By developing personalized health plans, Leena guides her clients 
                to achieve optimal health with lasting results.
              </p>
              <p>
                At Nitya Ayurveda, we believe in the power of holistic and traditional 
                practices to help our clients live a healthier, more fulfilling life. 
                Whether you're looking to address a specific health concern or seeking 
                to improve your overall well-being, our team is dedicated to helping 
                you achieve your health goals.
              </p>
              <p>
                Join us on the journey towards a happier, healthier you. Contact us today 
                to schedule a consultation with Leena and start your personalized health and wellness plan.
              </p>
            </p>
          </div>
          <div>
            <img
              src={Img}
              className="CardImage"
              alt="An image of Leena Marathay"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
