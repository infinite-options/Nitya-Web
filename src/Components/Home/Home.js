import React, { useEffect, useState, useContext } from "react";
import { Button, Row, Col } from "reactstrap";
import Img from "../../card1.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import ScrollToTop from "../../Blog/ScrollToTop";
// import Contact from "./Contact";

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
  const [windowState, setWindowState] = useState("1");
  const card1P1 =
    "Ayurvedic Medicine is the traditional holistic medical science of ancient India. Origin of Ayurveda dates back more than 5,000 years ago, yet its principles are applicable to our modern life. Today, it is practiced not only in India, but also has become popular in the U.S. and all over the world.";
  const card1P2 =
    "Nitya Ayurveda brings this classical Ayurvedic healthcare to clients in the South Bay. We offer Ayurvedic health consultations; herbal suggestions, diet & lifestyle plans and Ayurvedic body therapies to our clients. Every client is treated holistically taking into account the uniqueness of his/her mind, body and causative factors. Nitya Ayurveda supports clients in their journey in maintaining health and bringing harmony and balance to their life.";
  const card2P1 =
    " A typical Ayurvedic health plan begins with changing your eating habits, eliminating certain foods from your diet or simply fasting along with some digestive herbs or teas. Some people are able to follow this kind of advice very well while others find it an absolute impossibility!";
  const card2P2 =
    " So if you’re seeking Ayurvedic treatment and wondering if this system of medicine will work for you, try to answer these two simple questions: 1. Do you suspect that your diet, lifestyle, the supplements you are taking may have something to do with your current health issue? Yes or No 2. Are you willing to make changes in your diet and lifestyle? Yes or No If your answer is “yes” to both questions then Ayurveda is probably for you!";

  function renderWindow(arg) {
    switch (arg) {
      case "1":
        return (
          <img
            src={Img}
            className={classes.img}
            alt="An spices image for home block"
          />
        );
      case "2":
        return renderTextCard("2");
      case "3":
        return renderTextCard("3");
      default:
        return <h1>There seems to be a prolem with the Home Component.</h1>;
    }
  }
  function renderCase1() {
    setWindowState("1");
  }

  function renderCase2() {
    setWindowState("2");
  }
  function renderCase3() {
    setWindowState("3");
  }
  function renderTextCard(arg) {
    let title = "";
    let para1 = "";
    let para2 = "";

    if (arg === "2") {
      title = "What is Ayurveda?";
      para1 = card1P1;
      para2 = card1P2;
    } else if (arg === "3") {
      title = "Is Ayurveda for you?";
      para1 = card2P1;
      para2 = card2P2;
    }

    return (
      <div>
        <h3
          className={classes.title}
          style={{
            textAlign: "center",
            color: "white",
          }}
        >
          {title}
        </h3>
        <h3
          style={{
            font: "normal normal normal 36px/43px SF Pro Display",
            textAlign: "center",
            color: "white",
          }}
        >
          {para1}
        </h3>
        <h3
          style={{
            font: "normal normal normal 36px/43px SF Pro Display",
            textAlign: "center",
            color: "white",
          }}
        >
          {para2}
        </h3>
      </div>
    );
  }

  return (
    <>
      <div className="home" id="home">
        <div className={classes.container} aria-label="Home block">
          <ScrollToTop />
          {/* <Row className={classes.rows}> */}
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <p className={classes.title}>Helping your body heal itself</p>

            {/* <div
                aria-label={"click button to book a session."}
                style={{ textAlign: "center" }}
              >
                <Button className={classes.btn} href="/services">Book a Session</Button>
              </div> */}
            <div
              aria-label={"click button to book a session."}
              style={{ textAlign: "center" }}
            >
              <Button className={classes.btn} onClick={renderCase2}>
                What is Ayurveda ?
              </Button>
            </div>
            <div
              aria-label={"click button to book a session."}
              style={{ textAlign: "center" }}
            >
              <Button className={classes.btn} onClick={renderCase3}>
                Is Ayurveda for you?
              </Button>
            </div>
          </Col>

          <Col
            style={{
              backgroundColor: "#b28d42",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Row>
              {renderWindow(windowState)}

              <Row>
                <Col>
                  <Button
                    style={{
                      display: "block",
                      borderRadius: "50%",
                    }}
                    className={classes.btn}
                    onClick={renderCase1}
                  >
                    Image
                  </Button>
                </Col>
                <Col>
                  <Button className={classes.btn} onClick={renderCase2}>
                    What is Ayurveda ?
                  </Button>
                </Col>
                <Col>
                  <Button className={classes.btn} onClick={renderCase3}>
                    Is Ayurveda for you?
                  </Button>
                </Col>
              </Row>
            </Row>
          </Col>
          {/* </Row> */}
        </div>
      </div>
    </>
  );
}
