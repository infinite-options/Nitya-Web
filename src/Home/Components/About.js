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
import Img from "../../card2.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  row: {
    float: "center",
  },
  root: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    height: "600px",
    marginTop: "30px",
    paddingTop: "40px",
  },
  title: {
    fontSize: "80px",
    color: "#d3a625",
    textAlign: "center",
  },
  info: {
    fontSize: "20px",
    color: "#8d6f1a",
    textAlign: "justify",
  },
});

export default function About() {
  const classes = useStyles();

  return (
    <Row id="about">
      <Col></Col>
      <Col lg="10">
        <Card className={classes.root}>
          <CardBody>
            <CardTitle className={classes.title}>Leena Marathay</CardTitle>
            <CardText className={classes.info}>
              <p>
                Leena is a NAMA (National Ayurvedic Medical Association)
                certified Ayurvedic Practitioner and an Ayurvedic Health and
                Lifestyle Counselor.
              </p>
              <p>
                She received her Classical Ayurveda training at Shubham Academy
                of Ayurveda in Fremont, California and has completed more than
                4,000 hours of training based on traditional Ayurvedic texts,
                covering diagnosis, Ayurvedic body treatments and clinical
                practice.
              </p>
              <p>
                Leena specializes in understanding the root cause of each
                client's health imbalance and suggests an individualized health
                plan guiding her clients to achieve optimum health with lasting
                results.
              </p>
            </CardText>
          </CardBody>
          <CardImg
            src={Img}
            alt="Card image cap"
            style={{
              width: "700px",
              height: "500px",
              padding: "30px",
            }}
          />
        </Card>
      </Col>
      <Col></Col>
    </Row>
  );
}
