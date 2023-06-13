import React, { useState, useEffect, useContext } from "react";
import { Box, Button } from "@material-ui/core";
import { Helmet } from "react-helmet";
import axios from "axios";
import { MyContext } from "../App.js";
import Consulting from "./Consulting.jsx";
import Treatments from "./Treaments.jsx";
import ScrollToTop from "../Blog/ScrollToTop";
import "../Home/Home.css";

export default function Services() {
  const [state, setState] = useState(false);
  const { serviceArr } = useContext(MyContext);

  function stateChangeable() {
    setState(true);
  }

  function stateChangeableInvert() {
    setState(false);
  }

  return (
    <div className="HomeContainer">
      <Helmet>
        <title>Services</title>
        <meta
          name="description"
          content="We offer Ayurvedic health consultations, Panchakarma (cleansing & purification treatments) and classical Ayurvedic wellness therapies."
        />
        <link rel="canonical" href="/services" />
      </Helmet>
      <ScrollToTop />
      <div className="Card">
        <div className="Service_Title">Services</div>
        <div className="ButtonGrid">
          <Button
            onClick={stateChangeableInvert}
            style={{
              textTransform: "none",
              backgroundColor: !state ? "#D3A625" : "#DADADA",
              color: "black",
              fontSize: "20px",
            }}
          >
            Consulting
          </Button>
          <Button
            onClick={stateChangeable}
            style={{
              textTransform: "none",
              backgroundColor: state ? "#D3A625" : "#DADADA",
              color: "black",
              fontSize: "20px",
            }}
          >
            Therapies
          </Button>
        </div>

        <Box hidden={state}>
          <Consulting data={serviceArr} />
        </Box>

        <Box hidden={!state}>
          <Treatments data={serviceArr} />
        </Box>
      </div>
    </div>
  );
}
