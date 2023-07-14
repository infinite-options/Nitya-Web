import React, { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { Link } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { MyContext } from "../App.js";
import "../Home/Home.css";
import "./ServiceDropdown.css";

import ServiceList from "./ServiceList.jsx";
import ServiceDropdown from "./ServiceDropdown.jsx";

export default function Services() {
  const restoreServiceState = () => {
    if(sessionStorage.getItem("service-state") === null) {
      return 0;
    }
    let serviceState = parseInt(sessionStorage.getItem("service-state"));
    return serviceState === null ? 0 : serviceState;
  };

  const modifyServiceState = (state) => {
    sessionStorage.setItem("service-state", state);
  };

  const [state, setState] = useState(restoreServiceState());
  const { serviceArr } = useContext(MyContext);
  const Auth = useContext(AuthContext);
  console.log(serviceArr);

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
      <div className="Card">
          <div className="Service_Title">Services</div>
          <div className="ButtonGrid">
            <div className="service-dropdown">
              <div className="service-dropbtn">
                <Button
                    onClick={() => {setState(0);
                      modifyServiceState(0)}}
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
                    onClick={() => {setState(1);
                      modifyServiceState(1)}}
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
              <ServiceDropdown data={{serviceArr, serviceType: "Therapy"}} />
            </div>
            <div className="service-dropdown">
              <div className="service-dropbtn">
                <Button
                  onClick={() => {setState(2);
                  modifyServiceState(2);}}
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
            <ServiceList data={{serviceArr, serviceType:"Therapy"}} />    
          </Box>

          <Box hidden={state !== 2}>
            <ServiceList data={{serviceArr, serviceType:"Package"}} />    
          </Box>
          
         
            <Box hidden={Auth.isAuth !== false}>
          
           {/*
          <Box hidden={Auth.isAuth === false}>
            */}
            <Button >
              <Link
                to={{
                  pathname: '/manageService',
                }}
                style={{ textDecoration: "none" }}
              >
                <p>Edit Service</p>
              </Link>
            </Button>
          </Box>  
          
        </div>
    </div>
  );
}
