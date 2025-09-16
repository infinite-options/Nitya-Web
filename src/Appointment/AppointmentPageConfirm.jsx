import React, { useState, useEffect, useContext } from "react";
import { Col } from "reactstrap";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useLocation, useParams } from "react-router";
import { loadStripe } from "@stripe/stripe-js/pure";
import { Radio } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from "axios";
import StripeElement from "./StripeElement";
import moment from "moment";
import "moment-timezone";
import { MyContext } from "../App";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

import SimpleForm from "./simpleForm";
import SimpleFormText from "./simpleFormText";
import ScrollToTop from "../Blog/ScrollToTop";
import Popup from "../Popup/Popup";
import "./calendar.css";
import "../Appointment/AppointmentPage.css";

// Timezone utility functions
const getUserTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

const convertFromPST = (pstTime, date) => {
  console.log("🔍🔍🔍 CONVERT FROM PST DEBUG 🔍🔍🔍");
  console.log("🔍 convertFromPST - pstTime:", pstTime);
  console.log("🔍 convertFromPST - date:", date);
  console.log("🔍 convertFromPST - pstTime type:", typeof pstTime);
  console.log("🔍 convertFromPST - pstTime is null:", pstTime === null);
  console.log("🔍 convertFromPST - pstTime is undefined:", pstTime === undefined);
  
  try {
    if (pstTime == null) {
      console.log("❌ pstTime is null/undefined, cannot convert");
      return pstTime;
    }
    
    let timeString = pstTime.toString().trim();
    console.log("🔍 convertFromPST - original timeString:", timeString);
    
    // Detect and handle different time formats
    if (timeString.includes("AM") || timeString.includes("PM")) {
      // Handle 12-hour format (e.g., "09:00 AM", "11:30 PM")
      console.log("convertFromPST - detected 12-hour format");
      const [timePart, period] = timeString.split(" ");
      const [hoursStr, minutesStr] = timePart.split(":");
      let hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);
      
      // Validate parsed values
      if (isNaN(hours) || isNaN(minutes)) {
        console.error("Invalid time format in convertFromPST:", pstTime);
        return pstTime;
      }
      
      // Convert to 24-hour format
      if (period === "AM" && hours === 12) {
        hours = 0;
      } else if (period === "PM" && hours !== 12) {
        hours += 12;
      }
      
      timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      console.log("convertFromPST - converted 12-hour to 24-hour:", timeString);
    } else if (timeString.includes(":")) {
      // Handle 24-hour format (e.g., "09:00", "23:00", "09:00:00")
      console.log("convertFromPST - detected 24-hour format");
      const timeParts = timeString.split(":");
      if (timeParts.length >= 2) {
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);
        
        // Validate parsed values
        if (isNaN(hours) || isNaN(minutes)) {
          console.error("Invalid time format in convertFromPST:", pstTime);
          return pstTime;
        }
        
        // Ensure proper formatting (HH:MM)
        timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
        console.log("convertFromPST - formatted 24-hour:", timeString);
      }
    } else {
      console.error("Unrecognized time format:", pstTime);
      return pstTime;
    }
    
    // Ensure date is in YYYY-MM-DD format
    let dateString = date;
    if (typeof date === 'string') {
      dateString = date;
    } else if (date instanceof Date) {
      dateString = moment(date).format('YYYY-MM-DD');
    } else {
      dateString = moment(date).format('YYYY-MM-DD');
    }
    
    console.log("convertFromPST - final timeString:", timeString, "dateString:", dateString);
    
    // Create a moment object in PST/PDT (America/Los_Angeles handles both)
    const pstDateTime = moment.tz(dateString + "T" + timeString, "America/Los_Angeles");
    console.log("convertFromPST - pstDateTime:", pstDateTime.format());
    
    // Get user's timezone
    const userTimezone = getUserTimezone();
    console.log("convertFromPST - userTimezone:", userTimezone);
    
    // Convert to user's local timezone
    const localDateTime = pstDateTime.tz(userTimezone);
    console.log("convertFromPST - localDateTime:", localDateTime.format());
    
    const result = localDateTime.format("HH:mm:ss");
    console.log("🔍 convertFromPST - result:", result);
    console.log("🔍🔍🔍 END CONVERT FROM PST DEBUG 🔍🔍🔍");
    return result;
  } catch (error) {
    console.error("❌ Error in convertFromPST:", error);
    console.error("❌ Error stack:", error.stack);
    console.log("🔍🔍🔍 END CONVERT FROM PST DEBUG (ERROR) 🔍🔍🔍");
    return pstTime; // Return original time if conversion fails
  }
};

