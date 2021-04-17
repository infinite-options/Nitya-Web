import React from "react";
import Namacb from "../../namacb.png";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import PinterestIcon from "@material-ui/icons/Pinterest";
import "./Footer.css";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h4 className="list-unstyled">
              <li>36055 Meridian Ave, Ste. 40A,</li>
              <li>San Jose, CA 95120</li>
            </h4>
          </div>
          {/* Column2 */}
          <div className="col" id="main-col">
            <ui className="list-unstyled">
              <h1>Leena Marathay</h1>
              <br></br>
              <li>NAMA Certified Ayurvedic Practitioner</li>
            </ui>
          </div>
          {/* Column3 */}
          <div className="col">
            <ui className="list-unstyled">
              <li>Office: 408 471 7004</li>
              <br></br>
              <li>Email: Leena@nityaayurveda.com</li>
            </ui>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <ui className="list-unstyled">
              <li>
                <img
                  src={Namacb}
                  style={{
                    width: "200px",
                    height: "200px",
                    float: "center",
                  }}
                  alt="namacb"
                />
              </li>
            </ui>
          </div>
          <div className="col">
            <ul className="list-icons ">
              <li className="footer-icons">
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
              <li className="footer-icons">
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
              <li className="footer-icons">
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
          </div>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col-sm">
            &copy;{new Date().getFullYear()} by Leena Marathay
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
