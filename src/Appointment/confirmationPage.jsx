import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import "./calendar.css";
import "../Home/Home.css";
import "../Appointment/AppointmentPage.css";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import moment from "moment-timezone";

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
  const calculateEndTime = (startTime, duration) => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [durationHours, durationMinutes, durationSeconds] = duration
      .split(":")
      .map(Number);
  
    //duration into total minutes
    const totalDurationMinutes =
      durationHours * 60 + durationMinutes + Math.floor(durationSeconds / 60);
  
    //total duration to the start time
    const totalStartMinutes = startHours * 60 + startMinutes;
    const totalEndMinutes = totalStartMinutes + totalDurationMinutes;
  
    //end time in hours and minutes
    const endHours = Math.floor(totalEndMinutes / 60) % 24; 
    const endMinutes = totalEndMinutes % 60;
  
    return `${endHours.toString().padStart(2, "0")}:${endMinutes
      .toString()
      .padStart(2, "0")}`;
  };

  // Function to convert time to user's timezone
  const convertToUserTimezone = (appointmentDate, appointmentTime) => {
    try {
      // Get user's timezone
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      // Create a moment object in Pacific time (assuming appointments are scheduled in PST/PDT)
      const pacificTime = moment.tz(`${appointmentDate} ${appointmentTime}`, "America/Los_Angeles");
      
      // Convert to user's timezone
      const userTime = pacificTime.tz(userTimezone);
      
      // Format time in 12-hour format
      const formattedTime = userTime.format("h:mm A");
      
      // Get timezone abbreviation
      const timezoneAbbr = userTime.format("z");
      
      return {
        time: formattedTime,
        timezone: timezoneAbbr
      };
    } catch (error) {
      console.error("Error converting timezone:", error);
      // Fallback to original time if conversion fails
      return {
        time: appointmentTime,
        timezone: "PST"
      };
    }
  };

  // Function to get timezone abbreviation
  const getTimezoneAbbreviation = () => {
    try {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const now = moment.tz(userTimezone);
      return now.format("z");
    } catch (error) {
      console.error("Error getting timezone abbreviation:", error);
      return "PST";
    }
  };

  const startTime = location.state.apptInfo.appointmentTime;
  const duration = location.state.apptInfo.duration;
  const endTime = calculateEndTime(startTime, duration);
  
  // Convert times to user's timezone
  const appointmentDate = location.state.apptInfo.appointmentDate;
  const startTimeConverted = convertToUserTimezone(appointmentDate, startTime);
  const endTimeConverted = convertToUserTimezone(appointmentDate, endTime);
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
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    
    const dayOfMonth = date.getDate();
    const monthName = date.toLocaleString("default", { month: "long" });
    const yearValue = date.getFullYear();
  
    // Add ordinal suffix to the day
    const ordinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };
  
    return `${dayOfMonth}${ordinalSuffix(dayOfMonth)} ${monthName}, ${yearValue}`;
  };

  useEffect(() => { }, []);

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
            <div className="ApptPageTitle">{location.state.apptInfo.treatment}</div>

            <div className="ApptPageHeader">
              {location.state.apptInfo.purchase_price}
            </div>
            <div className="ApptPageText">
            <strong>Date:</strong> {formatDate(location.state.apptInfo.appointmentDate)}
          </div>
          <div className="ApptPageText">
            <strong>Time:</strong>  {startTimeConverted.time} - {endTimeConverted.time} {startTimeConverted.timezone}
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

            <div className="CardText" style={{ color: "black", marginTop: "1rem" }}>
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
              <div
              // style={{
              //   fontSize: '22px',
              //   fontWeight: '300',
              // }}
              >
                {location.state.apptInfo.email}
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
                List of your current medication, diet, food preferences, and this filled out waiver
              </div>
              <Link
                to={{ pathname: "/waiver" }}
                className="nav-link"
              >
                <Button
                  className={classes.bookButton}
                  style={{ marginLeft: "2rem", borderRadius: "24px" }}
                  variant="contained"
                  component="span"
                  type="button"
                // onClick={onImageUpload}
                >
                  Waiver
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Conditional content based on appointment mode */}
        {location.state.apptInfo.mode === "In-Person" ? (
          <div>
            <div className="TitleFontAppt">We'll see you at:</div>
            <div style={{ display: "flex", justifyContent: "center", margin: "1rem" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3176.4933191234104!2d-121.90686878683185!3d37.23600137200993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e36ab01586fa9%3A0xe80e7882881a56a0!2s1610%20Blossom%20Hill%20Rd%20%231%2C%20San%20Jose%2C%20CA%2095124!5e0!3m2!1sen!2sus!4v1714712803119!5m2!1sen!2sus"
                width="100%"
                className="Contact_Map"
                allowfullscreen=""
                loading="lazy"
                style={{ marginRight: "0rem" }}
              ></iframe>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <div className="TitleFontAppt" style={{ marginBottom: "15px" }}>
              We'll see you Online
            </div>
            <div className="CardText" style={{ fontSize: "18px", lineHeight: "1.6" }}>
              We'll send a link out 5 min before the meeting.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
