import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
} from "reactstrap";
import Img from "../../card1.jpg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  content: {
    /* position: "relative",
    top: "30px",
    marginBottom: "100px",
    left: "180px",
    right: "80px",
    minHeight: "40vw",
    width: "80vw",
    backgroundColor: "white",
    boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)", */
    display: "grid",
    backgroundColor: "#ffffff",
    gridTemplateColumns: "repeat(2, auto)",
    gridAutoRows: " 30%",
    gridColumnGap: "3%",
    gridRowGap: "30%",
    position: "relative",
    top: 250,
    bottom: 150,
  },

  title: {
    textAlign: "center",
    fontFamily: "'Dancing Script', cursive",
    fontStyle: "italic",
    fontSize: "7rem",
    wordWrap: "break-word",
    color: "#d3a625",
  },
  btn: {
    fontSize: "2rem",
    backgroundColor: "#d3a625",
    border: "1px solid #d3a625",
    wordWrap: "break-word",
    margin: " 50px 150px",
  },
  img: {
    width: "600px",
    height: "500px",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <div className="home" id="home">
      <Row className={classes.content}>
        <Col className={classes.col}>
          <p className={classes.title}>Helping your body heal itself</p>
          <Button className={classes.btn}>Book a Session</Button>
        </Col>
        <Col className={classes.col}>
          <img src={Img} className={classes.img} />
        </Col>
      </Row>
    </div>
  );
}