const getTimezoneAbbreviation = () => {
  const tz = getUserTimezone();
  console.log("getTimezoneAbbreviation - detected timezone:", tz);
  
  // Handle US timezones
  if (tz.includes("America/New_York")) return "EST";
  if (tz.includes("America/Chicago")) return "CST";
  if (tz.includes("America/Denver")) return "MST";
  if (tz.includes("America/Los_Angeles")) return "PST";
  
  // Handle other common timezones
  if (tz.includes("America/Toronto")) return "EST";
  if (tz.includes("America/Vancouver")) return "PST";
  if (tz.includes("Europe/London")) return "GMT";
  if (tz.includes("Europe/Paris")) return "CET";
  if (tz.includes("Asia/Tokyo")) return "JST";
  if (tz.includes("Asia/Shanghai")) return "CST";
  if (tz.includes("Australia/Sydney")) return "AEST";
  
  // Fallback: try to get abbreviation from Intl.DateTimeFormat
  try {
    const now = new Date();
    const timeZoneName = now.toLocaleString("en-US", {
      timeZone: tz,
      timeZoneName: "short"
    });
    const parts = timeZoneName.split(" ");
    const abbreviation = parts[parts.length - 1];
    console.log("getTimezoneAbbreviation - fallback abbreviation:", abbreviation);
    return abbreviation || tz.replace("America/", "").replace("_", "");
  } catch (error) {
    console.error("Error getting timezone abbreviation:", error);
    return tz.replace("America/", "").replace("_", "");
  }
};

// import moment from "moment";
const YellowRadio = withStyles({
  root: {
    color: "#D3A625",
    "&$checked": {
      color: "#D3A625",
    },
  },
  checked: {},
})((props) => <Radio color='default' {...props} />);

