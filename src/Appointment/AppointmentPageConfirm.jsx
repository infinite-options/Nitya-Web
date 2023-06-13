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
import { MyContext } from "../App";
import SimpleForm from "./simpleForm";
import SimpleFormText from "./simpleFormText";
import ScrollToTop from "../Blog/ScrollToTop";
import Popup from "../Popup/Popup";
import "./calendar.css";
import "../Appointment/AppointmentPage.css";

// import moment from "moment";
const YellowRadio = withStyles({
  root: {
    color: "#D3A625",
    "&$checked": {
      color: "#D3A625",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

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
  console.log("(AppointmentPageConfirm) props: ", props);
  //strip use states
  const access_token = location.state.accessToken;
  console.log("(AppointmentPageConfirm) accessToken: ", access_token);

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
      <span className="ms-1" style={{ color: "red", fontSize: "12px" }}>
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
      if (
        !email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
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
      is_ret_client_appt: ['330-000005','330-000006'].includes(treatmentID),
    };
    // sendToDatabase();
    try {
      const resp = await axios.post(
        "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/findCustomer",
        body
      );
      if (resp.data.customer_uid) 
        setCustomerUid(resp.data.customer_uid);
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
        .get(
          "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/stripe_key/NITYATEST"
        )
        .then((result) => {
          console.log(
            "(1 PaymentDetails) Stripe-key then result (1): " +
              JSON.stringify(result)
          );

          let tempStripePromise = loadStripe(result.data.publicKey);

          console.log("(1 PaymentDetails) setting state with stripePromise");

          setStripePromise(tempStripePromise);

          console.log(tempStripePromise);
          console.log("(1 PaymentDetails) stripePromise set!");
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            console.log(
              "(1 PaymentDetails) error: " + JSON.stringify(err.response)
            );
          }
        });
    } else {
      // Fetch public key live

      console.log("fetching public key live");
      axios
        .get(
          "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/stripe_key/NITYA"
        )
        .then((result) => {
          console.log(
            "(2 PaymentDetails) Stripe-key then result (1): " +
              JSON.stringify(result)
          );

          let tempStripePromise = loadStripe(result.data.publicKey);

          console.log("(2 PaymentDetails) setting state with stripePromise");

          console.log(tempStripePromise);
          setStripePromise(tempStripePromise);

          console.log("(2 PaymentDetails) stripePromise set!");
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            console.log(
              "(2 PaymentDetails) error: " + JSON.stringify(err.response)
            );
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
      console.log(date, time);
      var newDate = new Date((date + "T" + time).replace(/\s/, "T"));
      var hours = newDate.getHours();
      var minutes = newDate.getMinutes();
      console.log(hours, minutes);
      var ampm = hours >= 12 ? "pm" : "am";
      console.log(ampm);
      hours = hours % 12;
      console.log(hours);
      hours = hours ? hours : 12; // the hour '0' should be '12'
      console.log(hours);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      console.log(minutes);
      var strTime = hours + ":" + minutes + " " + ampm;
      console.log(strTime);
      return strTime;
    }
  }

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  return (
    <div className="HomeContainer">
      <ScrollToTop />
      <Popup 
        showDialog={showDialog} 
        onClose={handleDialogClose} 
        title={dialogTitle} 
        text={dialogText} 
      />
      <br />
      {bookNowClicked || location.state.signedin ? (
        <div className="Card" style={{ alignItems: "center" }}>
          <div className={classes.container}>
            <div>
              <div>
                <div className={classes.selectTime2}>
                  <div className="TitleFontAppt">
                    Appointment scheduled for:
                  </div>
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
                    {moment(location.state.date).format("ll")} at{" "}
                    {formatTime(location.state.date, location.state.time)} -{" "}
                    {location.state.mode}
                  </span>
                </h1>
              </div>
            </div>
            <br />
            <div className="ApptConfirmContainer">
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
                  {parseDuration(elementToBeRendered.duration)} |{" "}
                  {elementToBeRendered.cost}
                </p>
                <img
                  src={elementToBeRendered.image_url}
                  className={classes.img}
                  style={{ objectFit: "cover", textAlign: "left" }}
                  alt=""
                />
                <br />
                <br />
                <p className={classes.content2} style={{ textAlign: "left" }}>
                  6055 Meridian Ave #40
                  <br />
                  San Jose, CA, 95120
                  <br />
                  <br />
                  Office: (408) 471-7004
                </p>
              </div>
              <div className="ApptConfirmTextBox">
                <div
                  style={{
                    marginBottom: "10px",
                    display: "flex"
                  }}
                >
                  {firstName === "" ? required : ""}
                  <input
                    name="variable"
                    placeholder="Enter First Name"
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
                  {required? "": <span>&nbsp;</span>}
                  {lastName === "" ? required : ""}
                  <input
                    name="variable"
                    placeholder="Enter Last Name"
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
                  <FormControlLabel
                    control={
                      <YellowRadio
                        checked={gender.female}
                        onChange={(e) => handleGender(e)}
                        name="female"
                      />
                    }
                    label="Female"
                  />
                  <FormControlLabel
                    control={
                      <YellowRadio
                        checked={gender.male}
                        onChange={(e) => handleGender(e)}
                        name="male"
                      />
                    }
                    label="Male"
                  />
                  {/* <SimpleForm field="Age" onHandleChange={handleAgeChange} /> */}
                  {age === "" ? required : ""}
                  <input
                    name="variable"
                    placeholder="Age"
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
                    display: "flex"
                  }}
                >
                  {/* <SimpleForm
                    field="Email Address"
                    onHandleChange={handleEmailChange}
                  /> */}
                  {email === "" ? required : ""}
                  <input
                    name="variable"
                    placeholder="Email Address"
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
                    display: "flex"
                  }}
                >
                  {/* <SimpleForm
                    field="Phone Number - 10 digits only"
                    maxLength="10"
                    onHandleChange={handlePhoneNumChange}
                  /> */}
                  {phoneNum === "" ? required : ""}
                  <input
                    name="variable"
                    placeholder="Phone Number - 10 digits only"
                    value={phoneNum}
                    maxLength="10"
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
                    name="variable"
                    placeholder="Type your message here"
                    value={notes}
                    maxLength="100"
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
                    selectedTime={formatTime(
                      location.state.date,
                      location.state.time
                    )}
                    mode={location.state.mode}
                    age={age}
                    gender={selectGender}
                    purchaseDate={purchaseDate}
                    cost={cost}
                    treatmentDate={location.state.date}
                    treatmentTime={location.state.time}
                    duration={elementToBeRendered.duration}
                    image_url={elementToBeRendered.image_url}
                  />
                </div>
                <div
                  className="text-center"
                  style={errorMessage === "" ? { visibility: "hidden" } : {}}
                >
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {errorMessage || "error"}
                  </p>
                </div>
                <div
                  aria-label={"click button to book your appointment"}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className={classes.bookButton}
                    hidden={infoSubmitted}
                    onClick={toggleKeys}
                  >
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
