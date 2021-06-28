import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import { Row, Col } from "reactstrap";
import "./calendar.css";
import SimpleForm from "./simpleForm";
import SimpleFormText from "./simpleFormText";
import IMG from "../../Mask Group 12.png";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { makeStyles } from "@material-ui/core/styles";
import { MyContext } from "../../App";
import moment from "moment";

export default function Scheduler(props) {
  const elements = useElements();
  const stripe = useStripe();
  moment().format();

  //import the Context from the App
  const { serviceArr, servicesLoaded } = useContext(MyContext);
  const [elementToBeRendered, setElementToBeRendered] = useState([]);

  const treatment_uid = props.treatmentID;

  useEffect(() => {
    if (servicesLoaded) {
      serviceArr.forEach((element) => {
        if (element.treatment_uid === treatment_uid) {
          setElementToBeRendered(element);
        }
      });
    }
  });

  //For Axios.Get
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState(null);
  const [dateHasBeenChanged, setDateHasBeenChanged] = useState(true);
  const [dateString1, setDateString1] = useState(null);

  const [apiDateString, setApiDateString] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [apptHourDurition, setApptHourDurition] = useState(false);

  //For Axios.Post
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");
  const [apptDate, setApptDate] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [notes, setNotes] = useState("");

  // for hide and show
  const [timeSelected, setTimeSelected] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  //A lot of event handlers

  const handleFirstNameChange = (newFName) => {
    setFName(newFName);
  };

  const handleLastNameChange = (newLName) => {
    setLName(newLName);
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

  const dateChange = (date) => {
    setDate(date);
    dateStringChange(date);
    setTimeSelected(true);
  };

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

  useEffect(() => {
    if (dateHasBeenChanged) {
      axios
        .get(
          "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/calendar/" +
            // treatment_uid +
            // "/" +
            apiDateString
        )
        .then((res) => {
          // console.log(res.data.result.available_timeslots);
          // setTimeSlots(res.data.result.available_timeslots);
          console.log(res);
          console.log("This is the information we got" + res.data);
          console.log(res.data[0]);
          console.log(res.data[0].appt_start);
          setTimeSlots(res.data);
          //setTimeSlot(res.data); // for one hour appt
          console.log("Timeslots Array " + timeSlots);
        });
    }
    setDateHasBeenChanged(false);
  });

  function setTimeslot(appt) {
    if (apptHourDurition) {
      const oneHourAppt = [];
      for (let i = 0; i < appt.length - 1; i++) {
        var date1 = new moment(apiDateString + " " + appt[i].appt_start);
        var date2 = new moment(apiDateString + " " + appt[i + 1].appt_start);
        if (date1.add(30, "minutes").format() == date2.format()) {
          oneHourAppt.push(appt[i]);
        }
      }
      setTimeSlots(oneHourAppt);
    }
  }

  // function renderAvailableAppts() {
  //   return timeSlots.map((element) => (
  //     <Button onClick={() => selectApptTime(element)}>
  //       {element.appt_start}
  //     </Button>
  //   ));
  // }

  function renderAvailableApptsVertical() {
    return timeSlots.map((element) => (
      <Row>
        <button
          className={classes.button}
          onClick={() => selectApptTime(element.appt_start)}
        >
          {element.appt_start}
        </button>{" "}
      </Row>
    ));
  }

  function selectApptTime(element) {
    setSelectedTime(element);
    setTimeSelected(true);
  }

  function sendToDatabase() {
    // console.log(fName);
    // console.log(lName);
    // console.log(email);
    // console.log(phoneNum);
    setApptDate(dateFormat1(date));
    setPurchaseDate(dateFormat1(purchaseDate));

    const postURL =
      "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/createAppointment";
    axios
      .post(postURL, {
        first_name: fName,
        last_name: lName,
        email: email,
        phone_no: phoneNum,
        appt_treatment_uid: treatment_uid, //TREATMENT INFO #1
        // notes: notes,
        notes: props.notes,
        appt_date: dateFormat3(date),
        appt_time: selectedTime,
        purchase_price: elementToBeRendered.cost, //TREATMENT INFO #2
        purchase_date: dateFormat3(purchaseDate),
      })
      .then((res) => console.log(res));
  }

  const [changeLoadingState, setLoadingState] = useState(false);

  async function bookAppt() {
    sendToDatabase();
    // console.log(fName);
    // console.log(lName);
    // console.log(email);
    // console.log(phoneNum);
    const temp = {
      tax: 5,
      total: 10,
    };

    var clientSecret;
    const cardElement = await elements.getElement(CardElement);

    const postURL =
      "https://huo8rhh76i.execute-api.us-west-1.amazonaws.com/dev/api/v2/createPaymentIntent";
    axios
      .post(postURL, {
        customer_uid: "100-000001",
        // business_code: "IOTEST",
        business_code: "NITYATEST",
        payment_summary: temp,

        // first_name: fName,
        // last_name: lName,
        // email: email,
        // phone_no: phoneNum,
        // appt_treatment_uid: treatment_uid, //TREATMENT INFO #1
        // notes: notes,
        // appt_date: dateFormat1(date),
        // appt_time: selectedTime,
        // purchase_price: "$100", //TREATMENT INFO #2
        // purchase_date: dateFormat1(purchaseDate),
      })
      .then(function (result) {
        console.log("createPaymentIntent result: " + JSON.stringify(result));
        console.log("clientSecret from createPaymentIntent: " + result.data);
        clientSecret = result.data;

        console.log("calling createPayment gMethod...");

        const paymentMethod = stripe
          .createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: result.data.billingDetails,
          })
          .then(function (res) {
            console.log("createPaymentMethod res: " + JSON.stringify(res));

            console.log("calling confirmedCardPayment...");

            try {
              const confirmedCardPayment = stripe
                .confirmCardPayment(clientSecret, {
                  payment_method: res.paymentMethod.id,
                  setup_future_usage: "off_session",
                })
                .then(function (result) {
                  console.log(
                    "confirmedCardPayment result: " + JSON.stringify(result)
                  );
                })
                .catch((err) => {
                  console.log(err);
                  if (err.response) {
                    console.log("error: " + JSON.stringify(err.response));
                  }
                  changeLoadingState(false);
                });
            } catch (e) {
              console.log("error trying to pay: ", e);
              changeLoadingState(false);
            }
          });
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log("error: " + JSON.stringify(err.response));
          changeLoadingState(false);
        }
      });
    setSubmitted(true);
  }

  const useStyles = makeStyles({
    h1: {
      fontSize: "42px",
      // padding: "20px 0",
      color: "#B28D42",
      fontFamily: "Hoefler",
    },
    content: {
      fontSize: "32px",
      fontFamily: "SFProDisplayRegular",
      // wordWrap: "break-word",
      color: "#B28D42",
      // lineHeight: "1.4",
      textAlign: "left",
    },
    selectTime: {
      fontSize: "32px",
      color: "#52330D",
      fontFamily: "AvenirHeavy",
      margin: "0 auto",
      textAlign: "center",
    },
    container: {
      margin: "50px auto",
      width: "80%",
      padding: "50px 20px",
      backgroundColor: "white",
    },
    CalendarContainer: {
      margin: "auto",
      width: "80%",
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
      width: "60%",
      padding: "50px",
      backgroundColor: "#B28D42",
    },
    timeslotBox: {
      width: "40%",
      padding: "20px",
    },
    center: {
      margin: "0 auto",
    },
    timeslotButton: {
      backgroundColor: "#B28D42",
      border: "none",
      color: "white",
      padding: " 20px 100px 20px 100px ",
      textAlign: "center",
      textDecoration: "none",
      fontSize: "20px",
      borderRadius: "50px",
      margin: "5px",
      "&:focus": {
        background: "#52330D",
        fontColor: "#B28D42",
        outline: "none",
        boxShadow: "none",
      },
      "&:active": {
        background: "#52330D",
        fontColor: "#B28D42",
        outline: "none",
        boxShadow: "none",
      },
    },

    duritionInput: {
      backgroundColor: "#FAD399",
      width: "50%",
      height: "75px",
      border: "none",
      padding: "20px",
      boxSizing: "border-box",
      borderRadius: "50px",
      fontColor: "#52330D",
      fontSize: "25px",
      display: "inline-block",
      margin: "5px",
      "&::placeholder": {
        textOverflow: "ellipsis !important",
        color: "#52330D",
      },
      outline: "none",
    },

    timeslotButtonBox: {
      width: "90%",
      height: "500px",
      margin: "0 auto",
      overflowY: "scroll",
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

    // title: {
    //   marginTop: "-40px",
    //   textAlign: "center",
    //   fontFamily: "DidoteTextW01-Italic",
    //   fontStyle: "italic",
    //   fontSize: "2rem",
    //   wordWrap: "break-word",
    //   color: "#d3a625",
    //   lineHeight: "2",
    // },

    // form: {
    //   display: "flex",
    //   flexDirection: "column",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   backgroundColor: "#dbdbdb",
    //   paddingTop: "12rem",
    //   paddingBottom: "10rem",
    // },
    // btn: {
    //   backgroundColor: "#d3a625",
    //   color: "#ffffff",
    //   border: "1px solid #ffffff",
    //   fontSize: "2rem",
    //   textAlign: "center",
    //   padding: "5px 150px",
    //   marginLeft: "40px",
    // },
  });

  const classes = useStyles();

  return (
    <div>
      <div className={classes.container}>
        <Row className={classes.rows}>
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <img src={IMG} className={classes.img} alt="" />
          </Col>
          <Col>
            <h1 className={classes.h1}>First time Client Package (online)</h1>
            <p className={classes.content}>
              Personalized Ayurvedic health plan, starter herbs and a 30 min
              flup.
            </p>
            <p
              className={classes.content}
              style={{ fontFamily: "SFProDisplayMedium" }}
            >
              1 hr 30 min I $260
            </p>
            <p className={classes.content}>
              {elementToBeRendered.title}
              <br></br>
              Duration: ({elementToBeRendered.duration})<br></br>
              Price: {elementToBeRendered.cost}
            </p>
          </Col>
        </Row>
      </div>
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
              }}
            >
              Find a date to meet with us
            </h1>
            {/* <p className={classes.title}>Find a time to meet with Nitya </p> */}
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
                fontSize: "24px",
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

      <div className={classes.container}>
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
            <h1 className={classes.date} hidden={!timeSelected ? "hidden" : ""}>
              <span style={{}}>{dateString1}</span> at{" "}
              <span style={{}}>{selectedTime}</span>
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className={classes.content}>
              First time Client Package (online)
              <br />1 hr 30 min I $260
            </p>
            <br />
            <p className={classes.content}>
              {elementToBeRendered.title}
              <br></br>
              Duration: ({elementToBeRendered.duration})<br></br>
              Price: {elementToBeRendered.cost}
            </p>
            <br />
            <img src={IMG} className={classes.img} alt="" />
            <br />
            <p className={classes.content}>
              6055 Meridian Ave #40, San Jose, CA 95120, USA
              <br />
              Office: 408 471 7004
            </p>
          </Col>
          <Col>
            <SimpleForm
              field="First Name"
              onHandleChange={handleFirstNameChange}
            />

            <br></br>
            <SimpleForm field="Email Name" onHandleChange={handleEmailChange} />
            <br></br>

            <SimpleForm
              field="Phone Number"
              onHandleChange={handlePhoneNumChange}
            />
            <br></br>
            <SimpleFormText field="Notes" onHandleChange={handleNotesChange} />
            {props.notes}
            <br></br>
            <SimpleForm
              field="Zip Code (Last Name)"
              onHandleChange={handleLastNameChange}
            />
            <br></br>
            <CardElement
              elementRef={(c) => (this._element = c)}
              // className={props.classes.element}
              // options={options}
              style={{
                padding: "10px",
                boxSizing: "border-box",
                borderRadius: "20px",
                fontColor: "#52330D",
                fontSize: "20px",
                margin: "5px auto",
                border: "2px solid #52330D",
                width: "100%",
                fontFamily: "AvenirHeavy",
                outline: "none",
              }}
            />

            <div aria-label={"click button to book your appointment"}>
              <div hidden={timeSelected ? "hidden" : ""}>
                <button className={classes.buttonDisable}>Confirm</button>
              </div>
              <div hidden={!timeSelected ? "hidden" : ""}>
                <button className={classes.button} onClick={bookAppt}>
                  Pay Now
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
