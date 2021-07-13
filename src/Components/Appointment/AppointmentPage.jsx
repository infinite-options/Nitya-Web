import React, { useState, useEffect, useContext } from "react";
import StripeElement from "./StripeElement";
import { useParams } from "react-router";
import ScrollToTop from "../../Blog/ScrollToTop";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Row, Col } from "reactstrap";
import SimpleForm from "./simpleForm";
import SimpleFormText from "./simpleFormText";
import { makeStyles } from "@material-ui/core/styles";
import { MyContext } from "../../App";
import Calendar from "react-calendar";
import "./calendar.css";
import moment from "moment";

const useStyles = makeStyles({
  container: {
    margin: "50px auto",
    width: "980px",
    padding: "50px 50px",
    backgroundColor: "white",
  },
  h1: {
    fontSize: "24px",
    color: "#B28D42",
    fontFamily: "Hoefler",
  },
  content: {
    fontSize: "22px",
    fontFamily: "SFProDisplayRegular",
    color: "#B28D42",
    textAlign: "center",
  },
  selectTime: {
    fontSize: "32px",
    color: "#52330D",
    fontFamily: "AvenirHeavy",
    margin: "0 auto",
    textAlign: "center",
  },

  CalendarContainer: {
    margin: "auto",
    width: "980px",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "white",
    border: "2px solid #B28D42",
    color: "#B28D42",
    padding: "15px 90px",
    textAlign: "center",
    textDecoration: "none",
    display: "block",
    fontSize: "20px",
    borderRadius: "50px",
    margin: "2px auto",
    "&:hover": {
      background: "#B28D42",
      color: "white",
    },
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
    "&:active": {
      outline: "none",
      boxShadow: "none",
    },
  },
  buttonDisable: {
    backgroundColor: "#B28D42",
    border: "none",
    color: "white",
    padding: "15px 100px",
    textAlign: "center",
    textDecoration: "none",
    display: "block",
    fontSize: "20px",
    borderRadius: "50px",
    margin: "0 auto",
    opacity: "50%",
    boxShadow: "none",
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
    "&:active": {
      outline: "none",
      boxShadow: "none",
    },
  },
  inputRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  date: {
    fontSize: "42px",
    fontFamily: "AvenirHeavy",
    margin: "0 auto",
    textAlign: "center",
  },
  calendarTimeTable: {
    width: "100%",
    margin: "0 auto",
  },
  calendarBox: {
    width: "50%",
    height: "550px",
    padding: "20px",
    backgroundColor: "#B28D42",
  },
  timeslotBox: {
    width: "50%",
    height: "350px",
    //padding: "20px",
  },
  center: {
    margin: "0 auto",
  },
  timeslotButton: {
    backgroundColor: "white",
    border: "2px solid #B28D42",

    color: "#B28D42",
    padding: "15px 90px",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "20px",
    borderRadius: "50px",
    display: "block",
    margin: "2px auto",
    "&:hover": {
      background: "#B28D42",
      color: "white",
    },
    "&:focus": {
      background: "#B28D42",
      color: "white",
      outline: "none",
      boxShadow: "none",
    },
    "&:active": {
      background: "#B28D42",
      color: "white",
      outline: "none",
      boxShadow: "none",
    },
  },

  timeslotButtonBox: {
    width: "90%",
    height: "300px",
    margin: "0 auto",
    overflowY: "scroll",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "10px",
      // border: "1px solid black",
      borderRadius: "20px",
      padding: "1px 0",
      backgroundColor: "white",
    },
    "&::-webkit-scrollbar-thumb": {
      border: "1px solid #000",
      borderRadius: "20px",
      padding: "1px 0",
      backgroundColor: "#52330D",
    },
  },
  img: {
    width: "100%",
  },
});

