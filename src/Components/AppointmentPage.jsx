import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import Calendar from "react-calendar";
import { Button } from "reactstrap";
import Box from "@material-ui/core/Box";
import Form from "./Appointment/Form";

// The following react component is based on the youtube tutorial provided by Syncfusion, Inc. at the url below:

export default function AppointmentPage(props) {
  //For Calendar
  const treatment_uid = "330-000006";

  //For Axios.Get
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState(null);
  const [dateHasBeenChanged, setDateHasBeenChanged] = useState(true);

  const [apiDateString, setApiDateString] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);

  //For Axios.Post
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const [fName, setfName] = useState("");

  const dateChange = (date) => {
    setDate(date);
    dateStringChange(date);
  };

  const doubleDigitMonth = (date) => {
    let str = "00" + (date.getMonth() + 1);
    return str.substring(str.length - 2);
  };

  const doubleDigitDay = (date) => {
    let str = "00" + date.getDate();
    return str.substring(str.length - 2);
  };

  const dateFormat1 = (date) => {
    return (
      doubleDigitMonth(date) +
      "/" +
      doubleDigitDay(date) +
      "/" +
      date.getFullYear()
    );
  };

  const dateFormat2 = (date) => {
    return (
      doubleDigitMonth(date) +
      "-" +
      doubleDigitDay(date) +
      "-" +
      date.getFullYear()
    );
  };

  const dateStringChange = (date) => {
    setDateString(dateFormat1(date));

    setApiDateString(dateFormat2(date));

    //For some reason, I am unable to use the correct date immediately after calling setApiDateString

    setDateHasBeenChanged(true); //After the date String has been changed, modify the timeSlots Array

    //The axios call used to be here

    //According to the debugger, the state is holding the correct date, but somehow we are printing the wrong date.
    //Any ideas why?

    // console.log("datestring has been modified to " + dateString);
    // console.log("apidatestring has been modified to " + apiDateString);
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
      <div className="row">
        <Button onClick={() => selectApptTime(element)}>{element}</Button>{" "}
      </div>
    ));
  }
  function renderAvailableApptsHorizontal() {
    return timeSlots.map((element) => (
      <div className="row">
        <div className="col">
          <Button onClick={() => selectApptTime(element)}>{element}</Button>{" "}
        </div>
      </div>
    ));
  }

  function selectApptTime(element) {
    setSelectedTime(element);
  }

  function bookAppt() {
    const postURL =
      "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/createappointment";
    axios
      .post(postURL, {
        // appt_customer_uid: "100-000092",
        // appt_treatment_uid: "330-000001",
        // notes: "NULL",
        // appt_date: "2021:05:04",
        // appt_time: "14:00:00",
        // purchase_price: "$175",
        // purchase_date: "04/04/2020",

        // appt_customer_uid: "100-000092",
        // firstName: "",
        // lastName: "",
        // email: "",
        // phoneNum: "",
        appt_treatment_uid: treatment_uid,
        notes: "NULL",
        appt_date: dateFormat1(date),
        appt_time: selectedTime,
        purchase_price: "$100",
        purchase_date: dateFormat1(date),

        //Put some room between the buttons
        //Be flexible with horizontal vs vertical arrangement of the buttons

        //What is still hardcoded?
        //1. Customer UID
        //2. Service ID & Price
        //3. Notes

        //We might choose not to let the user login
        //Instead of using a customer_uid, we can use an emailID.
        //If we use the login ---> program holds their profile info
        //If we use just the email --> user input is used as a customer_uid

        //Create a profile info form (get user input) to book the appt.
        //Include first name, last name, email address, and phone number
        //Include Notes

        //Create a four field form that takes in those four variables and does the post?
      })
      .then((res) => console.log(res));
  }

  return (
    <>
      <div className="page-container ">
        <Navbar />
        <br></br>
        <div className="row">
          <div className="col">
            <Calendar calendarType="US" onClickDay={dateChange} value={date} />
          </div>
          <div className="col">
            <Box>
              These are the available appointments
              {/* How do I put a space here? */}
              {date.toString().substring(0, 15)}
              <br></br>
              {renderAvailableApptsHorizontal()}
            </Box>
          </div>
          <div className="col">
            <Box>
              Customer id
              <br></br>
              <br></br>
              Treatment id
              <br></br>
              {treatment_uid}
              <br></br>
              <br></br>
              notes: (Null)
              <br></br>
              <br></br>
              Appt Date
              <br></br>
              {/* {date.toString().substring(0, 15)} */}
              {dateFormat1(date)}
              <br></br>
              <br></br>
              Appt Time
              <br></br>
              {selectedTime}
              <br></br>
              <br></br>
              Purchase Price
              <br></br>
              <br></br>
              Purchase Date
              <br></br>
              {dateFormat1(purchaseDate)}
              <br></br>
              <Button on onClick={bookAppt}>
                Book Appt Now
              </Button>
            </Box>
          </div>
          <div className="col">
            Below is a form component for determining the identity of the client
            <Form />
          </div>
        </div>

        <br></br>

        <Footer />
      </div>
    </>
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
