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
    border: "1px solid #ffffff",
  },
  btn: {
    backgroundColor: "#d3a625",
    color: "#ffffff",
    border: "1px solid #ffffff",
    fontSize: "2rem",
    textAlign: "center",
    padding: "5px 150px",
    marginLeft: "40px",
    minHeight: "60px",
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
              <p className={classes.content}>
                6055 Meridian Ave #40, San Jose, CA 95120, USA <br />
                Office: 408 471 7004
              </p>
              <MapSection location={location} zoomLevel={13} />​
            </Col>
            <Col
              className={classes.form}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Form onSubmit={(e) => submit(e)}>
                <Row form>
                  <Col md={6}>
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
                  </Col>
                  <Col md={6}>
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
                  </Col>
                </Row>
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