export default function AppointmentPage(props) {
  const classes = useStyles();
  moment().format();

  //strip use states
  const { treatmentID } = useParams();
  const [stripePromise, setStripePromise] = useState(null);
  let PUBLISHABLE_KEY = "pk_test_51Ihyn......0wa0SR2JG";
  const [useTestKeys, setUseTestKeys] = useState(true);

  // form use states, Axios.Post
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [fName, setFName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [notes, setNotes] = useState("");

  // for hide & show
  const [infoSubmitted, setInfoSubmitted] = useState(false);
  const [bookNowClicked, setBookNowClicked] = useState(false);
  const [timeSelected, setTimeSelected] = useState(false);
  //import context
  const { serviceArr, servicesLoaded } = useContext(MyContext);
  const [elementToBeRendered, setElementToBeRendered] = useState([]);
  const treatment_uid = treatmentID;

  //for axios.get
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState(null);
  const [dateHasBeenChanged, setDateHasBeenChanged] = useState(true);
  const [dateString1, setDateString1] = useState(null);
  const [apiDateString, setApiDateString] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [duration, setDuration] = useState(null);
  const cost = elementToBeRendered.cost;

  useEffect(() => {
    if (servicesLoaded) {
      serviceArr.forEach((element) => {
        if (element.treatment_uid === treatment_uid) {
          setElementToBeRendered(element);
          console.log("duration" + elementToBeRendered.duration);
          setDuration(elementToBeRendered.duration);
        }
      });
    }
  });

  // handle form changes
  const handleFullNameChange = (newFName) => {
    setFName(newFName);
  };

  const handleEmailChange = (newEmail) => {
    setEmail(newEmail);
  };

  const handlePhoneNumChange = (newPhoneNum) => {
    setPhoneNum(newPhoneNum);
  };

  const handleNotesChange = (newNotes) => {
    setNotes(newNotes);
  };

  //for stripe
  function toggleKeys() {
    setUseTestKeys(!useTestKeys);
    setInfoSubmitted(true);

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
          "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/stripe_key/LIVE"
        )
        .then((result) => {
          console.log(
            "(2 PaymentDetails) Stripe-key then result (1): " +
              JSON.stringify(result)
          );

          let tempStripePromise = loadStripe(result.data.publicKey);

          console.log("(2 PaymentDetails) setting state with stripePromise");

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
  }

  // for appt
  //String formatting functions for the date variable

  const doubleDigitMonth = (date) => {
    let str = "00" + (date.getMonth() + 1);
    return str.substring(str.length - 2);
  };

  const doubleDigitDay = (date) => {
    let str = "00" + date.getDate();
    return str.substring(str.length - 2);
  };

  // This one is for
  const dateFormat1 = (date) => {
    return (
      doubleDigitMonth(date) +
      "/" +
      doubleDigitDay(date) +
      "/" +
      date.getFullYear()
    );
  };

  // This one is for the timeslotAPI call
  const dateFormat2 = (date) => {
    var months = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
      "": "",
    };
    return (
      months[doubleDigitMonth(date)] +
      " " +
      doubleDigitDay(date) +
      ", " +
      date.getFullYear() +
      " "
    );
  };

  // This one is for doing the sendToDatabase Post Call
  const dateFormat3 = (date) => {
    return (
      date.getFullYear() +
      "-" +
      doubleDigitMonth(date) +
      "-" +
      doubleDigitDay(date)
    );
  };

  const dateStringChange = (date) => {
    setDateString(dateFormat1(date));
    setApiDateString(dateFormat3(date));
    setDateString1(dateFormat2(date));
    setDateHasBeenChanged(true);
  };

  const dateChange = (date) => {
    setDate(date);
    dateStringChange(date);
    setTimeSelected(true);
  };

  function formatTime(date, time) {
    if (time == null) {
      return "?";
    } else {
      time = time.split(":");
      // fetch
      var hours = Number(time[0]);
      var minutes = Number(time[1]);
      var seconds = Number(time[2]);

      // calculate
      var strTime;

      if (hours > 0 && hours <= 12) {
        strTime = "" + hours;
      } else if (hours > 12) {
        strTime = "" + (hours - 12);
      } else if (hours == 0) {
        strTime = "12";
      }

      strTime += minutes < 10 ? ":0" + minutes : ":" + minutes; // get minutes
      strTime += seconds < 10 ? ":0" + seconds : ":" + seconds; // get seconds
      strTime += hours >= 12 ? " P.M." : " A.M."; // get AM/PM

      return strTime;
    }
  }

  //get appt
  useEffect(() => {
    if (dateHasBeenChanged) {
      axios
        .get(
          "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/availableAppointments/" +
            apiDateString +
            "/" +
            duration
        )
        .then((res) => {
          console.log("This is the information we got" + res.data);
          setTimeSlots(res.data.result);
          console.log("Timeslots Array " + timeSlots);
        });
    }
    setDateHasBeenChanged(false);
  });

  function renderAvailableApptsVertical() {
    return timeSlots.map((element) => (
      <Row>
        <button
          className={classes.timeslotButton}
          onClick={() => selectApptTime(element.begin_time)}
        >
          {formatTime(apiDateString, element.begin_time)}
        </button>
      </Row>
    ));
  }

  function selectApptTime(element) {
    setSelectedTime(element);
    setTimeSelected(true);
  }

  return (
    <div style={{ backgroundColor: "#DADADA" }}>
      <ScrollToTop />
      <br />
      <div className={classes.container}>
        <Row style={{ padding: "0px", backgroundColor: "#B28D42" }}>
          <Col style={{ padding: "0px" }}>
            <img
              src={elementToBeRendered.image_url}
              className={classes.img}
              alt=""
              style={{ height: "100%" }}
            />
          </Col>
          <Col
            style={{
              padding: "30px 20px",
            }}
          >
            <h1
              className={classes.h1}
              style={{ color: "white", textAlign: "center" }}
            >
              {elementToBeRendered.title}
            </h1>
            <br />
            <p className={classes.content} style={{ color: "white" }}>
              {elementToBeRendered.description}
            </p>
            <br />
            <p
              className={classes.content}
              style={{
                fontFamily: "SFProDisplayMedium",
                color: "white",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              {elementToBeRendered.duration} | {elementToBeRendered.cost}
            </p>

            <button
              className={classes.button}
              hidden={bookNowClicked ? "hidden" : ""}
              onClick={() => setBookNowClicked(!bookNowClicked)}
            >
              Book Now
            </button>
          </Col>
        </Row>
      </div>
      {bookNowClicked ? (
        <div>
          <div
            className={classes.CalendarContainer}
            aria-label={"find a day to meet"}
          >
            <Row className={classes.calendarTimeTable}>
              <Col className={classes.calendarBox}>
                <h1
                  style={{
                    textAlign: "left",
                    color: "white",
                    fontFamily: "AvenirHeavy",
                    fontSize: "25px",
                  }}
                >
                  Find a date to meet with us
                </h1>
                <Calendar
                  backgroundColor="#d3a625"
                  calendarType="US"
                  onClickDay={dateChange}
                  value={date}
                  className={classes.center}
                />
              </Col>
              <Col className={classes.timeslotBox}>
                <h1 className={classes.h1} style={{ textAlign: "left" }}>
                  What time is good for you?
                </h1>
                <p
                  style={{
                    textAlign: "left",
                    color: "#B28D42",
                    // fontFamily: "AvenirHeavy",
                    fontSize: "15px",
                  }}
                >
                  UTC - 07:00 Pacific Time
                </p>
                <div className={classes.timeslotButtonBox}>
                  {renderAvailableApptsVertical()}
                </div>
              </Col>
            </Row>
          </div>
          <div className={classes.container} style={{ padding: "40px 40px" }}>
            <Row>
              <Col>
                <h1 className={classes.selectTime}>Confirm Meeting</h1>
                <br></br>
                <h1
                  style={{
                    fontSize: "42x",
                    fontFamily: "AvenirHeavy",
                    margin: "0 auto",
                    textAlign: "center",
                  }}
                  hidden={timeSelected ? "hidden" : ""}
                >
                  Please pick a day and time to meet
                </h1>
                <h1
                  className={classes.date}
                  hidden={!timeSelected ? "hidden" : ""}
                >
                  <span style={{}}>{dateString1}</span> at{" "}
                  <span style={{}}>
                    {formatTime(apiDateString, selectedTime)}
                  </span>
                </h1>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <p className={classes.content} style={{ textAlign: "left" }}>
                  {elementToBeRendered.title}
                  <br />
                  {elementToBeRendered.duration} | {elementToBeRendered.cost}
                </p>
                <br />
                <img
                  src={elementToBeRendered.image_url}
                  className={classes.img}
                  alt=""
                />
                <br />
                <br />
                <p className={classes.content} style={{ textAlign: "left" }}>
                  6055 Meridian Ave #40, San Jose, CA 95120, USA
                  <br />
                  Office: 408 471 7004
                </p>
              </Col>
              <Col>
                <SimpleForm
                  field="First Name"
                  onHandleChange={handleFullNameChange}
                />

                <br></br>
                <SimpleForm
                  field="Email Name"
                  onHandleChange={handleEmailChange}
                />
                <br></br>

                <SimpleForm
                  field="Phone Number"
                  onHandleChange={handlePhoneNumChange}
                />
                <br></br>
                <SimpleFormText
                  field="Notes"
                  onHandleChange={handleNotesChange}
                />
                <br></br>
                <div style={{ background: "white" }}>
                  <StripeElement
                    stripePromise={stripePromise}
                    treatmentID={treatmentID}
                    notes={notes}
                    infoSubmitted={infoSubmitted}
                    fName={fName}
                    email={email}
                    phoneNum={phoneNum}
                    date={date}
                    selectedTime={selectedTime}
                    purchaseDate={purchaseDate}
                    cost={cost}
                  />
                </div>
                <div aria-label={"click button to book your appointment"}>
                  <div hidden={timeSelected ? "hidden" : ""}>
                    <button className={classes.buttonDisable}>Confirm</button>
                  </div>
                  <div hidden={timeSelected !== infoSubmitted ? "" : "hidden"}>
                    <button className={classes.button} onClick={toggleKeys}>
                      Book Appointment
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
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
