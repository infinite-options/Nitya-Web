import React, { useState } from "react";
import { Button, ButtonGroup } from "reactstrap";
import Consulting from "./Consulting";
import Treatments from "./Treatments";
import { makeStyles } from "@material-ui/core/styles";
import ScrollToTop from "../../Blog/ScrollToTop";

const Services = (props) => {
  const useStyles = makeStyles({
    container: {
      // position: "relative",
      // top: "40px",
      marginTop: "95px",
      /*minHeight: "710px",
      minWidth: "600px",
      height: "auto",
      width: "auto",
      */
     height: "1381px",
     width: "980px",
      
      
      // padding: "50px",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      // justifyContent: "center",
      alignItems: "center",
    },
    
    ButtonGroup: {
      top: 0,
      marginTop:"30px",
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

  return (
    <div className="page-container">
      <div className="services" id="services" aria-label={"service block"}>
        <div className={classes.container}>
          <ScrollToTop />
          <div aria-label={"click button to switch service type."}>
            <ButtonGroup className={classes.ButtonGroup}>
              <Button
                className={classes.btn1}
                onClick={() => setRSelected(<Consulting />)}
                active={rSelected === <Consulting />}
              >
                Consulting
              </Button>
              <Button
                className={classes.btn2}
                onClick={() => setRSelected(<Treatments />)}
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

          <p style={{width:"fit-content" , height:"fit-content"}}>{rSelected}</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
