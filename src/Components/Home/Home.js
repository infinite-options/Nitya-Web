import React, { useEffect, useState, useContext, useRef } from "react";
import { Button, Row, Col } from "reactstrap";
import Img from "../../card1.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import ScrollToTop from "../../Blog/ScrollToTop";
// import Contact from "./Contact";

import "./Home.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import card1 from "./card1.jpg";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 3000, min: 1430 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 1430, min: 1150 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1150, min: 800 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 800, min: 0 },
    items: 1,
  },
};

const useStyles = makeStyles({
  container: {
    width: "980px",
    height: "476px",
    backgroundColor: "white",
  },

  title: {
    // textAlign: "center",
    // font: "italic normal normal 54px/65px Hoefler Text",
    // letterSpacing: "0px",
    color: "#B28D42",
    // opacity: "1",
    // paddingTop: "90px",
    // paddingBottom:"20px",
  },

  btn: {
    // width: "243px",
    // height:"49px",
    // marginBottom:"12px",
    // fontSize:"15px",
    backgroundColor: "#B28D42",
    color: "white",
    border: "1px solid #B28D42",
    borderRadius: "100px",
  },

  img: {
    // width:"555px",
    // height:"476px",
  },

  carousel: {
    // marginBottom: "-50px",
    // marginTop:"10px",
  },
  leftCol: {
    // width: "425px",
    // float: "left",
    backgroundColor: "white",
  },

  rightCol: {
    // width: "555px",
    // float: "right",

    // backgroundPosition: "36% 58%",
    // backgroundSize: "120%",
    filter: "saturate(130%)",
  },
});

export default function Home() {
  const classes = useStyles();
  const carouselRef = useRef();
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
            id="img"
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

  function goToSlide2(slideNum) {
    if (carouselRef && carouselRef.current)
      carouselRef.current.goToSlide(slideNum);
  }

  function renderCase1() {
    setWindowState("1");
  }

  function renderCase2() {
    setWindowState("2");
    goToSlide2();
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
          id="title"
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
        <div aria-label="Home block">
          <ScrollToTop />
          <div className={classes.container} id="container">
            <div className={classes.leftCol} id="leftCol">
              <p className={classes.title} id="title">
                Helping your body heal itself
              </p>
              <div
                aria-label={"click button to book a session."}
                style={{ textAlign: "center" }}
              >
                <Button
                  className={classes.btn}
                  id="btn"
                  onClick={() => {
                    goToSlide2(0);
                  }}
                >
                  What is Ayurveda?
                </Button>
              </div>
              <div
                aria-label={"click button to book a session."}
                style={{ textAlign: "center" }}
              >
                <Button
                  className={classes.btn}
                  id="btn"
                  onClick={() => {
                    goToSlide2(1);
                  }}
                >
                  Is Ayurveda for you?
                </Button>
              </div>
            </div>

            <div className={classes.rightCol} id="rightCol">
              <Carousel
                responsive={responsive}
                arrows={false}
                showDots={true}
                ref={carouselRef}
                autoPlay={true}
                autoPlaySpeed={10000}
                infinite={true}
              >
                <img src={card1} className={classes.img} id="img" />
                <div
                  style={{
                    color: "white",
                    textAlign: "center",
                    padding: "5%",
                    backgroundColor: "#B28D42",
                    height: "476px",
                  }}
                >
                  <h1
                    style={{
                      font: "italic normal normal 40px Hoefler Text",
                      marginTop: "30px",
                      marginBottom: "30px",
                    }}
                  >
                    What is Ayurveda?
                  </h1>
                  <p
                    style={{ font: "normal normal normal 20px SF Pro Display" }}
                  >
                    Ayurvedic Medicine is the traditional holistic medical
                    science of ancient India. Orgin of Ayurveda dates back more
                    than 5,000 years ago, yet its principles are applicable to
                    our modern life. Today, it is practiced not only in India,
                    but also has become popular in the U.S. and all over the
                    world.
                  </p>
                  <p
                    style={{ font: "normal normal normal 20px SF Pro Display" }}
                  >
                    Nitya Ayurveda brings theis classical Ayurvedic healthcare
                    to clients in the South Bay. We offer Ayurvedic health
                    consultations; herbal suggestions, diet & lifestyle plans
                    and Ayurvedic body therapies to our clients. Every client is
                    treated holistically.
                  </p>
                </div>
                <div
                  style={{
                    color: "white",
                    textAlign: "center",
                    padding: "5%",
                    backgroundColor: "#B28D42",
                    height: "476px",
                  }}
                >
                  <h1
                    style={{
                      font: "italic normal normal 40px Hoefler Text",
                      marginTop: "30px",
                      marginBottom: "30px",
                    }}
                  >
                    Is Ayurveda for you?
                  </h1>
                  <p
                    style={{ font: "normal normal normal 20px SF Pro Display" }}
                  >
                    If you're seeking Ayurvedic treatment and wondering if this
                    system of medicine will work for you, try to answer these
                    two simple questions:
                  </p>
                  <p
                    style={{ font: "normal normal normal 20px SF Pro Display" }}
                  >
                    1. Do you suspect that your diet, lifestyle, the supplements
                    you are taking may have something to do with your current
                    health issue?
                  </p>
                  <p
                    style={{ font: "normal normal normal 20px SF Pro Display" }}
                  >
                    2. Are you willing to make changes in your diet and
                    lifestyle?
                  </p>
                  <p
                    style={{ font: "normal normal normal 20px SF Pro Display" }}
                  >
                    If your answer is "yes" to both questions then Ayurveda is
                    probably for you!
                  </p>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
