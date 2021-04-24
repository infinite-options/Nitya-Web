import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import Calendar from "react-calendar";
import { Button } from "reactstrap";
import Box from "@material-ui/core/Box";
import Form from "./Form";
import SimpleForm from "./simpleForm";
import { render } from "@testing-library/react";

//STG, I didn't know I could pass in props to a function. Super cool.
export default function Scheduler(props) {
  //For Calendar
  // const treatment_uid = "330-000006";
  const treatment_uid = props.treatmentID;
  // const { treatment_uid } = useParams();

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
  const [phoneNum, setPhoneNum] = useState("");
  const [notes, setNotes] = useState("");

  const handleFirstNameChange = (newFName) => {
    // this.setState({ fName: newFName });
    setFName(newFName);
  };

  const handleLastNameChange = (newLName) => {
    // this.setState({ fName: newFName });
    setLName(newLName);
  };

  const handleEmailChange = (newEmail) => {
    // this.setState({ fName: newFName });
    setEmail(newEmail);
  };

  const handlePhoneNumChange = (newPhoneNum) => {
    // this.setState({ fName: newFName });
    setPhoneNum(newPhoneNum);
  };

  const handleNotesChange = (newNotes) => {
    setNotes(newNotes);
  };

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
    console.log(fName);
    console.log(lName);
    console.log(email);
    console.log(phoneNum);

    const postURL =
      "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/createAppointment";
    axios
      .post(postURL, {
        first_name: fName,
        last_name: lName,
        email: email,
        phone_no: phoneNum,
        appt_treatment_uid: treatment_uid, //TREATMENT INFO #1
        notes: notes,
        appt_date: dateFormat1(date),
        appt_time: selectedTime,
        purchase_price: "$100", //TREATMENT INFO #2
        purchase_date: dateFormat1(purchaseDate),
      })
      .then((res) => console.log(res));

    //We oughta figure out how to get those pieces of treatment info into our post call
  }

  return (
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
          {/* {renderAvailableApptsHorizontal()} */}
          {renderAvailableAppts()}
        </Box>
      </div>
      <div className="col">
        <Box>
          <br></br>
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
        Below is my simple form
        <br></br>
        <br></br>
        <SimpleForm field="First Name" onHandleChange={handleFirstNameChange} />
        Your first Name is {fName}
        <br></br>
        <br></br>
        <SimpleForm field="Last Name" onHandleChange={handleLastNameChange} />
        Your Last Name is {lName}
        <br></br>
        <br></br>
        <SimpleForm field="Email Name" onHandleChange={handleEmailChange} />
        Your Email is {email}
        <br></br>
        <br></br>
        <SimpleForm
          field="Phone Number"
          onHandleChange={handlePhoneNumChange}
        />
        Your Phone Num is {phoneNum}
        <br></br>
        <br></br>
        <SimpleForm field="Notes" onHandleChange={handleNotesChange} />
        Your Notes are {notes}
        <br></br>
      </div>
    </div>
  );
}
