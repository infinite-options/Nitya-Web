import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Calendar from "react-calendar";
import { Button } from "reactstrap";
import Box from "@material-ui/core/Box";
// import Form from "./Appointment/Form";
import SimpleForm from "./Appointment/simpleForm";
import Scheduler from "./Appointment/Scheduler";
import { useParams } from "react-router";
// The following react component is based on the youtube tutorial provided by Syncfusion, Inc. at the url below:

export default function AppointmentPage(props) {
  const { treatmentID } = useParams();

  return (
    <>
      <div className="page-container ">
        This is the treatment ID we have received {treatmentID}
        <Scheduler treatmentID={treatmentID} />
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
