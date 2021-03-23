import React, { Component } from "react";
import { Button, Row, Col } from "reactstrap";
import Img from "../../card2.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    position: "relative",
    top: "70px",
    marginBottom: "255px",
    left: "220px",
    right: "80px",
    height: "810px",
    width: "1310px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
  content: {
    fontSize: "1.5rem",
    fontFamily: "'Open Sans', sans-serif",
    wordWrap: "break-word",
    color: "#8d6f19",
    lineHeight: "1.4",
    textAlign: "justify",
  },
  img: {
    width: "600px",
    height: "630px",
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <div className="about" id="about">
      <div className={classes.container}>
        <Row className={classes.rows}>
          <Col>
            <p className={classes.title}>Leena Marathay</p>
            <p className={classes.content}>
              Leena is a NAMA (National Ayurvedic Medical Association) certified
              Ayurvedic Practitioner and an Ayurvedic Health and Lifestyle
              Counselor.
              <br></br>
              <p></p>
              She received her Classical Ayurveda training at Shubham Academy of
              Ayurveda in Fremont, California and has completed more than 4,000
              hours of training based on traditional Ayurvedic texts, covering
              diagnosis, Ayurvedic body treatments and clinical practice.
              <br></br>
              <p></p>
              Leena specializes in understanding the root cause of each client's
              health imbalance and suggests an individualized health plan
              guiding her clients to achieve optimum health with lasting
              results.
            </p>
            ​
          </Col>
          <Col>
            <img src={Img} className={classes.img} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
