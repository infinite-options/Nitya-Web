import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  Row,
  Col,
  CardBody,
} from "reactstrap";
import { NavHashLink } from "react-router-hash-link";
import { makeStyles } from "@material-ui/core/styles";
import BookApptBtn from "../Appointment/BookNowBtn";
import LearnMoreBTN from "../Services/LearnMoreBtn";
import BookNowBTN from "../Appointment/BookNowBtn";

const useStyles = makeStyles({
  card: {
    maxWidth: "1200px",
    width: "auto",
    height: "400px",
    backgroundColor: "#dbdbdb",
    outline: "none",
  },
  img: {
    height: "400px",
    objectFit: "cover",
  },
  body: {
    minWidth: "600px",

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
    minHeight: "40px",
  },
});

export default function Treatments() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const res = await fetch(
      "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/treatments"
    );
    const json = await res.json();
    return json.result;
  };
  useEffect(() => {
    fetchData().then((data) => {
      setData(data);
    });
  }, []);
  return (
    <div className="treatments" id="treatments" aria-label="treatments section">
      <br />
      <div className={classes.container}>
        {data
          .filter((service) => service.category === "Treatment")
          .map((filteredService) => (
            <div>
              <Card className={classes.card}>
                <Row className="no-gutters">
                  <Col className="d-none d-sm-block d-md-block">
                    <CardImg
                      className={classes.img}
                      variant="top"
                      src={filteredService.image_url}
                      alt={"An image of" + filteredService.title}
                    />
                  </Col>
                  <Col style={{ display: "flex", justifyContent: "center" }}>
                    <CardBody className={classes.body}>
                      <CardTitle className={classes.title}>
                        {filteredService.title}
                      </CardTitle>
                      <CardText className={classes.text}>
                        {filteredService.description} <br/>
                        <LearnMoreBTN apptID = {filteredService.treatment_uid}/>
                      </CardText>
                      <BookNowBTN apptID = {filteredService.treatment_uid}/>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
              <br />
            </div>
          ))}
      </div>
    </div>
  );
}
