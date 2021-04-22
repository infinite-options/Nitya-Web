import React from "react";
import { Button, Row, Col } from "reactstrap";
import Img from "../../card1.jpg";
import { makeStyles } from "@material-ui/core/styles";
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";
import ScrollToTop from "../../Blog/ScrollToTop";
const useStyles = makeStyles({
  container: {
    position: "relative",
    top: "70px",
    marginBottom: "120px",
    left: "220px",
    right: "80px",
    height: "750px",
    width: "1310px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    textAlign: "center",
    fontFamily: "DidoteTextW01-Italic",
    fontStyle: "italic",
    fontSize: "4.5rem",
    wordWrap: "break-word",
    color: "#d3a625",
    lineHeight: "1.5",
  },

  btn: {
    fontSize: "1.8rem",
    backgroundColor: "#d3a625",
    border: "1px solid #d3a625",
    marginLeft: "120px",
    marginTop: "40px",
    padding: "0px 60px",
  },

  img: {
    width: "600px",
    height: "450px",
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <div className="home" id="home">
        <div className={classes.container}>
          <ScrollToTop />
          <Row className={classes.rows}>
            <Col>
              <p className={classes.title}>Helping your body heal itself</p>
              <Button className={classes.btn}>Book a Session</Button>
            </Col>
            <Col>
              <img src={Img} className={classes.img} alt="spices" />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
