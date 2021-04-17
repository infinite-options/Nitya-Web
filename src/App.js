import React from "react";
import "./App.css";
// import Service from './Home/Components/ServiceCard';
import { BrowserRouter as Router } from "react-router-dom";
import Homepage from "./Components/Homepage";
import { Navbar } from "reactstrap";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ServicePage from "./Components/ServicePage";
import AppointmentPage from "./Components/AppointmentPage";
import Nav from "./Nav";

function App() {
  return (
    <div className="App">
      {/* <Homepage />
   

      <ServicePage/>
      <AppointmentPage/> */}
      <Nav/>
   
      {/* <Homepage/> */}
      {/* <ServicePage treatment_uid = {"330-000004"}/> */}
      {/* <AppointmentPage/> */}
      {/* <Calendar/> */}
    </div>
  );
}

export default App;
