import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import Namacb from "../Assets/Images/namacb.png";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import "../Home/Home.css";

export default function Footer() {
  const history = useHistory();

  return (
    <div>
      <Helmet>
        <title>Address</title>
        <meta name="description" content="Visit our San Jose Office" />
        <link rel="canonical" href="/address" />
      </Helmet>

      <div className="FooterTextWrapper">
        <div className="FooterText">
          <div>6055 Meridian Ave, Ste. 40A,</div>
          <div>San Jose, CA 95120</div>
        </div>

        <div className="FooterText">
          <div className="FooterTitle">Leena Marathay</div>
          <div>NAMA Certified Ayurvedic Practitioner</div>
        </div>

        <div className="FooterText" style={{ border: "0px" }}>
          <div>Office:{" "}
            <a href="tel:+14084717004" 
              style={{textDecoration: "None", cursor: "pointer", color: "#D3A625"}}>
              408 471 7004
            </a>
          </div>
          <div>Email: Leena@nityaayurveda.com</div>
        </div>
      </div>
      <div className="FooterTextWrapper">
        <div className="FooterItem">
          <img
            src={Namacb}
            style={{ height: "7rem", justifySelf: "center", alignSelf: "center" }}
            alt="NAMA"
          />
        </div>
        <div className="FooterItem">
          <div style={{ marginTop: "3rem", marginBottom: "2rem", textAlign: "center" }}>
            <button
              onClick={() => {
                history.push("/login");
              }}
              style={{
                textTransform: "none",
                cursor: "pointer",
                color: "#C3A336",
                backgroundColor: "white",
                border: "0px",
              }}
            >
              © 2021 by Leena Marathay
            </button>
          </div>
        </div>
        <div className="FooterItem" style={{alignItems: "center"}}>
          <InstagramIcon
            fontSize="large"
            className="instagram-icon"
            style={{ color: "black", justifySelf: "center", alignSelf: "center", marginLeft: "0" }}
            onClick={(event) =>
              (window.location.href = "https://www.instagram.com/nityaayurveda/")
            }
          />
        </div>
      </div>
    </div>
  );
}
