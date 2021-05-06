import React from "react";
import Scheduler from "./Appointment/Scheduler";
import { useParams } from "react-router";
import ScrollToTop from "../Blog/ScrollToTop";
import { Elements, CardElement, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Restaurant } from "@material-ui/icons";

// The following react component is based on the youtube tutorial provided by Syncfusion, Inc. at the url below:

export default function AppointmentPage(props) {
  const { treatmentID } = useParams();

  let PUBLISHABLE_KEY = "pk_test_51Ihyn......0wa0SR2JG";

  let stripePromise = loadStripe(PUBLISHABLE_KEY);

  return (
    <>
      <div className="page-container ">
        <ScrollToTop />

        <Elements stripe={stripePromise}>
          <Scheduler treatmentID={treatmentID} />
        </Elements>
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
