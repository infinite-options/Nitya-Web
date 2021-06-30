import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  Row,
  Col,
  CardBody,
} from "reactstrap";
import { NavHashLink } from "react-router-hash-link";
import { makeStyles } from "@material-ui/core/styles";
import BookApptBtn from "../Appointment/BookNowBtn";
import LearnMoreBTN from "../Services/LearnMoreBtn";
import BookNowBTN from "../Appointment/BookNowBtn";

import ScrollToTop from "../../../src/Blog/ScrollToTop.js";
import "./ConsultingPage2.css";

const useStyles = makeStyles({
    container:{
        //width: "100%",
        
        paddingLeft:"11%",
        paddingRight:"11%",
        margin: "0",
        height: "100%",
        // width: "100%",
        // alignItems: "left",
        // marginLeft: "-50px",
      },
  card: {
    width: "100%",
    
    //backgroundColor: "#B28D42",
  },
  img: {
  },
  body: {
    color: "#594d2c",

  },
  title: {
    font: "normal normal normal 42px/38px Hoefler Text",
    color: "white",
  },
  text: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-32)/var(--unnamed-line-spacing-38) var(--unnamed-font-family-sf-pro-display)",
    color: "white",
  },
  text2: {
    font: "normal normal medium 32px/38px SF Pro Display",
    color: "white",
    fontWeight: "bolder",
  },

   btn: {
    backgroundColor: "#B28D42",
    // border: "1pc solid #B28D42",
    color: "white",
   },
});

export default function Treatments() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const res = await fetch(
      "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/treatments"
    );
    const json = await res.json();
    return json.result;
  };
  useEffect(() => {
    fetchData().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div className="treatments" 
        id="treatments" 
        aria-label="treatments section" 
        style={{backgroundColor:"#B28D42", margin: "0", display:"flex", justifyContent:"center"}}
    >
        
        <ScrollToTop />
        <Row className={classes.container}>
        {data
          .filter((service) => service.category === "Treatment")
          .map((filteredService) => (
            <Row>
                <div className="R" style={{paddingTop:"40px", paddingBottom:"40px",}} >
                <div className="C">
                    <CardImg
                        className={classes.img}
                        variant="top"
                        src={filteredService.image_url}
                        alt={"An image of" + filteredService.title}
                    /> 
                </div>
                <div className="C" style={{paddingTop:"70px",  paddingLeft:"40px"}}>
                  <CardTitle className={classes.title} >
                      {filteredService.title}
                    </CardTitle>
                    <CardText className={classes.text}>
                      {filteredService.description} <br />
                      {/* <NavHashLink to="#home">Learn More</NavHashLink> <br /> */}
                      {/* <LearnMoreBTN apptID={filteredService.treatment_uid} /> */}
                    </CardText>
                    <CardText className={classes.text2}>
                        {filteredService.duration} | {filteredService.cost} <br />
                    </CardText>
                    <BookNowBTN apptID={filteredService.treatment_uid} />
                </div>
                </div>
                <hr noshade="noshade" size="5" style={{width:"100%" , textAlign:"center", height:"1px", backgroundColor:"white"}} />     
            </Row>
          ))}
      </Row>
    </div>
  );
}
