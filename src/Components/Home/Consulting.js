import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import { NavHashLink } from "react-router-hash-link";
import { makeStyles } from "@material-ui/core/styles";
import LearnMoreBTN from "../Services/LearnMoreBtn";
import BookNowBTN from "../Appointment/BookNowBtn";

const useStyles = makeStyles({
  card: {
    maxWidth: "420px",
    width: "auto",
    height: "800px",
    backgroundColor: "#B28D42",
    outline: "none",
  },
  img: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%",
    height: "450px",
    width: "420px",
    objectFit: "cover",
  },
  body: {
    minWidth: "420px",
    float: "right",
    textAlign: "center",
    color: "#594d2c",
    padding: "4rem",
  },
  title: {
    // textAlign: "center",
    // width: "400px",
    fontSize: "1.4rem",
    color: "white",
  },
  text: {
    fontSize: "1.0rem",
    color: "white",
  },
  btn: {
    // backgroundColor: "#d3a625",
    backgroundColor: "transparent",
    border: "1px solid #d3a625",
    borderRadius: "0px",
    color: "#ffffff",
    fontSize: "1.4rem",
    minHeight: "40px",
  },
});

export default function Consulting() {
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
    <div
      className="consulting"
      id="consulting"
      aria-label={"consulting section"}
    >
      <br />
      <Row className={classes.container}>
        {data
          .filter((service) => service.category === "Consultation")
          .map((filteredService) => (
            <Col>
              <Card className={classes.card}>
                {/* <Col className="no-gutters"> */}
                <Row>
                  {/* <Row className="d-none d-sm-block d-md-block"> */}
                  <CardImg
                    className={classes.img}
                    variant="top"
                    src={filteredService.image_url}
                    alt={"An image of" + filteredService.title}
                  />
                </Row>
                <Row>
                  {/* <Row style={{ display: "flex", justifyContent: "center" }}> */}
                  <CardBody className={classes.body}>
                    <CardTitle className={classes.title}>
                      {filteredService.title}
                    </CardTitle>
                    <CardText className={classes.text}>
                      {filteredService.description} <br />
                      {/* <NavHashLink to="#home">Learn More</NavHashLink> <br /> */}
                      {/* <LearnMoreBTN apptID={filteredService.treatment_uid} /> */}
                    </CardText>
                    {/* <Button className={classes.btn} variant="primary">
                        Book Now
                      </Button> */}
                    <BookNowBTN apptID={filteredService.treatment_uid} />
                  </CardBody>
                </Row>
                {/* </Col> */}
              </Card>
              <br />
            </Col>
          ))}
      </Row>
    </div>
  );
}
