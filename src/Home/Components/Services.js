import React, { useState } from "react";
import { Button, ButtonGroup } from "reactstrap";
import Consulting from "./Consulting";
import Treatments from "./Treatments";
import { makeStyles } from "@material-ui/core/styles";

const Services = (props) => {
  const useStyles = makeStyles({
    container: {
      //from home.js
      display: "flex",
      justifyContent: "center",
      padding: "40px 40px 20px 20px",
    },
    block: {
      backgroundColor: "white",
      alignItems: "center",
      width: "1310px",
      padding: "40px 40px 20px 20px",
    },
    ButtonGroup: {
      top: 0,
    },
    btn1: {
      backgroundColor: "#88898a",
      border: "1px solid #88898a",
      borderRadius: "0px",
      color: "#e9d9ac",
      fontSize: "1.5rem",
      marginRight: "20px",
    },
    btn2: {
      backgroundColor: "#d3a625",
      border: "1px solid #d3a625",
      borderRadius: "0px",
      color: "#88898a",
      fontSize: "1.5rem",
    },
    title: {
      marginTop: "-40px",
      textAlign: "center",
      fontFamily: "DidoteTextW01-Italic",
      fontStyle: "italic",
      fontSize: "4rem",
      wordWrap: "break-word",
      color: "#d3a625",
      lineHeight: "2",
    },
  });
  const classes = useStyles();

  const [rSelected, setRSelected] = useState(<Consulting />);

  return (
    <div className="services" id="services">
      <div className={classes.container}>
        <div className={classes.block}>
          <p className={classes.title}>Services</p>
          <ButtonGroup>
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
          <p>{rSelected}</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
