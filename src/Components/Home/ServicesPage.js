import React, { useState } from "react";
import { Button, ButtonGroup } from "reactstrap";
import Consulting from "./ConsultingPage";
import Treatments from "./TreatmentsPage";
import { makeStyles } from "@material-ui/core/styles";
import ScrollToTop from "../../Blog/ScrollToTop";

const ServicesPage = (props) => {
  const useStyles = makeStyles({
    container: {
      borderTop: "1px solid #b28d42",
      paddingTop: "30px",
      backgroundColor: "white",
      height:"100%",


      //minHeight: "100%",
    //height: "auto !important",
    
    //margin: "0 auto -20px",
    },
    
    ButtonGroup: {
      top: 0,
      //backgroundColor:"white",
    //   width: "auto",
    //   float: "center",
    },
    
    btn1: {
      backgroundColor: "transparent",
      border: "none",
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
      border: "none",
      color: "#b28d42",
      fontSize: "2.5rem",
      minHeight: "60px",
      "&:hover": {
        backgroundColor: "transparent",
        color: "#b28d42",
        border: "#b28d42",
      },
    },
    buttonCenter:{
        position: "absolute",
        transform: "translateX(35vw)",  

    },
    buttonWrapper: {
        backgroundColor:"white",
        // position: "absolute",
        // transform: "translateX(50%)",
        textAlign: "center",
    }
  });
  const classes = useStyles();

  const [rSelected, setRSelected] = useState(<Consulting />);


  

  return (
    <div className="page-container" >
        
      <div className="servicespage" id="servicespage" aria-label={"service block"}>
        <div className={classes.container}>
          <ScrollToTop />
          <div className={classes.buttonWrapper} aria-label={"click button to switch service type."} >
            <ButtonGroup style={{border:"none", }}>
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
              <br /><br />
            </ButtonGroup>
          </div>
          {/*
          <div>
          <img src="consulting2.jpg"></img>
          </div>
  */}
            <br /><br />
          <p style={{width:"fit-content" , height:"fit-content"}}>{rSelected}</p>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
