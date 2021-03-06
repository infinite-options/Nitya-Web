import React, { useState } from "react";
import Axios from "axios";
import { Row, Col } from "reactstrap";
import { Button, Form, FormGroup, Input } from "reactstrap";
import MapSection from "./Map";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import PinterestIcon from "@material-ui/icons/Pinterest";
import { makeStyles } from "@material-ui/core/styles";
import ScrollToTop from "../../Blog/ScrollToTop";

const useStyles = makeStyles({
  container: {
    position: "relative",
    top: "70px",
    marginBottom: "200px",
    minHeight: "710px",
    minWidth: "600px",
    height: "auto",
    width: "auto",
    padding: "50px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    marginTop: "-40px",
    textAlign: "left",
    font: "normal normal normal 54px/65px Hoefler Text",
    // fontFamily: "DidoteTextW01-Italic",
    // fontStyle: "italic",
    // fontSize: "4rem",
    wordWrap: "break-word",
    color: "#b28d42",
    lineHeight: "2",
  },
  content: {
    font: "normal normal normal 32px/38px SF Pro Display",
    // fontSize: "1.5rem",
    // fontFamily: "'Open Sans', sans-serif",
    wordWrap: "break-word",
    color: "#b28d42",
    lineHeight: "1.4",
    textAlign: "left",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dbdbdb",
    paddingTop: "12rem",
    paddingBottom: "10rem",
    border: "1px solid #ffffff",
  },
  btn: {
    backgroundColor: "white",
    color: "#ffffff",
    border: "1px solid #ffffff",
    fontSize: "2rem",
    textAlign: "center",
    padding: "5px 150px",
    marginLeft: "40px",
    minHeight: "60px",
  },
  label: {
    color: "#dbdbdb",
  },
  temp: {
    color: "red",
    borderColor: "yellow",
  },
});

const location = {
  address: "6055 Meridian Ave #40, San Jose, CA 95120, USA",
  lat: 37.23022,
  lng: -121.88534,
};
export default function Contact() {
  const classes = useStyles();
  const url =
    "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/addContact";
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function submit(e) {
    e.preventDefault();
    Axios.post(url, {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    })
      .catch((error) => {
        console.log(error.message);
      })
      .then((response) => {
        console.log(response);
      });
  }
  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }
  return (
    <div className="page-container ">
      <div className="contact" id="contact">
        <div className={classes.container}>
          <ScrollToTop />
          <Row>
            <Col>
              <p className={classes.title}>Contact Us</p>
              <p
                className={classes.content}
                aria-label="6055 Meridian Ave suite 40"
              >
                6055 Meridian Ave #40,
              </p>
              <p className={classes.content}>
                San Jose, CA 95120, USA <br />
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
            <Col
              className={classes.form}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Form onSubmit={(e) => submit(e)}>
                <FormGroup>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    onChange={(e) => handle(e)}
                    value={data.name}
                  />
                </FormGroup>

                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={(e) => handle(e)}
                    value={data.email}
                  />
                </FormGroup>

                <FormGroup>
                  <Input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                    onChange={(e) => handle(e)}
                    value={data.subject}
                  />
                </FormGroup>

                <FormGroup>
                  <Input
                    type="textarea"
                    name="text"
                    id="message"
                    placeholder="Type your message here"
                    onChange={(e) => handle(e)}
                    value={data.message}
                  />
                </FormGroup>
                <div
                  style={{ padding: 10 }}
                  aria-label={"click button to submit your messsage session."}
                >
                  <Button className={classes.btn}>Submit</Button>
                </div>
              </Form>

              <ul
                className="list-icons "
                style={{ color: "#ffffff", paddingTop: "100px" }}
              >
                <li>
                  <InstagramIcon
                    // backgroundColor="#B28D42"
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
