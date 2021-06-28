import React from "react";
import { Row, Col } from "reactstrap";
import Img from "../../card2.png";
import { makeStyles } from "@material-ui/core/styles";
import ScrollToTop from "../../Blog/ScrollToTop";



const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: "70px",
    /*minHeight: "710px",
    minWidth: "600px",
    height: "auto",
    width: "auto",
    */
    height: "70vh",
    width: "80vw",
    padding: "50px",
    backgroundColor: "white",
  },

  title: {
    marginTop: "-40px",
    textAlign: "left",
    fontFamily: "DidoteTextW01-Italic",
    //fontStyle: "italic",
    fontSize: "3rem",
    wordWrap: "break-word",
    color: "#a8841d",
    lineHeight: "2",
    marginLeft: "-40px",
  },

  content: {
    font: "normal normal normal 21px Hoefler Text",
    //fontSize: "1.5rem",
    //fontFamily: "'Open Sans', sans-serif",
    wordWrap: "break-word",
    color: "#808080",
    lineHeight: "1.4",
    textAlign: "left",
    marginLeft: "-40px",
  },

  img: {
    marginRight: "-40px",
    width: "500px",
    height: "530px",
    objectFit: "cover",
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <div className="page-container ">
      <div className="about" id="about">
        <div
          className={classes.container}
          aria-label="Counselor Introduction Block"
        >
          <ScrollToTop />
          <Row className={classes.rows}>
            <Col classname="firstCol">
              <p className={classes.title}>Leena Marathay</p>
              <p className={classes.content}>
                Leena is a NAMA (National Ayurvedic Medical Association)
                certified Ayurvedic Practitioner and an Ayurvedic Health and
                Lifestyle Counselor.
                <br></br>
                <p></p>
                She received her Classical Ayurveda training at Shubham Academy
                of Ayurveda in Fremont, California and has completed more than
                4,000 hours of training based on traditional Ayurvedic texts,
                covering diagnosis, Ayurvedic body treatments and clinical
                practice.
                <br></br>
                <p></p>
                Leena specializes in understanding the root cause of each
                client's health imbalance and suggests an individualized health
                plan guiding her clients to achieve optimum health with lasting
                results.
              </p>
              ​
            </Col>
            <Col classname="secCol" style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={Img}
                className={classes.img}
                alt="An image of Leena Marathay"
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
