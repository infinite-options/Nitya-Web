import React from "react";
import { Row, Col } from "reactstrap";
import Img from "../../card2.png";
import { makeStyles } from "@material-ui/core/styles";
import ScrollToTop from "../../Blog/ScrollToTop";

const useStyles = makeStyles({
  container: {
    width: "980px",
    height: "auto",
    //padding: "50px",
    backgroundColor: "white",
  },

  title: {
    marginLeft: "40px",
    //textAlign: "left",
    //fontFamily: "DidoteTextW01-Italic",
    //fontStyle: "italic",
    //fontSize: "3rem",
    //wordWrap: "break-word",
    //color: "#a8841d",
    //lineHeight: "2",
    textAlign: "left",
    font: "italic normal normal 32px/38px Hoefler Text",
    letterSpacing: "0px",
    color: "#B28D42",
    opacity: "1",
    width: "443px",
    height: "32px",
    marginTop: "45px",
  },

  content: {
    //font: "normal normal normal 21px Hoefler Text",
    //fontSize: "1.5rem",
    //fontFamily: "'Open Sans', sans-serif",
    //wordWrap: "break-word",
    //color: "#808080",
    //lineHeight: "1.4",
    //textAlign: "left",
    //marginRight:"23px",
    marginTop: "23px",

    width: "410px",
    height: "468px",
    textAlign: "left",
    font: "normal normal normal 22px/26px SFProDisplayRegular",
    letterSpacing: "0px",
    color: "#B28D42",
    opacity: "1",
  },
  image: {
    width: "400px",
    height: "463px",
    overflow: "hidden",
    display: "block",
  },

  img: {
    //marginRight: "-40px",
    width: "450px",
    // height: "463px",
    objectFit: "cover",
    marginLeft: "-35px",
    //marginTop:"23px",
    //marginBottom:"62px",
    //marginRight:"48px",
    //objectFit: "cover",
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
          <p className={classes.title}>Leena Marathay</p>
          <Row className={classes.rows}>
            <Col classname="firstCol">
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
            <Col classname="secCol">
              <div className={classes.image}>
                <img
                  src={Img}
                  className={classes.img}
                  alt="An image of Leena Marathay"
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
