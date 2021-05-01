import React from "react";
import { Button, Row, Col } from "reactstrap";
import Img from "../../card1.jpg";
import { makeStyles } from "@material-ui/core/styles";

import ScrollToTop from "../../Blog/ScrollToTop";
const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: "70px",
    marginBottom: "150px",
    minHeight: "710px",
    minWidth: "600px",
    height: "auto",
    width: "auto",
    padding: "100px",
    backgroundColor: "white",
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
    fontSize: "1.2rem",
    color: "#ffffff",
    backgroundColor: "#d3a625",
    border: "1px solid #d3a625",
    marginTop: "40px",
    marginBottom: "20px",
    minHeight: "60px",
  },

  img: {
    width: "600px",
    height: "530px",
    objectFit: "cover",
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <div className="home" id="home">
        <div className={classes.container} aria-label="Home block">
          <ScrollToTop />
          <Row className={classes.rows}>
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <p className={classes.title}>Helping your body heal itself</p>

              <div
                aria-label={"click button to book a session."}
                style={{ textAlign: "center" }}
              >
                <Button className={classes.btn}>Book a Session</Button>
              </div>
            </Col>
            <Col style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={Img}
                className={classes.img}
                alt="An spices image for home block"
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
