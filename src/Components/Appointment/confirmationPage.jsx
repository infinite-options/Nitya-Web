import React, { useEffect, useState, useContext } from "react";
import ScrollToTop from "../../Blog/ScrollToTop";
import { Row, Col } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import "./calendar.css";
import { ApptContext } from "./Scheduler";

const useStyles = makeStyles({
  container: {
    margin: "50px auto",
    width: "980px",
    padding: "50px 50px",
    backgroundColor: "white",
  },
  h1: {
    fontSize: "24px",
    color: "#B28D42",
    fontFamily: "Hoefler",
  },
  content: {
    fontSize: "22px",
    fontFamily: "SFProDisplayRegular",
    color: "#B28D42",
    textAlign: "center",
  },
  selectTime: {
    fontSize: "32px",
    color: "#52330D",
    fontFamily: "AvenirHeavy",
    margin: "0 auto",
    textAlign: "center",
  },

  CalendarContainer: {
    margin: "auto",
    width: "980px",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "white",
    border: "2px solid #B28D42",
    color: "#B28D42",
    padding: "15px 90px",
    textAlign: "center",
    textDecoration: "none",
    display: "block",
    fontSize: "20px",
    borderRadius: "50px",
    margin: "2px auto",
    "&:hover": {
      background: "#B28D42",
      color: "white",
    },
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
    "&:active": {
      outline: "none",
      boxShadow: "none",
    },
  },
  date: {
    fontSize: "42px",
    fontFamily: "AvenirHeavy",
    margin: "0 auto",
    textAlign: "center",
  },

  center: {
    margin: "0 auto",
  },

  img: {
    width: "100%",
  },
});

export default function ConfirmationPage(props) {
  console.log("props:" + props);
  //for confirmation page
  const [apptInfo, apptInfoLoaded] = useContext(ApptContext);
  const [elementToBeRendered, setElementToBeRendered] = useState([]);

  useEffect(() => {
    if (apptInfoLoaded) {
      apptInfo.forEach((element) => {
        setElementToBeRendered(element);
      });
    }
  });

  const classes = useStyles();
  return (
    <div style={{ backgroundColor: "#DADADA" }}>
      <ScrollToTop />
      <div className={classes.container}>
        <p>Booking Confirmed</p>
        <p>We have sent a confirmation email to {elementToBeRendered.email}</p>

        <Row>
          <Col>
            <p className={classes.content} style={{ textAlign: "left" }}>
              {elementToBeRendered.title}
              <br />
              {elementToBeRendered.duration} |
              {elementToBeRendered.purchase_price}
            </p>
            <br />
            <img
              src={elementToBeRendered.image_url}
              className={classes.img}
              alt=""
            />
            <br />
            <br />
            <p className={classes.content} style={{ textAlign: "left" }}>
              6055 Meridian Ave #40, San Jose, CA 95120, USA
              <br />
              Office: 408 471 7004
            </p>
          </Col>
          <Col>
            <p>If anything changes we will contact you at:</p>
            <p>{elementToBeRendered.first_name}</p>
            <p>{elementToBeRendered.phone_no}</p>
            <div>
              <p>How to prepare for your consultation:</p>
              <p>
                Bringing these things to the consultation will help us
                accelerate the process.
              </p>
              <p>
                List of your current medication Your diet and food preferences
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
