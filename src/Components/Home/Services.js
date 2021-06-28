import React, { useState } from "react";
import { Button, ButtonGroup } from "reactstrap";
import Consulting from "./Consulting";
import Treatments from "./Treatments";
import { makeStyles } from "@material-ui/core/styles";
import ScrollToTop from "../../Blog/ScrollToTop";

const Services = (props) => {
  const useStyles = makeStyles({
    container: {
      position: "relative",
      top: "40px",
      marginBottom: "150px",
      /*minHeight: "710px",
      minWidth: "600px",
      height: "auto",
      width: "auto",
      */
     height: "auto",
     width: "80vw",
      
      
      padding: "50px",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    
    ButtonGroup: {
      top: 0,
    },
    
    btn1: {
      backgroundColor: "transparent",
      //border: "1px solid #88898a",
      border: "none",
      //borderRadius: "0px",
      color: "#b28d42",
      fontSize: "2.5rem",
      marginRight: "20px",
      padding: "5px 40px",
      minHeight: "60px",
      "&:hover": {
        backgroundColor: "transparent",
        color: "#b28d42",
        border: "#b28d42",
      },
    },
    btn2: {
      backgroundColor: "transparent",
      //border: "1px solid #d3a625",
      border: "none",
      //borderRadius: "0px",
      color: "#b28d42",
      fontSize: "2.5rem",
      minHeight: "60px",
      "&:hover": {
        backgroundColor: "transparent",
        color: "#b28d42",
        border: "#b28d42",
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
            <ButtonGroup style={{border:"none"}}>
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
                Treatments
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
