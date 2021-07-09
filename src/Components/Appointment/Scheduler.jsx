import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { makeStyles } from "@material-ui/core/styles";
import { MyContext } from "../../App";

export default function Scheduler(props) {
  const elements = useElements();
  const stripe = useStripe();

  // for hide and show
  const [submitted, setSubmitted] = useState(false);

  //String formatting functions for the date variable
  const doubleDigitMonth = (date) => {
    let str = "00" + (date.getMonth() + 1);
    return str.substring(str.length - 2);
  };

  const doubleDigitDay = (date) => {
    let str = "00" + date.getDate();
    return str.substring(str.length - 2);
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

  function sendToDatabase() {
    const postURL =
      "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/createAppointment";
    axios
      .post(postURL, {
        first_name: props.fName,
        last_name: "",
        email: props.email,
        phone_no: props.phoneNum,
        appt_treatment_uid: props.treatmentID, //TREATMENT INFO #1
        notes: props.notes,
        appt_date: dateFormat3(props.date),
        appt_time: props.selectedTime,
        purchase_price: props.cost, //TREATMENT INFO #2
        purchase_date: dateFormat3(props.purchaseDate),
      })
      .then((res) => console.log(res));
  }

  const [changeLoadingState, setLoadingState] = useState(false);

  async function bookAppt() {
    sendToDatabase();
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
        business_code: "NITYATEST",
        payment_summary: temp,
      })
      .then(function (result) {
        console.log("createPaymentIntent result: " + JSON.stringify(result));
        console.log("clientSecret from createPaymentIntent: " + result.data);
        clientSecret = result.data;

        console.log("calling createPayment gMethod...");

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
    setSubmitted(true);
  }

  const useStyles = makeStyles({
    container: {
      margin: "50px auto",
      width: "980px",
      padding: "50px 50px",
      backgroundColor: "white",
    },
    button: {
      backgroundColor: "white",
      border: "2px solid #B28D42",
      color: "#B28D42",
      padding: "15px 90px",
      textAlign: "center",
      textDecoration: "none",
      display: "block",
      fontSize: "20px",
      borderRadius: "50px",
      margin: "2px auto",
      "&:hover": {
        background: "#B28D42",
        color: "white",
      },
      "&:focus": {
        outline: "none",
        boxShadow: "none",
      },
      "&:active": {
        outline: "none",
        boxShadow: "none",
      },
    },
    buttonDisable: {
      backgroundColor: "#B28D42",
      border: "none",
      color: "white",
      padding: "15px 100px",
      textAlign: "center",
      textDecoration: "none",
      display: "block",
      fontSize: "20px",
      borderRadius: "50px",
      margin: "0 auto",
      opacity: "50%",
      boxShadow: "none",
      "&:focus": {
        outline: "none",
        boxShadow: "none",
      },
      "&:active": {
        outline: "none",
        boxShadow: "none",
      },
    },
  });

  const classes = useStyles();
  return (
    <div>
      <CardElement
        elementRef={(c) => (this._element = c)}
        // className={props.classes.element}
        // options={options}
        style={{
          backgroundColor: "white",
          padding: "10px",
          boxSizing: "border-box",
          borderRadius: "20px",
          fontColor: "#52330D",
          fontSize: "20px",
          margin: "5px auto",
          border: "2px solid #52330D",
          width: "100%",
          fontFamily: "AvenirHeavy",
          outline: "none",
        }}
      />

      <div aria-label={"click button to book your appointment"}>
        <div hidden={!props.infoSubmitted ? "hidden" : ""}>
          <button className={classes.button} onClick={bookAppt}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
