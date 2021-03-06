import React, { useContext, useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { Elements, CardElement, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
//import StripeCheckout from "./StripeCheckout";
import { makeStyles } from "@material-ui/core/styles";
import Scheduler from "./Scheduler";

export default function StripeElement(props) {
  console.log(
    "stripePromise is set to: " + JSON.stringify(props.stripePromise)
  );

  return (
    <Elements stripe={props.stripePromise}>
      <Scheduler treatmentID={props.treatmentID} notes={props.notes} />
    </Elements>
  );
}
