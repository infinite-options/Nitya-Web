import React from "react";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet";
import card1 from "../Assets/Images/card1.webp";
import ScrollToTop from "../Blog/ScrollToTop";
import "../Home/Home.css";


export default function Intro() {
  const history = useHistory();
  return (
    <div className="HomeContainer">
      <Helmet>
        <title>About</title>
        <meta
          name="description"
          content="We offer Ayurvedic health consultations, Panchakarma (cleansing & purification treatments) and classical Ayurvedic wellness therapies"
        />
        <link rel="canonical" href="/about" />
      </Helmet>
      <div className="Card">
        <div className="CardGrid">
          <div className="IntroGrid">
          <div className="CardTitle">New Client Waiver Form</div>
           
            <div onClick={() => {
              window.location.href = "/waiver-form";
            }}
                className= "ClientCardButton"
                style={{
                    textTransform: "none",
                    backgroundColor: "#d3a625",
                    color: "white",
                    fontSize: "24px",
                  
                    width: "75%",
                    height: "3rem",
                  
                    marginRight: "1.8rem",
                    marginTop: "2rem",
                    border: "0px",
                  
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  
                    cursor: "pointer",
              }}>
              View Waiver Form
            </div>

            <div onClick={() => {
              window.open("/files/NiytaNewClientWaiverForm.pdf", "_blank");
            }}
                className= "ClientCardButton"
                style={{
                    textTransform: "none",
                    backgroundColor: "#d3a625",
                    color: "white",
                    fontSize: "24px",
                  
                    width: "75%",
                    height: "3rem",
                  
                    marginRight: "1.8rem",
                    marginTop: "2rem",
                    border: "0px",
                  
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  
                    cursor: "pointer",
              }}>
              Click to Download Waiver Form
            </div>   



          </div>
        </div>
        {/*<div className="download-button" 
        style={{
                    marginLeft: "370px",
                    marginBottom: "30px"
              }}> 
          <a href="/files/NiytaNewClientWaiverForm.pdf" download="NiytaNewClientWaiverForm.pdf">
            <button type="button" className="download-button">Click to download Waiver Form</button>
          </a>
          </div> */}
      </div>
      
    </div>
    
  );
}
