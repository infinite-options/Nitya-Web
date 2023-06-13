import React from "react";

import { Elements } from "@stripe/react-stripe-js";

import Scheduler from "./Scheduler";

export default function StripeElement(props) {
  console.log("stripePromise is set to: " + props.stripePromise, props);

  return (
    <Elements stripe={props.stripePromise}>
      <Scheduler
        accessToken={props.accessToken}
        treatmentID={props.treatmentID}
        customerUid={props.customerUid}
        notes={props.notes}
        infoSubmitted={props.infoSubmitted}
        firstName={props.firstName}
        lastName={props.lastName}
        email={props.email}
        phoneNum={props.phoneNum}
        date={props.date}
        purchaseDate={props.purchaseDate}
        selectedTime={props.selectedTime}
        treatmentDate={props.treatmentDate}
        treatmentTime={props.treatmentTime}
        mode={props.mode}
        age={props.age}
        gender={props.gender}
        cost={props.cost}
        treatmentName={props.treatmentName}
        duration={props.duration}
        image_url={props.image_url}
      />
    </Elements>
  );
}
