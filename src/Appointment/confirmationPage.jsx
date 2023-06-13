import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import "./calendar.css";
import "../Home/Home.css";
import "../Appointment/AppointmentPage.css";

const google = window.google;

const useStyles = makeStyles({
  MobileContainerDivider: {
    height: "calc(100% - 174px)",
    display: "flex",
    width: "100%",
    "@media (max-width: 500px)": {
      height: "auto",
      display: "flex",
      flexDirection: "column",
    },
  },

  MobileContainerSubDivider: {
    borderRight: "1px solid #D3A625",
    height: "100%",
    width: "50%",
    marginLeft: "30px",
    marginBottom: "10px",
    "@media (max-width: 500px)": {
      width: "100%",
      borderRight: "0px solid #D3A625",
      marginLeft: "0px",
    },
  },
});

export default function ConfirmationPage(props) {
  // const google = window.google;

  console.log("window: ", window);
  console.log("window.google: ", google);

  const classes = useStyles();
  const location = useLocation();

  const scaleWidthFn = () => {
    return 280 - (810 - dimensions.width) * 0.4;
  };

  const scaleHeightFn = (y) => {
    return 210 - (810 - dimensions.width) * 0.3;
  };

  console.log("(confirmationPage) props 1: ", props);
  console.log("(confirmationPage) props 2: ", props.location);
  console.log("location: ", location);

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    console.log("RERENDER -- window: ", window);
    console.log("RERENDER -- window.google: ", window.google);
    // console.log("RERENDER -- this.google: ", this.google);
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);

    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {}, []);

  return (
    <div className="HomeContainer">
      <div className="Card">
        <div className="TitleFontAppt" style={{ marginTop: "1rem" }}>
          <div>Booking Confirmed</div>
          <div className="CardText" style={{ marginTop: "1rem" }}>
            We have sent a confirmation email to:
          </div>
          <div className="CardText">{location.state.apptInfo.email}</div>
        </div>

        <div className="CardGrid">
          <div>
            <div className="ApptPageTitle">
              {location.state.apptInfo.treatment}
            </div>

            <div className="ApptPageHeader">
              {location.state.apptInfo.duration} |{" "}
              {location.state.apptInfo.purchase_price}
            </div>

            <div style={{ margin: "1rem" }}>
              <img
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                variant="top"
                src={location.state.apptInfo.image_url}
                alt={"An image of" + location.state.apptInfo.title}
              />
            </div>
          </div>

          <div style={{ padding: "1rem" }}>
            <div
              style={{
                color: "#D3A625",
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              If anything changes we will contact you:
            </div>

            <div
              className="CardText"
              style={{ color: "black", marginTop: "1rem" }}
            >
              <div
              // style={{
              //   fontSize: '22px',
              //   fontWeight: '300',
              // //  margin: '16px 0 0 0'
              // }}
              >
                {location.state.apptInfo.first_name}
              </div>
              <div
              // style={{
              //   fontSize: '22px',
              //   fontWeight: '300',
              // }}
              >
                {location.state.apptInfo.phone_no}
              </div>
            </div>

            <div className="CardText" style={{ marginTop: "1rem" }}>
              How to prepare for your consultation:
            </div>

            <div>
              <div
                style={{
                  color: "#D3A625",
                  fontSize: "16px",
                  //  margin: '12px 0 0 0'
                }}
              >
                Bring these things to your consultation:
              </div>

              <div
                style={{
                  marginTop: "2rem",
                  fontSize: "16px",
                  // margin: '12px 0 0 0',
                  paddingBottom: "2rem",
                }}
              >
                List of your current medication, diet, and food preferences
              </div>
            </div>
          </div>
        </div>
        <div className="TitleFontAppt">We'll see you at:</div>
        <div
          style={{ display: "flex", justifyContent: "center", margin: "1rem" }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3176.732452474541!2d-121.8872221846979!3d37.230325779862234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e314406ce969d%3A0x82fb75802c5ef489!2s6055%20Meridian%20Ave%20%2340%2C%20San%20Jose%2C%20CA%2095120!5e0!3m2!1sen!2sus!4v1618695078070!5m2!1sen!2sus"
            width="100%"
            className="Contact_Map"
            allowfullscreen=""
            loading="lazy"
            style={{ marginRight: "0rem" }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
