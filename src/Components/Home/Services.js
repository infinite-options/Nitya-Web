import React, { useState } from "react";
import { Button, ButtonGroup } from "reactstrap";
import Consulting from "./Consulting";
import Treatments from "./Treatments";
import { makeStyles } from "@material-ui/core/styles";
import ScrollToTop from "../../Blog/ScrollToTop";

import "./Services.css";

const Services = (props) => {
  const useStyles = makeStyles({
    container: {
      marginTop: "95px",

      height: "1381px",
      width: "980px",

      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    ButtonGroup: {
      top: 0,
      marginTop: "30px",
    },

    btn1: {
      width: "153px",
      height: "32px",
      font: "normal normal normal 32px/38px Hoefler Text",
      letterSpacing: "0px",
      color: "#B28D42",
      opacity: "1",
      backgroundColor: "transparent",
      //border: "1px solid #88898a",
      border: "none",
      //borderRadius: "0px",
      // color: "#b28d42",
      // fontSize: "2.5rem",
      marginRight: "50px",
      padding: "1px 1px",
      "&:hover": {
        backgroundColor: "transparent",
        color: "#B28D42",
        border: "#B28D42",
      },
    },
    btn2: {
      width: "253px",
      height: "32px",
      font: "normal normal normal 32px/38px Hoefler Text",
      letterSpacing: "0px",
      color: "#B28D42",
      opacity: "1",
      backgroundColor: "transparent",
      padding: "1px 1px",

      border: "none",
      "&:hover": {
        backgroundColor: "transparent",
        color: "#B28D42",
        border: "#B28D42",
      },
    },
  });
  const classes = useStyles();

  const [rSelected, setRSelected] = useState(<Consulting />);
  const [activeComponent, setActiveComponent] = useState("consulting");

  return (
    <div className="page-container" style={{ padding: "0px" }}>
      <div className="services" id="services" aria-label={"service block"}>
        <div id="servicesContainer">
          <ScrollToTop />
          <div aria-label={"click button to switch service type."}>
            <ButtonGroup className="ButtonGroup">
              <Button
                id="btn1"
                className={activeComponent === "consulting" ? "selected" : ""}
                onClick={() => {
                  setRSelected(<Consulting />);
                  setActiveComponent("consulting");
                }}
                active={rSelected === <Consulting />}
              >
                Consulting
              </Button>
              <Button
                id="btn2"
                className={activeComponent === "treatments" ? "selected" : ""}
                onClick={() => {
                  setRSelected(<Treatments />);
                  setActiveComponent("treatments");
                }}
                active={rSelected === <Treatments />}
              >
                Body Therapies
              </Button>
            </ButtonGroup>
          </div>
          {/*
          <div>
          <img src="consulting2.jpg"></img>
          </div>
  */}

          <p style={{ width: "fit-content", height: "fit-content" }}>
            {rSelected}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
