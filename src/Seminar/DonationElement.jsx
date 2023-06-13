import React from "react";

import { Elements } from "@stripe/react-stripe-js";

import Donation from "./Donation";

export default function DonationElement(props) {
  console.log("stripePromise is set to: " + props.stripePromise, props);

  return (
    <Elements stripe={props.stripePromise}>
      <Donation
        first_name={props.first_name}
        last_name={props.last_name}
        email={props.email}
        city={props.city}
        state={props.state}
        mode={props.mode}
        notes={props.notes}
        numAttendees={props.numAttendees}
        registered={props.registered}
      />
    </Elements>
  );
}
