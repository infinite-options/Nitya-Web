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
  row: {
    float: "center",
  },
  root: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    height: "600px",
    margin: "30px 80px",
    paddingTop: "40px",
  },
  title: {
    fontSize: "80px",
    color: "#d3a625",
    textAlign: "center",
  },
  btn: {},
});

export default function Services() {
  const classes = useStyles();

  return (
    <Row id="services">
      <Card className={classes.root}>
        <CardBody>
          <CardTitle className={classes.title}>
            Helping your body heal itself
          </CardTitle>
          <Button className={classes.btn}>Book a Session</Button>
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
    </Row>
  );
}
