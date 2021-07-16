import React from "react";
import Namacb from "../namacb.png";
import CAAM from "../CAAM_logo.png";
import Logo from "../Group 15.svg";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import PinterestIcon from "@material-ui/icons/Pinterest";
import "./Footer.css";
import { Button, Row, Col } from "reactstrap";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <Row>
          <Col
            style={{
              height: "200px",
              display: "flex",
              justifyContent: "center",
            }}
          ></Col>
          <Col
            style={{
              height: "200px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Row>
              <img src={Logo} style={{ width: "100%" }} />
              <div style={{ fontSize: "15px", textAlign: "left" }}>
                &copy;{new Date().getFullYear()} by Leena Marathay
              </div>
            </Row>
          </Col>
          <Col>
            <Row>
              {/* className="col-sm" */}
              {/* Column1 */}
              <Col
                style={{
                  height: "150px",
                  display: "flex",
                  justifyContent: "left",
                  paddingTop: "50px",
                }}
              >
                <h4 className="list-unstyled" style={{ fontSize: "15px" }}>
                  <li>6055 Meridian Ave, Ste.</li>
                  <li> 40A, San Jose, CA 95120</li>
                </h4>
              </Col>
              {/* Column3 */}
              <Col style={{ height: "150px", paddingTop: "50px" }}>
                <ui
                  className="list-unstyled"
                  style={{ fontSize: "15px", textAlign: "left" }}
                >
                  <li>Office: 408 471 7004</li>
                  <li>Email: Leena@nityaayurveda.com</li>
                </ui>
              </Col>

              {/* Column2 */}
              <Col
                style={{
                  height: "150px",
                  width: "800px",
                  paddingTop: "50px",
                }}
              >
                <ui className="list-unstyled">
                  <h1 style={{ fontSize: "15px", textAlign: "left" }}>
                    Leena Marathay
                  </h1>
                  <li style={{ fontSize: "15px", textAlign: "left" }}>
                    NAMA Certified Ayurvedic Practitioner
                  </li>
                </ui>
              </Col>
            </Row>
            <Row>
              <Col></Col>
              <Col
                style={{
                  paddingBottom: "50px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <img
                  src={Namacb}
                  style={{
                    width: "80px",
                    height: "80px",
                    float: "center",
                  }}
                  alt="An Image of NAMACB CAP"
                />
                <img
                  src={CAAM}
                  style={{
                    width: "198",
                    height: "80px",
                    marginLeft: "20px",
                  }}
                ></img>
              </Col>
              <Col></Col>
            </Row>
          </Col>
          <Col></Col>

          {/* Column4 */}
          {/* <Col>
            <ui className="list-unstyled">
              <img
                src={Namacb}
                style={{
                  width: "200px",
                  height: "200px",
                  float: "center",
                }}
                alt="An Image of NAMACB CAP"
              />
            </ui>
          </Col> */}
          {/* <Col></div>
          <Col>
            <ui className="list-unstyled">
              <li>
                <img
                  src={Namacb}
                  style={{
                    width: "200px",
                    height: "200px",
                    float: "center",
                  }}
                  alt="An Image of NAMACB CAP"
                />
              </li>
            </ui>
          </div> */}
          {/* <Col>
            <ul className="list-icons ">
              <li className="footer-icons">
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
          </div> */}
        </Row>
        {/* <Row>
          <Col></div>
          <div className="col-sm">
            &copy;{new Date().getFullYear()} by Leena Marathay
          </div>
          <Col></div>
        </div> */}
      </div>
    </div>
  );
}

export default Footer;
