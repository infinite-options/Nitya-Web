import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import { NavHashLink } from "react-router-hash-link";
import { makeStyles } from "@material-ui/core/styles";
import LearnMoreBTN from "../Services/LearnMoreBtn";
import BookNowBTN2 from "../Appointment/BookNowBtn2";

import ScrollToTop from "../../../src/Blog/ScrollToTop.js";
import "./ConsultingPage2.css";
//import Date as ObjDate from "./Date";

const useStyles = makeStyles({
  card: {
      width: "100%",
  },
  img: {
    //float: "right",
    //padding: "30px",
    //width: "700px",
    //width: "30vw",

  },
  body: {
    color: "#594d2c",
  },
  title: {
    font: "normal normal normal 42px/38px Hoefler Text",
    // fontSize: "1.4rem",
    // color: "white",
    color: "#B28D42",
  },
  text: {
    //fontSize: "1.0rem",
    // font: "normal normal normal 32px/38px SF Pro Display",
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-32)/var(--unnamed-line-spacing-38) var(--unnamed-font-family-sf-pro-display)",
    // color: "white",
    color: "#B28D42",
  },
  text2: {
    font: "normal normal medium 32px/38px SF Pro Display",
    color: "#B28D42",
    fontWeight: "bolder",
  },

   btn: {
    backgroundColor: "#B28D42",
    // border: "1pc solid #B28D42",
    color: "white",
   },

   
});

function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }

  window.onloadv=function() {
      convertTime();
  function convertTime(time){
    var d = new Date(time);
    var x = document.getElementById("timePrice");
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    // x.innerHTML = h+":"+m;
  }
}

export default function Consulting() {
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
    <div
      className="consulting"
      id="consulting"
      aria-label={"consulting section"}
    >
      <ScrollToTop />

      <Row  >
        {data
          .filter((service) => service.category === "Consultation")
          .map((filteredService) => (
            // <Col >
            <Row>
                <div className="R" style={{paddingTop:"40px", paddingBottom:"40px",}} >
                <div className="C">
                    <CardImg
                        className={classes.img}
                        variant="top"
                        src={filteredService.image_url}
                        alt={"An image of" + filteredService.title}
                        style={{}}
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
                    <CardText className={classes.text2} id="timePrice">

                        {filteredService.duration} | {filteredService.cost} <br />
                    </CardText>
                    <BookNowBTN2 apptID={filteredService.treatment_uid} />
                </div>
                </div>
                <hr noshade="noshade" size="5" style={{width:"100%" , textAlign:"center", height:"1px", backgroundColor:"#B28D42"}} /> 
            </Row>
        ))}
      </Row>
    </div>
  );
}
