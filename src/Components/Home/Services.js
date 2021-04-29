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
      minHeight: "710px",
      minWidth: "600px",
      height: "auto",
      width: "auto",
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
      backgroundColor: "#88898a",
      border: "1px solid #88898a",
      borderRadius: "0px",
      color: "#e9d9ac",
      fontSize: "1.5rem",
      marginRight: "20px",
      padding: "5px 40px",
      minHeight: "60px",
      "&:hover": {
        backgroundColor: "#e9d9ac",
        color: "#88898a",
        border: "#88898a",
      },
    },
    btn2: {
      backgroundColor: "#d3a625",
      border: "1px solid #d3a625",
      borderRadius: "0px",
      color: "#88898a",
      fontSize: "1.5rem",
      minHeight: "60px",
      "&:hover": {
        backgroundColor: "#88898a",
        color: "#d3a625",
        border: "#88898a",
      },
    },
  });
  const classes = useStyles();

  const [rSelected, setRSelected] = useState(<Consulting />);

  return (
    <div className="page-container">
      <div className="services" id="services">
        <div className={classes.container}>
          <ScrollToTop />
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
