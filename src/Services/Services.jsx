import React, { useState, useEffect, useContext } from "react";
import { Box, Button } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { MyContext } from "../App.js";
import ScrollToTop from "../Blog/ScrollToTop";
import "../Home/Home.css";
import "./ServiceDropdown.css";

import ServiceList from "./ServiceList.jsx";
import ServiceDropdown from "./ServiceDropdown.jsx";

export default function Services() {
  const [state, setState] = useState(0);
  const { serviceArr } = useContext(MyContext);
  console.log("Services: " + JSON.stringify(serviceArr));
  

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
            <div className="service-dropdown">
              <div className="service-dropbtn">
                <Button
                    onClick={() => setState(0)}
                    style={{    
                    textTransform: "none",
                    backgroundColor: state === 0 ? "#D3A625" : "#DADADA",
                    color: "black",
                    fontSize: "20px",
                    }}
                >
                  Consulting
                </Button>
              </div>
              <ServiceDropdown data={{serviceArr, serviceType: "Consultation"}} />
            </div>
            
            <div className="service-dropdown">
              <div className="service-dropbtn">
                <Button
                    onClick={() => setState(1)}
                    style={{
                    textTransform: "none",
                    backgroundColor: state === 1 ? "#D3A625" : "#DADADA",
                    color: "black",
                    fontSize: "20px",
                    }}
                >
                  Therapies
                </Button>
              </div>
              <ServiceDropdown data={{serviceArr, serviceType: "Treatment"}} />
            </div>
            <div className="service-dropdown">
              <div className="service-dropbtn">
                <Button
                  onClick={() => setState(2)}
                  style={{
                  textTransform: "none",
                  backgroundColor: state === 2 ? "#D3A625" : "#DADADA",
                  color: "black",
                  fontSize: "20px",
                  }}
                >
                  Packages
                </Button>
              </div>
              <ServiceDropdown data={{serviceArr, serviceType: "Package"}} />
            </div>
          </div>
          

          <Box hidden={state !== 0}>
            <ServiceList data={{serviceArr, serviceType:"Consultation"}} />              
          </Box>

          <Box hidden={state !== 1}>
            <ServiceList data={{serviceArr, serviceType:"Treatment"}} />    
          </Box>

          <Box hidden={state !== 2}>
            <ServiceList data={{serviceArr, serviceType:"Package"}} />    
          </Box>
        </div>
    </div>
  );
}
