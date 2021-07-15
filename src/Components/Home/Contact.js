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
import { auto } from "@popperjs/core";

const useStyles = makeStyles({
  container: {
    //position: "relative",
    //top: "70px",
    //marginLeft: "90px",
    /*minHeight: "710px",
    minWidth: "600px",
    height: "auto",
    width: "auto",
    */
    width: "980px",
    height: "609px",
    //padding: "50px",
    backgroundColor: "white",
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "left",
  },

  title: {
    // marginTop: "40px",
    //textAlign: "left",
    // font: "normal normal normal 40px Hoefler Text",
    // // fontFamily: "DidoteTextW01-Italic",
    // // fontStyle: "italic",
    // // fontSize: "4rem",

    // wordWrap: "break-word",
    // color: "#b28d42",
    // lineHeight: "2",
    textAlign: "left",
    font: "normal normal normal 24px/29px SF Pro Display",
    letterSpacing: "0px",
    color: "#B28D42",
    opacity: "1",
  },

  content: {
    //font: "normal normal normal 32px/38px SF Pro Display",
    marginTop: "21px",
    // fontSize: "1.2rem",
    // fontFamily: "'Open Sans', sans-serif",
    // fontWeight: "bolder",
    // wordWrap: "break-word",
    // color: "#b28d42",
    // //lineHeight: "1.4",
    // //textAlign: "left",
    textAlign: "left",
    font: "normal normal normal 24px/29px SF Pro Display",
    letterSpacing: "0px",
    color: "#B28D42",
    opacity: "1",
    width: "490px",
  },

  form: {
    font: "normal normal normal 22px/26px SF Pro Display",
    letterSpacing: "0px",
    color: "#B28D42",
    opacity: "1",
    borderRadius: "10px",
    border: "1px solid #a8841d",
    borderWidth: "0.15em",
    width: "440px",
    height: "61px",
  },

  btn: {
    color: "white",
    fontWeight: "bolder",
    backgroundColor: "#b28d42",
    borderColor: "#b28d42",
    borderRadius: "100px",
    // marginLeft:  "150px",
    width: "243px",
    height: "60px",
    fontSize: "15px",
    //backgroundColor: "b28d42",
    //color: "#ffffff",
    //border: "1px solid #b28d42",
    //fontSize: "1.2 rem",
    //textAlign: "center",
    //padding: "5px 100px",
    //marginLeft: "40px",
    //minHeight: "60px",
    //borderRadius: "200px",
  },
  label: {
    //color: "#dbdbdb",
  },
  temp: {
    //color: "red",
    //borderColor: "yellow",
  },
  Col1: {
    width: "462px",
    marginTop: "40px",
    height: "600px",
  },
  Col2: {
    width: "518px",
    display: "flex",
    justifyContent: "center",
    marginTop: "49px",
    height: "600px",
    // marginRight:"34px"
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
    <div className="page-container">
      <div className="contact" id="contact">
        <ScrollToTop />
        <div className={classes.container}>
          <Row>
            <Col className={classes.Col1}>
              <p className={classes.title}>Contact Us</p>
              <p
                className={classes.content}
                aria-label="6055 Meridian Ave suite 40"
              >
                6055 Meridian Ave #40, <br />
                San Jose, CA 95120, USA
              </p>
              <p className={classes.content}>Office: 408 471 7004</p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3176.732452474541!2d-121.8872221846979!3d37.230325779862234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e314406ce969d%3A0x82fb75802c5ef489!2s6055%20Meridian%20Ave%20%2340%2C%20San%20Jose%2C%20CA%2095120!5e0!3m2!1sen!2sus!4v1618695078070!5m2!1sen!2sus"
                width="389px"
                height="220px"
                style={{ border: 0, borderRadius: "30px", height: "15rem" }}
                allowfullscreen=""
                loading="lazy"
              ></iframe>
            </Col>
            <Col className={classes.Col2}>
              <Form onSubmit={(e) => submit(e)}>
                <FormGroup>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                    style={{ width: "457px" }}
                    onChange={(e) => handle(e)}
                    value={data.name}
                    className={classes.form}
                  />
                </FormGroup>

                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    style={{ width: "457px" }}
                    onChange={(e) => handle(e)}
                    value={data.email}
                    className={classes.form}
                  />
                </FormGroup>

                <FormGroup>
                  <Input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                    style={{ width: "457px" }}
                    onChange={(e) => handle(e)}
                    value={data.subject}
                    className={classes.form}
                  />
                </FormGroup>

                <FormGroup>
                  <Input
                    type="textarea"
                    name="text"
                    id="message"
                    placeholder="Type your message here"
                    style={{ width: "457px", height: "139px" }}
                    onChange={(e) => handle(e)}
                    value={data.message}
                    className={classes.form}
                  />
                </FormGroup>
                <br />
                <div
                  style={{ display: "flex", justifyContent: "center" }}
                  aria-label={"click button to submit your messsage session."}
                >
                  <Button className={classes.btn}>Submit</Button>
                </div>
                <br />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <InstagramIcon
                    //backgroundColor="#B28D42"
                    fontSize="large"
                    onClick={(event) =>
                      (window.location.href =
                        "https://www.instagram.com/nityaayurveda/")
                    }
                    aria-hidden="false"
                    aria-label="Instagram"
                    style={{ color: "#b28d42" }}
                  />
                </div>
              </Form>
            </Col>
          </Row>

          {/* <div className="column">
            <p className={classes.title}>Contact Us</p>
            <p className={classes.content} aria-label="6055 Meridian Ave suite 40">
              6055 Meridian Ave #40, <br />
              San Jose, CA 95120, USA
            </p>
            <p className={classes.content}>
              <br />
              Office: 408 471 7004
            </p>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3176.732452474541!2d-121.8872221846979!3d37.230325779862234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e314406ce969d%3A0x82fb75802c5ef489!2s6055%20Meridian%20Ave%20%2340%2C%20San%20Jose%2C%20CA%2095120!5e0!3m2!1sen!2sus!4v1618695078070!5m2!1sen!2sus"
                width="500"
                height="300"
                style={{ border: 0, borderRadius:"30px", height:"15rem"}}
                allowfullscreen=""
                loading="lazy"
              ></iframe>
          </div>
          <div className="column" style={{marginTop:"-30px"}}>
            <Form onSubmit={(e) => submit(e)}>
                <FormGroup>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                    onChange={(e) => handle(e)}
                    value={data.name}
                    style={{borderRadius:"10px" , border: "1px solid #a8841d", borderWidth:"0.15em", width:"35rem", paddingTop:"25px", paddingBottom:"25px", fontSize:"1.1rem", color:"black"}}
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
                    style={{borderRadius:"10px" , border: "1px solid #a8841d", borderWidth:"0.15em", width:"35rem", paddingTop:"25px", paddingBottom:"25px", fontSize:"1.1rem", color:"black"}}
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
                    style={{borderRadius:"10px" , border: "1px solid #a8841d", borderWidth:"0.15em", width:"35rem", paddingTop:"25px", paddingBottom:"25px", fontSize:"1.1rem", color:"black"}}
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
                    style={{borderRadius:"10px" , border: "1px solid #a8841d", borderWidth:"0.15em", width:"35rem", paddingTop:"25px", paddingBottom:"25px", fontSize:"1.1rem", color:"black", height:"14.0rem"}}
                  />
                </FormGroup>
                <div
                  style={{ padding: 10, justifyContent:"center" }}
                  aria-label={"click button to submit your messsage session."}
                >
                  <Button className={classes.btn} style={{padding:"15px 100px 50px 100px", fontSize:"1.3rem"}}>Submit</Button>
                </div>
                <div>
                  <InstagramIcon
                    //backgroundColor="#B28D42"
                    fontSize="large"
                    onClick={(event) =>
                      (window.location.href =
                        "https://www.instagram.com/nityaayurveda/")
                    }
                    aria-hidden="false"
                    aria-label="Instagram"
                    style={{color:"#b28d42", marginLeft:"270px"}}
                  />
                </div>
              </Form>
              
              
              
              {/*<ul
                className="list-icons "
                style={{ color: "#ffffff", paddingTop: "100px" }}
              >
                
                <li>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                  <InstagramIcon
                    // backgroundColor="#B28D42"
                    fontSize="large"
                    onClick={(event) =>
                      (window.location.href =
                        "https://www.instagram.com/nityaayurveda/")
                    }
                    aria-hidden="false"
                    aria-label="Instagram"
                    style={{color:"black"}}
                  />
                </li>
                  </ul>*/}
          {/* </div>*/}
        </div>
      </div>
    </div>
  );
}
