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
  container: {
    //width: "80vw",
    //height: "70vh",
    //width: "100%",
    // alignItems: "left",
    // marginLeft: "-50px",
    //height: "360px",
    //width: "888.73px",
  },

  card: {
    // maxWidth: "420px",
    //width: "20rem",
    // height: "800px",
    //height: "42rem",
    height: "360px",
    width: "888.73px",
    border: "none",
    //outline: "none",
    //float: "right",
    marginBottom: "44px",
    // marginLeft: "-100px",
    // marginRight: "-80px",
  },
  images: {
    display: "block",
    width: "476.73px",
    overflow: "hidden",
    height: "360px",
    //float: "left",
    //height: "20rem",
    //paddingLeft: "14px",
    //paddingRight: "14px",
    //width: "auto",
    // width: "25rem",
    //height: "20rem",
    // width: "33.3%",
    // height: "450px",
    // width: "420px",
    //objectFit: "cover",
    //display: "inline-block",
  },
  img: {
    width: "476.73px",
    objectFit: "cover",
    height: "360px",
  },
  body: {
    backgroundColor: "#B28D42",
    // minWidth: "420px",
    //marginLeft:"525px",
    height: "360px",
    width: "412px",
    // display: "flex",
    // alignItems:"center",
    // textAlign: "center",
    color: "#594d2c",
    //float:"right",
    // paddingTop: "4rem",
    // padding: "4rem",
    paddingTop: "44px",
    //paddingRight:"50px",
    //paddingLeft:"57px",
  },
  title: {
    // textAlign: "center",
    // width: "400px",
    // fontSize: "1.4rem",

    // color: "black",

    textAlign: "center",
    font: "normal normal normal 24px/26px Hoefler Text",
    letterSpacing: "0.6px",
    color: "#FFFFFF",
  },
  text: {
    // fontSize: "1.0rem",
    // color: "black",
    textAlign: "center",
    font: "normal normal normal 22px/26px SF Pro Display",
    letterSpacing: "0.55px",
    color: "#FFFFFF",
  },
  LMbtn: {
    // textAlign: "center",
    display: "flex",
    justifyContent: "center",
  },
  divBody: {
    //width:"400px",
    //marginLeft:""
  },

  // btn: {
  //   // backgroundColor: "#d3a625",
  //   backgroundColor: "transparent",
  //   border: "1px solid #d3a625",
  //   borderRadius: "0px",
  //   color: "#ffffff",
  //   fontSize: "1.4rem",
  //   minHeight: "40px",
  // },
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
                  <div className={classes.images}>
                    <img
                      className={classes.img}
                      variant="top"
                      src={filteredService.image_url}
                      alt={"An image of" + filteredService.title}
                    />
                  </div>
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
                    <LearnMoreBTN />
                    <br />
                    <BookNowBTN apptID={filteredService.treatment_uid} />
                  </CardBody>
                </Row>
                {/* </Col> */}
              </Card>
              <br />
            </Col>
          ))}
      </Row>

      {/* <div className={classes.LMbtn}>
        <LearnMoreBTN  />
      </div> */}
    </div>
  );
}
