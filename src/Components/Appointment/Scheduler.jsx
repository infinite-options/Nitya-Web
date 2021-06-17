import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import { Button, Row, Col } from "reactstrap";
import Box from "@material-ui/core/Box";
import "./Scheduler.css";
import SimpleForm from "./simpleForm";

import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";

import { makeStyles } from "@material-ui/core/styles";

import { MyContext } from "../../App";
/**
 * This Web Dev Simplified tutorial was crucial to my understanding of useContext:
 * https://www.youtube.com/watch?v=5LrDIWkK_Bc&ab_channel=WebDevSimplified
 */

export default function Scheduler(props) {
  const elements = useElements();
  const stripe = useStripe();

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

  const [apiDateString, setApiDateString] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);

  //For Axios.Post
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");
  const [apptDate, setApptDate] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  // const [notes, setNotes] = useState("");

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

  // const handleNotesChange = (newNotes) => {
  //   setNotes(newNotes);
  // };

  const dateChange = (date) => {
    setDate(date);
    dateStringChange(date);
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
    return (
      doubleDigitMonth(date) +
      "-" +
      doubleDigitDay(date) +
      "-" +
      date.getFullYear()
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

    setApiDateString(dateFormat2(date));

    setDateHasBeenChanged(true);
  };

  useEffect(() => {
    if (dateHasBeenChanged) {
      axios
        .get(
          "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/calendar/" +
            treatment_uid +
            "/" +
            apiDateString
        )
        .then((res) => {
          console.log(res.data.result.available_timeslots);
          setTimeSlots(res.data.result.available_timeslots);
        });
    }
    setDateHasBeenChanged(false);
  });

  function renderAvailableAppts() {
    return timeSlots.map((element) => (
      <Button onClick={() => selectApptTime(element)}>{element}</Button>
    ));
  }

  function renderAvailableApptsVertical() {
    return timeSlots.map((element) => (
      <Row>
        <Button onClick={() => selectApptTime(element)}>{element}</Button>{" "}
      </Row>
    ));
  }

  function selectApptTime(element) {
    setSelectedTime(element);
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

        console.log("calling createPaymentMethod...");

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
  }

  const useStyles = makeStyles({
    container: {
      height: "1000px",
      width: "500px",
      backgroundColor: "#323c47",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: "0px",
      paddingRight: "0px",
    },

    title: {
      marginTop: "-40px",
      textAlign: "center",
      fontFamily: "DidoteTextW01-Italic",
      fontStyle: "italic",
      fontSize: "2rem",
      wordWrap: "break-word",
      color: "#d3a625",
      lineHeight: "2",
    },
    content: {
      fontSize: "1.5rem",
      fontFamily: "'Open Sans', sans-serif",
      wordWrap: "break-word",
      color: "#8d6f19",
      lineHeight: "1.4",
      textAlign: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#dbdbdb",
      paddingTop: "12rem",
      paddingBottom: "10rem",
    },
    btn: {
      backgroundColor: "#d3a625",
      color: "#ffffff",
      border: "1px solid #ffffff",
      fontSize: "2rem",
      textAlign: "center",
      padding: "5px 150px",
      marginLeft: "40px",
    },
  });

  const classes = useStyles();

  return (
    <Box>
      <Row>
        <Col>
          <Box className={classes.container} aria-label={"find a day to meet"}>
            <p className={classes.title}>Find a time to meet with Nitya </p>
            <Calendar
              backgroundColor="#d3a625"
              calendarType="US"
              onClickDay={dateChange}
              value={date}
            />
          </Box>
        </Col>
        <Col>
          <Box className={classes.container} aria-label={"find a time to meet"}>
            <p className={classes.title}>
              {elementToBeRendered.title}
              <br></br>
              Duration: ({elementToBeRendered.duration})<br></br>
              Price: {elementToBeRendered.cost}
            </p>
            {renderAvailableApptsVertical()}
            Selected Date Selected Timeslot
          </Box>
        </Col>
        <Col>
          <Box className={classes.container}>
            <p className={classes.title}>
              Please fill out the information and notes below
            </p>
            <br></br>
            <br></br>
            <SimpleForm
              field="First Name"
              onHandleChange={handleFirstNameChange}
            />
            <br></br>
            <br></br>
            <SimpleForm
              field="Last Name"
              onHandleChange={handleLastNameChange}
            />
            <br></br>
            <br></br>
            <SimpleForm field="Email Name" onHandleChange={handleEmailChange} />
            <br></br>
            <br></br>
            <SimpleForm
              field="Phone Number"
              onHandleChange={handlePhoneNumChange}
            />
            <br></br>
            <br></br>
            {/* <SimpleForm field="Notes" onHandleChange={handleNotesChange} /> */}
            {props.notes}

            <br></br>
            <br></br>

            <CardElement
              elementRef={(c) => (this._element = c)}
              // className={props.classes.element}
              // options={options}
            />
            <div aria-label={"click button to book your appointment"}>
              <Button on onClick={bookAppt}>
                Book Appt Now
              </Button>
            </div>
          </Box>
        </Col>
      </Row>
    </Box>
  );
  // return (
  //   <Box>
  //     <div className="row">
  //       <div className ="col">
  //         <Box className= "container">
  //           <p className="title">Find a time to meet with Nitya </p>
  //           <Calendar
  //             backgroundColor="#d3a625"
  //             calendarType="US"
  //             onClickDay={dateChange}
  //             value={date}
  //           />
  //         </Box>
  //       </div>
  //       <div className ="col">
  //         <Box className="container">
  //           <p className="title">
  //             {elementToBeRendered.title}
  //             <br></br>
  //             Duration: ({elementToBeRendered.duration})
  //             <br></br>
  //             Price: {elementToBeRendered.cost}
  //           </p>

  //           {renderAvailableApptsVertical()}

  //           Selected Date
  //           Selected Timeslot
  //         </Box>
  //       </div>

  //       <Col>
  //         <Box className="container">
  //           <p className="title">
  //             Please fill out the information and notes below
  //           </p>
  //           <br></br>
  //           <br></br>
  //           <SimpleForm
  //             field="First Name"
  //             onHandleChange={handleFirstNameChange}
  //           />
  //           {/* Your first Name is {fName} */}
  //           <br></br>
  //           <br></br>
  //           <SimpleForm
  //             field="Last Name"
  //             onHandleChange={handleLastNameChange}
  //           />
  //           {/* Your Last Name is {lName} */}
  //           <br></br>
  //           <br></br>
  //           <SimpleForm field="Email Name" onHandleChange={handleEmailChange} />
  //           {/* Your Email is {email} */}
  //           <br></br>
  //           <br></br>
  //           <SimpleForm
  //             field="Phone Number"
  //             onHandleChange={handlePhoneNumChange}
  //           />
  //           {/* Your Phone Num is {phoneNum} */}
  //           <br></br>
  //           <br></br>
  //           <SimpleForm field="Notes" onHandleChange={handleNotesChange} />
  //           {/* Your Notes are {notes} */}
  //           <br></br>
  //           <br></br>
  //           <Button on onClick={bookAppt}>
  //             Book Appt Now
  //           </Button>
  //         </Box>
  //       </Col>
  //     </div>
  //   </Box>
  // );
}
