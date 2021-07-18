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
              <img src={Logo} style={{ height: "150px" }} />
              <div style={{ fontSize: "15px", textAlign: "left" }}>
                &copy;{new Date().getFullYear()} by Leena Marathay
              </div>
            </Row>
          </Col>
          <Col md="auto">
            <Row>
              {/* className="col-sm" */}
              {/* Column1 */}
              <Col
                md="auto"
                style={{
                  height: "150px",
                  display: "flex",
                  justifyContent: "left",
                  paddingTop: "50px",
                  width: "236px",
                }}
              >
                <ui className="list-unstyled">
                  <li style={{ fontSize: "15px", textAlign: "left" }}>
                    Leena Marathay
                  </li>
                  <li style={{ fontSize: "15px", textAlign: "left" }}>
                    NAMA Certified Ayurvedic Practitioner
                  </li>
                </ui>
              </Col>
              {/* Column3 */}
              <Col md="auto" style={{ height: "150px", paddingTop: "50px" }}>
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
                md="auto"
                style={{
                  height: "150px",
                  paddingTop: "50px",
                }}
              >
                <ui className="list-unstyled" style={{ fontSize: "15px" }}>
                  <li>6055 Meridian Ave, Ste. 40A</li>
                  <li>San Jose, CA, 95120</li>
                </ui>
              </Col>
            </Row>
            <Row>
              <Col md="auto" style={{ width: "236px" }}>
                <p
                  className="list-unstyled"
                  style={{ fontSize: "15px", textDecoration: "underline" }}
                >
                  Admin Login
                </p>
              </Col>
              <Col
                md="auto"
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
                    // width: "198",
                    height: "80px",
                    marginLeft: "40px",
                  }}
                ></img>
                <div
                  style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    marginLeft: "40px",
                  }}
                >
                  <InstagramIcon
                    fontSize="large"
                    onClick={(event) =>
                      (window.location.href =
                        "https://www.instagram.com/nityaayurveda/")
                    }
                    style={{ height: "45px", width: "45px", cursor: "pointer" }}
                    aria-hidden="false"
                    aria-label="Instagram"
                  />
                </div>
              </Col>
            </Row>
          </Col>
          <Col></Col>
        </Row>
      </div>
    </div>
  );
}

export default Footer;
