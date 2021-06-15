import React, { useState, useEffect } from "react";
import Scheduler from "./Appointment/Scheduler";
import StripeElement from "./Appointment/StripeElement";
import { useParams } from "react-router";
import ScrollToTop from "../Blog/ScrollToTop";
import { Elements, CardElement, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Restaurant } from "@material-ui/icons";
import axios from "axios";

// The following react component is based on the youtube tutorial provided by Syncfusion, Inc. at the url below:

export default function AppointmentPage(props) {
  const { treatmentID } = useParams();

  const [stripePromise, setStripePromise] = useState(null);

  const [stripePromise1, setStripePromise1] = useState(null);
  const [stripePromise2, setStripePromise2] = useState(null);
  const [testKeys, setTestKeys] = useState(false);

  let PUBLISHABLE_KEY = "pk_test_51Ihyn......0wa0SR2JG";

  useEffect(() => {
    // if (true) {
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

        // this.setState({
        //   stripePromise: stripePromise
        // });
        setStripePromise1(tempStripePromise);

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
    // } else {
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

        // this.setState({
        //   stripePromise: stripePromise
        // });
        setStripePromise2(tempStripePromise);

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
    // }
  }, []);

  //let stripePromise = loadStripe(PUBLISHABLE_KEY);

  return (
    <>
      <div className="page-container ">
        <ScrollToTop />

        {/* <Elements stripe={stripePromise}>
          <Scheduler treatmentID={treatmentID} />
        </Elements> */}
        {testKeys ? (
          <>
            <h1>You are using test keys</h1>
            <StripeElement
              stripePromise={stripePromise1}
              treatmentID={treatmentID}
            />
          </>
        ) : (
          <>
            <h1>You are using live keys</h1>
            <StripeElement
              stripePromise={stripePromise2}
              treatmentID={treatmentID}
            />
          </>
        )}
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
