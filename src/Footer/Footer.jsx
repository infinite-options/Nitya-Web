import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import ADC2024 from "../Assets/Images/ADC2024.jpg";
import CAAM from "../Assets/Images/CAAM.png";
import CMP from "../Assets/Images/CMP.jpg";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import "../Home/Home.css";
import "./Footer.css";

export default function Footer() {
  const history = useHistory();

  return (
    <div>
      <Helmet>
        <title>Address</title>
        <meta name='description' content='Visit our San Jose Office' />
        <link rel='canonical' href='/address' />
      </Helmet>

      <div className='FooterTextWrapper'>
        <div className='FooterText'>
          <div>1610 Blossom Hill Rd, Ste #1,</div>
          <div>San Jose, CA 95124</div>
        </div>

        <div className='FooterText'>
          <div className='FooterTitle'>Leena Marathay</div>
          <div>NAMA Certified Ayurvedic Practitioner</div>
        </div>

        <div className='FooterText' style={{ border: "0px" }}>
          <div>
            Office:{" "}
            <a href='tel:+14084717004' style={{ textDecoration: "None", cursor: "pointer", color: "#D3A625" }}>
              408 471 7004
            </a>
          </div>
          <div>Email: Leena@nityaayurveda.com</div>
        </div>
        <div className='FooterItem' style={{ alignItems: "center" }}>
          <img src={ADC2024} alt='ADC 2024' style={{ height: "7rem" }} />
        </div>
        <div className='FooterItem' style={{ alignItems: "center" }}>
          <img src={CAAM} alt='CAAM' style={{ height: "7rem" }} />
        </div>
        <div className='FooterItem' style={{ alignItems: "center" }}>
          <img src={CMP} alt='CMP' style={{ height: "7rem" }} />
        </div>
        <div className='FooterItem'>
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
        <div className='FooterItem' style={{ alignItems: "center" }}>
          <InstagramIcon
            fontSize='large'
            className='instagram-icon'
            style={{ color: "black", justifySelf: "center", alignSelf: "center", marginLeft: "0" }}
            onClick={(event) => (window.location.href = "https://www.instagram.com/nityaayurveda/")}
          />
        </div>
      </div>
    </div>
  );
}
