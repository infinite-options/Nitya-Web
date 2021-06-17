import React from "react";
import Namacb from "../namacb.png";
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
          <Col>
            <Row>
              <img
                src={Logo}
                // style={
                //   height= "100px",
                //   width= "100px",}
              />
            </Row>
            <Row>
              <div className="col-sm">
                &copy;{new Date().getFullYear()} by Leena Marathay
              </div>
            </Row>
          </Col>

          {/* Column1 */}
          <Col>
            <h4 className="list-unstyled">
              <li>36055 Meridian Ave, Ste.</li>
              <li> 40A, San Jose, CA 95120</li>
            </h4>
          </Col>

          {/* Column2 */}
          <Col>
            <ui className="list-unstyled">
              <li>Office: 408 471 7004</li>

              <li>Email: Leena@nityaayurveda.com</li>
            </ui>
          </Col>

          {/* Column3 */}
          <Col>
            <ui className="list-unstyled">
              <h1>Leena Marathay</h1>
              <li>NAMA Certified Ayurvedic Practitioner</li>
            </ui>
          </Col>

          {/* Column4 */}
          <Col>
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
          </Col>
        </Row>
        <hr />
        <Row>
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
