import React from "react";
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
import Img1 from "../../treatment1.jpg";
import Img2 from "../../treatment2.jpg";
import Img3 from "../../treatment3.jpg";
import { makeStyles } from "@material-ui/core/styles";
import BookApptBtn from "../Appointment/BookNowBtn";
import { Link } from "react-router-dom";
import LearnMoreBTN  from "../Services/LearnMoreBtn";
import BookNowBTN from "../Appointment/BookNowBtn";

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

export default function Treatments() {
  const classes = useStyles();

  return (
    <div className="treatments" id="treatments">
      <br />
      <Card className={classes.card}>
        <Row className="no-gutters">
          <Col md={5} lg={5}>
            <CardImg className={classes.img} variant="top" src={Img1} />
          </Col>
          <Col>
            <CardBody className={classes.body}>
              <CardTitle className={classes.title}>
                Abhyanga (not available at this point)
              </CardTitle>
              <CardText className={classes.text}>
                Nourishing and strengthening the body with oil application.
                <br />
                 {/* LearnMoreButton here */}
                 <LearnMoreBTN apptID="330-000001" />
                <NavHashLink to="#home">Learn More</NavHashLink> <br />
              </CardText>
              <Button className={classes.btn} variant="primary">
                Book Now
                {/* BookNowButton here */}
                <BookNowBTN apptID="330-000001" /> 
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
                Kati Basti (not available at this point)
              </CardTitle>
              <CardText className={classes.text}>
                Treatment for nourishing and treating lower back pain. <br />
                 {/* LearnMoreButton here */}
                 <LearnMoreBTN apptID="330-000002" />
                <NavHashLink to="#home">Learn More</NavHashLink> <br />
              </CardText>
              <Button className={classes.btn} variant="primary">
                Book Now 
                {/* BookNowButton here */}
                <BookNowBTN apptID="330-000002" /> 
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
                Hrud Basti (not available at this point)
              </CardTitle>
              <CardText className={classes.text}>
                Treatment for nourishing and opening the heart chakra. <br />
                 {/* LearnMoreButton here */}
                 
                 {/* <Button>
                  <Link to={`/330-000006/service`}>
                    what's good, click here to learn more about this appt
                  </Link>
                </Button> */}
                <LearnMoreBTN apptID="330-000003" /> 

                <NavHashLink to="#home">Learn More</NavHashLink> <br />
              </CardText>
              <Button className={classes.btn} variant="primary">
                Book Now
                {/* BookNowButton here */}
                <BookNowBTN apptID="330-000003" /> 
              </Button>
            </CardBody>
          </Col>
        </Row>
        {/* {App.state.temp} */}
      </Card>
      <br />
    </div>
  );
}
