import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import MapSection from "./Map";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import PinterestIcon from "@material-ui/icons/Pinterest";
import { makeStyles } from "@material-ui/core/styles";
import ReactDOM from "react-dom";

const useStyles = makeStyles({
  container: {
    //from home.js
    display: "flex",
    justifyContent: "center",
    padding: "40px 40px 20px 20px",
  },
  block: {
    backgroundColor: "white",
    alignItems: "center",
    width: "1310px",
    padding: "40px 40px 20px 20px",
  },
  title: {
    marginTop: "-40px",
    textAlign: "center",
    fontFamily: "DidoteTextW01-Italic",
    fontStyle: "italic",
    fontSize: "4rem",
    wordWrap: "break-word",
    color: "#d3a625",
    lineHeight: "2",
  },
  content: {
    fontSize: "1.5rem",
    fontFamily: "'Open Sans', sans-serif",
    wordWrap: "break-word",
    color: "#8d6f19",
    lineHeight: "1.4",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dbdbdb",
    paddingTop: "12rem",
    paddingBottom: "10rem",
  },
  btn: {
    backgroundColor: "#d3a625",
    color: "#ffffff",
    border: "1px solid #ffffff",
    fontSize: "2rem",
    textAlign: "center",
    padding: "5px 150px",
    marginLeft: "40px",
  },
  mapbox: {
    width: "400",
    height: "300",
    border: 0,
  },
});

const location = {
  address: "6055 Meridian Ave #40, San Jose, CA 95120, USA",
  lat: 37.23022,
  lng: -121.88534,
};

class App extends React.Component {
  render() {
    return (
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12706.929860537912!2d-121.89376680094966!3d37.230325479371636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e314406ce969d%3A0x6c71e70cac1b5cf6!2s6055%20Meridian%20Ave%2C%20San%20Jose%2C%20CA%2095120!5e0!3m2!1sen!2sus!4v1618065469524!5m2!1sen!2sus" />
    );
  }
}

export default function Contact() {
  const classes = useStyles();

  return (
    <div className="contact" id="contact">
      <div className={classes.container}>
        <div className={classes.block}>
          <Row>
            <Col>
              <p className={classes.title}>Contact Us</p>
              <p className={classes.content}>
                6055 Meridian Ave #40, San Jose, CA 95120, USA <br />
                Office: 408 471 7004
              </p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3176.732452474541!2d-121.8872221846979!3d37.230325779862234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e314406ce969d%3A0x82fb75802c5ef489!2s6055%20Meridian%20Ave%20%2340%2C%20San%20Jose%2C%20CA%2095120!5e0!3m2!1sen!2sus!4v1618695078070!5m2!1sen!2sus"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
              ></iframe>
            </Col>
            <Col className={classes.form} s>
              <Form>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                  />
                </FormGroup>

                <FormGroup>
                  <Input
                    type="textarea"
                    name="text"
                    id="exampleText"
                    placeholder="Type your message here"
                  />
                </FormGroup>

                <Button className={classes.btn}>Submit</Button>
              </Form>
              <ul
                className="list-icons "
                style={{ color: "#ffffff", paddingTop: "100px" }}
              >
                <li>
                  <FacebookIcon
                    fontSize="large"
                    onClick={(event) =>
                      (window.location.href =
                        "https://www.instagram.com/nityaayurveda/")
                    }
                    aria-hidden="false"
                    aria-label="Facebook"
                  />
                </li>
                <li>
                  <TwitterIcon
                    fontSize="large"
                    onClick={(event) =>
                      (window.location.href =
                        "https://www.instagram.com/nityaayurveda/")
                    }
                    aria-hidden="false"
                    aria-label="Twitter"
                  />
                </li>
                <li>
                  <PinterestIcon
                    fontSize="large"
                    onClick={(event) =>
                      (window.location.href =
                        "https://www.instagram.com/nityaayurveda/")
                    }
                    aria-hidden="false"
                    aria-label="Pinterest"
                  />
                </li>
                <li>
                  <InstagramIcon
                    fontSize="large"
                    onClick={(event) =>
                      (window.location.href =
                        "https://www.instagram.com/nityaayurveda/")
                    }
                    aria-hidden="false"
                    aria-label="Instagram"
                  />
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
