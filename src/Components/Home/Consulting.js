import React, { Component } from "react";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardGroup,
  CardSubtitle,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import { NavHashLink } from "react-router-hash-link";
import Img1 from "../../consulting1.jpg";
import Img2 from "../../consulting2.jpg";
import Img3 from "../../consulting3.jpg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    width: "78rem",
    height: "28rem",
    backgroundColor: "#dbdbdb",
    outline: "none",
  },
  img: {
    width: "39rem",
    height: "28rem",
  },
  body: {
    width: "39rem",
    float: "right",
    textAlign: "center",
    color: "#594d2c",
    padding: "4rem",
  },
  title: {
    fontSize: "2.5rem",
  },
  text: {
    fontSize: "1.3rem",
  },
  btn: {
    backgroundColor: "#d3a625",
    border: "1px solid #d3a625",
    borderRadius: "0px",
    color: "#ffffff",
    fontSize: "1.4rem",
    padding: "10px 40px",
  },
});

export default function Consulting() {
  const classes = useStyles();

  return (
    <div className="consulting" id="consulting">
      <br />
      <Card className={classes.card}>
        <Row className="no-gutters">
          <Col md={5} lg={5}>
            <CardImg className={classes.img} variant="top" src={Img1} />
          </Col>
          <Col>
            <CardBody className={classes.body}>
              <CardTitle className={classes.title}>
                First-Time Client Package
                <br />
                (online)
              </CardTitle>
              <CardText className={classes.text}>
                Personalized Ayurvedic health plan, starts herbs and a 30 min
                flup. <br />
                <NavHashLink to="#home">Learn More</NavHashLink> <br />
              </CardText>
              <Button className={classes.btn} variant="primary">
                Book Now
              </Button>
            </CardBody>
          </Col>
        </Row>
      </Card>
      <br />
      <br />
      <Card className={classes.card}>
        <Row className="no-gutters">
          <Col md={5} lg={5}>
            <CardImg className={classes.img} variant="top" src={Img2} />
          </Col>
          <Col>
            <CardBody className={classes.body}>
              <CardTitle className={classes.title}>
                Returning Client
                <br />
                (online)
              </CardTitle>
              <CardText className={classes.text}>
                Continued fine tuning of your diet, herbs and lifestyle
                practices. <br />
                <NavHashLink to="#home">Learn More</NavHashLink> <br />
              </CardText>
              <Button className={classes.btn} variant="primary">
                Book Now
              </Button>
            </CardBody>
          </Col>
        </Row>
      </Card>
      <br />
      <br />
      <Card className={classes.card}>
        <Row className="no-gutters">
          <Col md={5} lg={5}>
            <CardImg className={classes.img} variant="top" src={Img3} />
          </Col>
          <Col>
            <CardBody className={classes.body}>
              <CardTitle className={classes.title}>
                Support & Health Maintenance (online)
              </CardTitle>
              <CardText className={classes.text}>
                Support and guidance for established clients to achieve health
                goals. <br />
                <NavHashLink to="#home">Learn More</NavHashLink> <br />
              </CardText>
              <Button className={classes.btn} variant="primary">
                Book Now
              </Button>
            </CardBody>
          </Col>
        </Row>
      </Card>
      <br />
    </div>
  );
}