const useStyles = makeStyles({
  container: {
    margin: "20px",
    width: "100%",
    // padding: "20px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // width: "60%",
    "@media (max-width: 1050px)": {
      // marginLeft: "0.5rem",
      width: "100%",
    },
  },

  content2: {
    fontSize: "20px",
    // fontFamily: "SFProDisplayRegular",
    color: "#D3A625",
    textAlign: "left",
  },

  selectTime2: {
    fontSize: "38px",
    color: "#D3A625",
    fontFamily: "Hoefler Text",
    margin: "0 auto",
    textAlign: "center",
  },

  bookButton: {
    width: "200px",
    height: "50px",
    cursor: "pointer",
    backgroundColor: "#D3A625",
    border: "2px solid #D3A625",
    color: "white",
    // padding: "0 10px 0 10px",
    textDecoration: "none",
    fontSize: "20px",
    borderRadius: "50px",
    fontFamily: "AvenirHeavy",
    "&:hover": {
      borderColor: "#D3A625",
      background: "#D3A625",
      color: "#white",
    },
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
    "&:active": {
      outline: "none",
      boxShadow: "none",
    },
    "&:disabled": {
      backgroundColor: "#D3A625",
      color: "white",
      opacity: "50%",
      "&:hover": {
        borderColor: "#D3A625",
      },
    },
  },

  timeslotButton: {
    width: "10rem",
    height: "3rem",
    maxWidth: "80%",
    backgroundColor: "white",
    border: "2px solid #D3A625",
    color: "#D3A625",
    // padding: "15px 90px",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "20px",
    borderRadius: "50px",
    display: "block",
    margin: "6px auto",
    "&:hover": {
      background: "#D3A625",
      color: "white",
    },
    "&:focus": {
      background: "#D3A625",
      color: "white",
      outline: "none",
      boxShadow: "none",
    },
    "&:active": {
      background: "#D3A625",
      color: "white",
      outline: "none",
      boxShadow: "none",
    },
  },

  img: {
    width: "320px",
    "@media (max-width: 1050px)": {
      width: "280px",
    },
  },
});
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
export default function AppointmentPage(props) {
  const classes = useStyles();
  const location = useLocation();
  // moment().format();
  console.log("🔍🔍🔍 CONFIRMATION PAGE DEBUG 🔍🔍🔍");
  console.log("🔍 (AppointmentPageConfirm) props: ", props);
  console.log("🔍 location object:", location);
  console.log("🔍 location.state:", location.state);
  console.log("🔍 location.state.time:", location.state?.time);
  console.log("🔍 location.state.date:", location.state?.date);
  console.log("🔍 location.state.mode:", location.state?.mode);
  console.log("🔍 location.state.time type:", typeof location.state?.time);
  console.log("🔍 location.state.time is null:", location.state?.time === null);
  console.log("🔍 location.state.time is undefined:", location.state?.time === undefined);
  
  //strip use states
  const access_token = location.state?.accessToken;
  console.log("🔍 (AppointmentPageConfirm) accessToken: ", access_token);
  const totalCost = "$" + (location.state?.totalCost || "undefined");
  const totalDuration = location.state?.totalDuration;
  const durationText = location.state?.durationText;
  console.log("🔍 totalCost:", totalCost);
  console.log("🔍 totalDuration:", totalDuration);
  console.log("🔍 durationText:", durationText);
  console.log("🔍🔍🔍 END CONFIRMATION PAGE DEBUG 🔍🔍🔍");

  const { treatmentID } = useParams();
  const [stripePromise, setStripePromise] = useState(null);
  const [useTestKeys, setUseTestKeys] = useState(true);

  // form use states, Axios.Post
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [notes, setNotes] = useState("");
  const [gender, setGender] = useState({
    male: false,
    female: true,
  });
  const [selectGender, setSelectGender] = useState("Female");
  const [age, setAge] = useState("");

  // for hide & show
  const [infoSubmitted, setInfoSubmitted] = useState(false);
  // const [bookNowClicked, setBookNowClicked] = useState(false);
  const [bookNowClicked, setBookNowClicked] = useState(true);
  //import context
  const { serviceArr, servicesLoaded } = useContext(MyContext);
  const [elementToBeRendered, setElementToBeRendered] = useState([]);
  const treatment_uid = treatmentID;
  //for axios.get
  const [customerUid, setCustomerUid] = useState("");
  const cost = elementToBeRendered.cost;
  const [errorMessage, setErrorMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [dialogText, setDialogText] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");

  // console.log("Cost", totalCost);
  // console.log("Cost",cost);

  useEffect(() => {
    if (servicesLoaded) {
      serviceArr.forEach((element) => {
        if (element.treatment_uid === treatment_uid) {
          setElementToBeRendered(element);
          console.log("element to be rendered: ", elementToBeRendered);
          console.log("duration: ", elementToBeRendered.duration);
        }
      });
    }
  });
  const required =
    errorMessage === "Please fill out all fields" ? (
      <span className='ms-1' style={{ color: "red", fontSize: "12px" }}>
        *
      </span>
    ) : (
      ""
    );
  // parse duration
  const parseDuration = (rawDuration) => {
    if (rawDuration === undefined) {
      return "";
    }
    console.log("rawDuration: ", rawDuration);
    let parsedDuration = "";

    let durationTokens = rawDuration.split(":");
    console.log("durationTokens: ", durationTokens);

    if (Number(durationTokens[0]) > 0) {
      parsedDuration = parsedDuration + durationTokens[0] + " hr ";
    }

    let minsNum = Number(durationTokens[1]);
    let secsNum = Number(durationTokens[2]);

    if (secsNum >= 31) {
      minsNum++;
    }

    parsedDuration = parsedDuration + minsNum + " min";

    return parsedDuration;
  };
  const handleGender = (event) => {
    var optionPick = event.target.name;
    console.log(optionPick);
    var newGenderObj = {};
    var newGender = "";
    if (optionPick === "female") {
      newGenderObj = {
        male: false,
        female: true,
      };
      newGender = "Female";
    } else {
      newGenderObj = {
        male: true,
        female: false,
      };
      newGender = "Male";
    }
    console.log(newGenderObj);
    setGender(newGenderObj);
    setSelectGender(newGender);
  };
  // handle form changes
  const handleAgeChange = (newAge) => {
    setAge(newAge.target.value);
  };
  const handleFirstNameChange = (newFName) => {
    setFirstName(newFName.target.value);
  };

  const handleLastNameChange = (newLName) => {
    setLastName(newLName.target.value);
  };

  const handleEmailChange = (newEmail) => {
    setEmail(newEmail.target.value);
  };

  const handlePhoneNumChange = (newPhoneNum) => {
    setPhoneNum(newPhoneNum.target.value);
  };

  const handleNotesChange = (newNotes) => {
    setNotes(newNotes.target.value);
  };

  //for stripe
  async function toggleKeys() {
    const tempFind = [];
    console.log(age);
    if (age === "" || email === "" || firstName === "" || lastName === "" || phoneNum === "") {
      setErrorMessage("Please fill out all fields");
      return;
    }

    if (email !== 0) {
      if (!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        setErrorMessage("Please enter a valid email.");
        return;
      }
    }

    const body = {
      first_name: firstName,
      last_name: lastName,
      role: "CUSTOMER",
      phone_num: phoneNum.replace(/[^a-z\d\s]+/gi, ""),
      email: email,
      is_ret_client_appt: ["330-000005", "330-000006"].includes(treatmentID),
    };
    // sendToDatabase();
    try {
      const resp = await axios.post("https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/findCustomer", body);
      if (resp.data.customer_uid) setCustomerUid(resp.data.customer_uid);
      if (resp.data.warning) {
        setDialogTitle("Warning");
        setDialogText(resp.data.warning);
        setShowDialog(true);
      }
    } catch (error) {
      setDialogTitle("Error");
      setDialogText(error.response.data.message);
      setShowDialog(true);
      return;
    }

    console.log("response", customerUid);
    if (notes === "NITYATEST") {
      // Fetch public key
      console.log("fetching public key");
      axios
        .get("https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/stripe_key/NITYATEST")
        .then((result) => {
          console.log("(1 PaymentDetails) Stripe-key then result (1): " + JSON.stringify(result));

          let tempStripePromise = loadStripe(result.data.publicKey);

          console.log("(1 PaymentDetails) setting state with stripePromise");

          setStripePromise(tempStripePromise);

          console.log(tempStripePromise);
          console.log("(1 PaymentDetails) stripePromise set!");
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            console.log("(1 PaymentDetails) error: " + JSON.stringify(err.response));
          }
        });
    } else {
      // Fetch public key live

      console.log("fetching public key live");
      axios
        .get("https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/stripe_key/NITYA")
        .then((result) => {
          console.log("(2 PaymentDetails) Stripe-key then result (1): " + JSON.stringify(result));

          let tempStripePromise = loadStripe(result.data.publicKey);

          console.log("(2 PaymentDetails) setting state with stripePromise");

          console.log(tempStripePromise);
          setStripePromise(tempStripePromise);

          console.log("(2 PaymentDetails) stripePromise set!");
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            console.log("(2 PaymentDetails) error: " + JSON.stringify(err.response));
          }
        });
    }
    setUseTestKeys(!useTestKeys);
    setErrorMessage("");
    setInfoSubmitted(true);
  }

  function formatTime(date, time) {
    if (time == null) {
      return "?";
    } else {
      console.log("formatTime - date:", date, "time:", time);
      
      // Handle different time formats
      let timeString = time.toString().trim();
      console.log("formatTime - original timeString:", timeString);
      
      // Check if it's already in 12-hour format (contains AM/PM)
      if (timeString.includes("AM") || timeString.includes("PM")) {
        console.log("formatTime - already in 12-hour format:", timeString);
        return timeString;
      }
      
      // Handle 24-hour format (HH:mm or HH:mm:ss)
      if (timeString.includes(":")) {
        console.log("formatTime - detected 24-hour format");
        const timeParts = timeString.split(":");
        if (timeParts.length >= 2) {
          const hours = parseInt(timeParts[0], 10);
          const minutes = parseInt(timeParts[1], 10);
          
          console.log("formatTime - parsed 24-hour format - hours:", hours, "minutes:", minutes);
          
          // Validate the parsed values
          if (isNaN(hours) || isNaN(minutes)) {
            console.error("Invalid time format:", time);
            return "Invalid Time";
          }
          
          // Convert to 12-hour format
          const ampm = hours >= 12 ? "PM" : "AM";
          let displayHours = hours % 12;
          displayHours = displayHours ? displayHours : 12; // the hour '0' should be '12'
          const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
          
          const strTime = `${displayHours}:${displayMinutes} ${ampm}`;
          console.log("formatTime - converted 24-hour to 12-hour:", strTime);
          return strTime;
        }
      }
      
      console.error("Unrecognized time format:", time);
      return "Invalid Time";
    }
  }

  // Enhanced formatTime function that shows only the user's time in their timezone
  function formatTimeWithTimezone(date, time) {
    console.log("🔍🔍🔍 FORMAT TIME WITH TIMEZONE DEBUG 🔍🔍🔍");
    console.log("🔍 formatTimeWithTimezone - date:", date);
    console.log("🔍 formatTimeWithTimezone - time:", time);
    console.log("🔍 formatTimeWithTimezone - time type:", typeof time);
    console.log("🔍 formatTimeWithTimezone - time is null:", time === null);
    console.log("🔍 formatTimeWithTimezone - time is undefined:", time === undefined);
    
    if (time == null) {
      console.log("❌ time is null/undefined, returning '?'");
      return "?";
    } else {
      console.log("🔍 time exists, proceeding with conversion");
      // Convert PST time to user's local timezone
      const localTime = convertFromPST(time, date);
      console.log("🔍 formatTimeWithTimezone - localTime:", localTime);
      
      const localFormatted = formatTime(date, localTime);
      console.log("🔍 formatTimeWithTimezone - localFormatted:", localFormatted);
      
      const timezoneAbbr = getTimezoneAbbreviation();
      console.log("🔍 formatTimeWithTimezone - timezoneAbbr:", timezoneAbbr);

      // Show only the user's time in their timezone
      const result = `${localFormatted} ${timezoneAbbr}`;
      console.log("🔍 formatTimeWithTimezone - final result:", result);
      console.log("🔍🔍🔍 END FORMAT TIME WITH TIMEZONE DEBUG 🔍🔍🔍");
      return result;
    }
  }

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  return (
    <div className='HomeContainer'>
      <ScrollToTop />
      <Popup showDialog={showDialog} onClose={handleDialogClose} title={dialogTitle} text={dialogText} />
      <br />
      {bookNowClicked || location.state.signedin ? (
        <div className='Card' style={{ alignItems: "center" }}>
          <div className={classes.container}>
            <div>
              <div>
                <div className={classes.selectTime2}>
                  <div className='TitleFontAppt'>Appointment scheduled for:</div>
                </div>
                <br></br>

                <h1
                  style={{
                    fontSize: "30px",
                    margin: "0 auto",
                    textAlign: "center",
                  }}
                >
                  <span>
                    {moment(location.state.date).format("ll")} at {formatTimeWithTimezone(location.state.date, location.state.time)} - {location.state.mode}
                  </span>
                </h1>
                <div
                  style={{
                    fontSize: "16px",
                    margin: "10px auto",
                    textAlign: "center",
                    color: "#666",
                    fontStyle: "italic",
                  }}
                >
                  <span>
                    Your time: {formatTime(location.state.date, convertFromPST(location.state.time, location.state.date))} {getTimezoneAbbreviation()}
                  </span>
                </div>
              </div>
            </div>
            <br />
            <div className='ApptConfirmContainer'>
              <div>
                <p className={classes.content2} style={{ textAlign: "left" }}>
                  <span
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    {elementToBeRendered.title}
                  </span>
                  <br />
                  {durationText} | {totalCost}
                </p>
                <img src={elementToBeRendered.image_url} className={classes.img} style={{ objectFit: "cover", textAlign: "left" }} alt='' />
                <br />
                <br />
                <p className={classes.content2} style={{ textAlign: "left" }}>
                  1610 Blossom Hill Rd, Ste #1
                  <br />
                  San Jose, CA, 95124
                  <br />
                  <br />
                  Office: (408) 471-7004
                </p>
              </div>
              <div className='ApptConfirmTextBox'>
                <div
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                  }}
                >
                  {firstName === "" ? required : ""}
                  <input
                    name='variable'
                    placeholder='Enter First Name'
                    value={firstName}
                    onChange={handleFirstNameChange}
                    style={{
                      padding: "10px",
                      boxSizing: "border-box",
                      borderRadius: "20px",
                      fontColor: "black",
                      fontSize: "20px",
                      border: "2px solid #B28D42",
                      width: "100%",
                      // fontFamily: "AvenirHeavy",
                      outline: "none",
                    }}
                  />
                  {required ? "" : <span>&nbsp;</span>}
                  {lastName === "" ? required : ""}
                  <input
                    name='variable'
                    placeholder='Enter Last Name'
                    value={lastName}
                    onChange={handleLastNameChange}
                    style={{
                      padding: "10px",
                      boxSizing: "border-box",
                      borderRadius: "20px",
                      fontColor: "black",
                      fontSize: "20px",
                      border: "2px solid #B28D42",
                      width: "100%",
                      // fontFamily: "AvenirHeavy",
                      outline: "none",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <FormControlLabel control={<YellowRadio checked={gender.female} onChange={(e) => handleGender(e)} name='female' />} label='Female' />
                  <FormControlLabel control={<YellowRadio checked={gender.male} onChange={(e) => handleGender(e)} name='male' />} label='Male' />
                  {/* <SimpleForm field="Age" onHandleChange={handleAgeChange} /> */}
                  {age === "" ? required : ""}
                  <input
                    name='variable'
                    placeholder='Age'
                    value={age}
                    onChange={(e) => handleAgeChange(e)}
                    style={{
                      padding: "10px",
                      boxSizing: "border-box",
                      borderRadius: "20px",
                      fontColor: "black",
                      fontSize: "20px",
                      border: "2px solid #B28D42",
                      width: "100%",
                      // fontFamily: "AvenirHeavy",
                      outline: "none",
                    }}
                  />
                </div>
                <div
                  style={{
                    marginBottom: "10px",
                  }}
                ></div>
                <div
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                  }}
                >
                  {/* <SimpleForm
                    field="Email Address"
                    onHandleChange={handleEmailChange}
                  /> */}
                  {email === "" ? required : ""}
                  <input
                    name='variable'
                    placeholder='Email Address'
                    value={email}
                    // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    onChange={(e) => handleEmailChange(e)}
                    style={{
                      padding: "10px",
                      boxSizing: "border-box",
                      borderRadius: "20px",
                      fontColor: "black",
                      fontSize: "20px",
                      border: "2px solid #B28D42",
                      width: "100%",
                      // fontFamily: "AvenirHeavy",
                      outline: "none",
                    }}
                  />
                </div>
                <div
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                  }}
                >
                  {/* <SimpleForm
                    field="Phone Number - 10 digits only"
                    maxLength="10"
                    onHandleChange={handlePhoneNumChange}
                  /> */}
                  {phoneNum === "" ? required : ""}
                  <input
                    name='variable'
                    placeholder='Phone Number - 10 digits only'
                    value={phoneNum}
                    maxLength='10'
                    onChange={(e) => handlePhoneNumChange(e)}
                    style={{
                      padding: "10px",
                      boxSizing: "border-box",
                      borderRadius: "20px",
                      fontColor: "black",
                      fontSize: "20px",
                      border: "2px solid #B28D42",
                      width: "100%",
                      // fontFamily: "AvenirHeavy",
                      outline: "none",
                    }}
                  />
                </div>

                <div
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  {/* <SimpleFormText
                    field="Type your message here"
                    onHandleChange={handleNotesChange}
                  /> */}
                  <input
                    name='variable'
                    placeholder='Type your message here'
                    value={notes}
                    maxLength='100'
                    onChange={(e) => handleNotesChange(e)}
                    style={{
                      padding: "10px",
                      boxSizing: "border-box",
                      borderRadius: "20px",
                      fontColor: "black",
                      fontSize: "20px",
                      border: "2px solid #B28D42",
                      width: "100%",
                      // fontFamily: "AvenirHeavy",
                      outline: "none",
                    }}
                  />
                </div>
                <div
                  hidden={!infoSubmitted}
                  style={{
                    background: "white",
                  }}
                >
                  <StripeElement
                    accessToken={access_token}
                    customerUid={customerUid}
                    stripePromise={stripePromise}
                    treatmentID={treatmentID}
                    treatmentName={elementToBeRendered.title}
                    notes={notes}
                    infoSubmitted={infoSubmitted}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    phoneNum={phoneNum}
                    date={moment(location.state.date).format("ll")}
                    selectedTime={formatTimeWithTimezone(location.state.date, location.state.time)}
                    mode={location.state.mode}
                    age={age}
                    gender={selectGender}
                    purchaseDate={purchaseDate}
                    cost={totalCost}
                    treatmentDate={location.state.date}
                    treatmentTime={location.state.time}
                    duration={totalDuration}
                    image_url={elementToBeRendered.image_url}
                  />
                </div>
                <div className='text-center' style={errorMessage === "" ? { visibility: "hidden" } : {}}>
                  <p style={{ color: "red", fontSize: "12px" }}>{errorMessage || "error"}</p>
                </div>
                <div
                  aria-label={"click button to book your appointment"}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Link to={{ pathname: "/waiver" }} className='nav-link'>
                    {/* <button
                  className={classes.bookButton}
                  variant="contained"
                  component="span"
                  type="button"
                  // onClick={onImageUpload}
                >
                  Waiver
                </button> */}
                  </Link>
                </div>
                <div
                  aria-label={"click button to book your appointment"}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button className={classes.bookButton} hidden={infoSubmitted} onClick={toggleKeys}>
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <br />
      <br />
    </div>
  );
}

/**
 * Things to work on
 *
 * 1. The axios call happens everytime a new date is clicked on the calendar. That's overkill.
 * Instead figure out a way to load the information retrieved from the endpoint into an array.
 *
 * 2.Figure out how to ensure that when the apptPage is loaded up, that the current date is initialy selected.
 * As of the momment, when the page loads, it holds "00/00/0000" as the selected date.
 *
 * 3.Prior to rendering the appointment page
 */
