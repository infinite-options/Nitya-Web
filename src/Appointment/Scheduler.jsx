import React, { useEffect, useState } from "react";
import axios from "axios";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import moment from "moment";
const useStyles = makeStyles({
  container: {
    margin: "50px auto",
    width: "980px",
    padding: "50px 50px",
    backgroundColor: "white",
    // backgroundColor: "blue"
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
  payButton: {
    width: "200px",
    height: "50px",
    backgroundColor: " #D3A625",
    border: "2px solid  #D3A625",
    color: "white",
    // padding: "0 10px 0 10px",
    textDecoration: "none",
    fontSize: "20px",
    borderRadius: "50px",
    fontFamily: "AvenirHeavy",
    "&:hover": {
      borderColor: " #D3A625",
      background: " #D3A625",
      color: "#white",
    },
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
    "&:active": {
      outline: "none",
      boxShadow: "none",
    },
    "&:disabled": {
      backgroundColor: " #D3A625",
      color: "white",
      opacity: "50%",
      "&:hover": {
        borderColor: " #D3A625",
      },
    },
  },
});

export const ApptContext = React.createContext();
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
export default function Scheduler(props) {
  const elements = useElements();
  const stripe = useStripe();
  const history = useHistory();
  //for confirmation page
  const [apptInfo, setApptInfo] = useState({});
  // for hide and show
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  useEffect(() => {
    console.log("RERENDER -- apptInfo: ", apptInfo);
    // setApptConfirmed(true);
    // console.log("apptInfo length: ", apptInfo.length);
    if (JSON.stringify(apptInfo) !== "{}") {
      history.push({
        pathname: "/apptconfirm",
        state: {
          apptInfo,
          // test_value: "test_string"
        },
      });
    }
  }, [apptInfo]);
  const convertTime12to24 = (time12h) => {
    let time = time12h.slice(0, -3);
    let modifier = time12h.slice(-2);
    console.log(time, modifier);
    if (time === "12") {
      time = "00";
    }

    if (modifier === "PM" || modifier === "pm") {
      time = parseInt(time, 10) + 12 + ":00";
      console.log("here", time);
    }
    console.log(time);
    return `${time}`;
  };

  function sendToDatabase() {
    console.log("create appt", {
      first_name: props.firstName,
      last_name: props.lastName,
      email: props.email,
      phone_no: props.phoneNum.replace(/[^a-z\d\s]+/gi, ""),
      appt_treatment_uid: props.treatmentID, //TREATMENT INFO #1
      notes: props.notes,
      mode: props.mode,
      age: props.age,
      gender: props.gender,
      appt_date: moment(props.date).format("YYYY-MM-DD"),
      appt_time: convertTime12to24(props.selectedTime),
      purchase_price: props.cost, //TREATMENT INFO #2
      purchase_date: dateFormat3(props.purchaseDate),
    });
    const postURL =
      "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/createAppointment";
    axios
      .post(postURL, {
        first_name: props.firstName,
        last_name: props.lastName,
        email: props.email,
        phone_no: props.phoneNum.replace(/[^a-z\d\s]+/gi, ""),
        appt_treatment_uid: props.treatmentID, //TREATMENT INFO #1
        notes: props.notes,
        mode: props.mode,
        age: props.age,
        gender: props.gender,
        appt_date: moment(props.date).format("YYYY-MM-DD"),
        appt_time: convertTime12to24(props.selectedTime),
        purchase_price: props.cost, //TREATMENT INFO #2
        purchase_date: dateFormat3(props.purchaseDate),
      })
      .then((res) => {
        console.log("create appt", res);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log("create appt: ");
        }
      });

    setApptInfo({
      first_name: props.firstName + " " + props.lastName,
      email: props.email,
      phone_no: props.phoneNum,
      treatment: props.treatmentName,
      purchase_price: props.cost,
      duration: props.duration,
      image_url: props.image_url,
      mode: props.mode,
      age: props.age,
      gender: props.gender,
    });
    // history.push("/apptconfirm", {apptInfo});
    console.log("create appt", apptInfo);
    // setApptConfirmed(true);
  }

  function convert(value) {
    var a = value.split(":"); // split it at the colons

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];

    return seconds + 1;
  }

  function creatEvent() {
    console.log(props.date, props.selectedTime);
    let st = props.treatmentDate + "T" + props.treatmentTime;
    let start_time = moment(new Date(st)).format();
    console.log(start_time);
    let duration = convert(props.duration);
    let et = Date.parse(start_time) / 1000 + duration;
    let end_time = moment(new Date(et * 1000)).format();
    console.log(end_time);
    var event = {
      summary: props.treatmentName,
      location: "6055 Meridian Ave #40, San Jose, CA, 95120",
      description:
        "Name: " +
        props.firstName + " " + props.lastName +
        "\n" +
        "Phone No: " +
        props.phoneNum.replace(/[^a-z\d\s]+/gi, ""),
      creator: {
        email: "support@nityaayurveda.com",
        self: true,
      },
      organizer: {
        email: "support@nityaayurveda.com",
        self: true,
      },
      start: {
        dateTime: start_time,
      },
      end: {
        dateTime: end_time,
      },
      attendees: [
        {
          email: props.email,
        },
        { email: "Lmarathay@gmail.com" },
      ],
    };
    console.log(event);
    //publishTheCalenderEvent(event)
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + props.accessToken,
    };
    axios
      .post(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${API_KEY}`,
        event,
        {
          headers: headers,
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.log("error", error);
      });
  }

  const [changeLoadingState, setLoadingState] = useState(false);
  // const [customerUid, setcustomerUid] = useState("");
  const [customerUidState, setCustomerUidState] = useState(false);

  // useEffect(() => {
  //   const tempFind = [];

  //   const body = {
  //     phone_num: props.phoneNum.replace(/[^a-z\d\s]+/gi, ""),
  //     email: props.email,
  //   };
  //   // sendToDatabase();
  //   axios
  //     .post(
  //       "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/findCustomer",
  //       body
  //     )
  //     .then((response) => {
  //       console.log("response", response);
  //       for (var i = 0; i < response.data.result.length; i++) {
  //         tempFind.push(response.data.result[i]);
  //       }
  //       console.log("response", tempFind);
  //       for (var i = 0; i < tempFind.length; i++) {
  //         if (props.email === tempFind[i].customer_email) {
  //           if (props.phoneNum === tempFind[i].customer_phone_num) {
  //             console.log("response", tempFind[i].customer_uid);
  //             setcustomerUid(tempFind[i].customer_uid);
  //           }
  //         }
  //       }
  //     });

  //   console.log("response", customerUid);
  // }, [customerUidState]);

  async function bookAppt() {
    const price = props.cost.split(" ", 1);

    setCustomerUidState(!customerUidState);
    const temp = {
      tax: 0,
      total: price[0].replace(/[$]/g, ""),
    };

    var clientSecret;
    const cardElement = await elements.getElement(CardElement);
    const paymentJSON = {
      customer_uid: props.customerUid,
      business_code: props.notes === "NITYATEST" ? "NITYATEST" : "NITYA",
      payment_summary: temp,
    };
    console.log(props.customerUid);
    const postURL =
      "https://huo8rhh76i.execute-api.us-west-1.amazonaws.com/dev/api/v2/createPaymentIntent";
    axios
      .post(postURL, {
        customer_uid: props.customerUid,
        business_code: props.notes === "NITYATEST" ? "NITYATEST" : "NITYA",
        payment_summary: temp,
      })
      .then(function (result) {
        console.log("createPaymentIntent result: " + JSON.stringify(result));
        console.log("clientSecret from createPaymentIntent: " + result.data);
        clientSecret = result.data;

        console.log("calling createPayment gMethod...", clientSecret);

        const paymentMethod = stripe
          .createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: result.data.billingDetails,
          })
          .then(function (res) {
            console.log("createPaymentMethod res: " + JSON.stringify(res));
            console.log(result.data.billingDetails);
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
                  console.log(result.data);
                  if (result.error) {
                    console.log(result.error);
                    setErrorMessage(result.error.message);
                    const body = {
                      name: props.firstName + " " + props.lastName,
                      phone: props.phoneNum,
                      email: props.email,
                      message: props.notes,
                      error: JSON.stringify(result.error),
                      endpoint_call: "confirmCardPayment",
                      jsonObject_sent: JSON.stringify(paymentJSON),
                    };
                    // sendToDatabase();
                    axios
                      .post(
                        "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/SendEmailPaymentIntent",
                        body
                      )
                      .then((response) => {
                        console.log("response", response.data.result);
                      });

                    setSubmitted(false);
                    setLoadingState(false);
                  } else {
                    sendToDatabase();
                    creatEvent();
                  }
                });
            } catch (e) {
              console.log(res.error.message);
              setErrorMessage(res.error.message);
              const body = {
                name: props.firstName + " " + props.lastName,
                phone: props.phoneNum,
                email: props.email,
                message: props.notes,
                error: JSON.stringify(res.error),
                endpoint_call: "createPaymentMethod",
                jsonObject_sent: JSON.stringify(paymentJSON),
              };
              // sendToDatabase();
              axios
                .post(
                  "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/SendEmailPaymentIntent",
                  body
                )
                .then((response) => {
                  console.log("response");
                });
              console.log("error trying to pay: ", e);

              setSubmitted(false);
              setLoadingState(false);
            }
          });
      })
      .catch((err) => {
        console.log(err);
        const body = {
          name: props.firstName + " " + props.lastName,
          phone: props.phoneNum,
          email: props.email,
          message: props.notes,
          error: "",
          endpoint_call: "createPaymentIntent",
          jsonObject_sent: JSON.stringify(paymentJSON),
        };
        // sendToDatabase();
        axios
          .post(
            "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/SendEmailPaymentIntent",
            body
          )
          .then((response) => {
            console.log("response", response.data.result);
            setErrorMessage("Payment Error");
          });
        if (err.response) {
          console.log("error: " + JSON.stringify(err.response));
          setSubmitted(false);
          setLoadingState(false);
        }
      });
    setSubmitted(true);
  }

  const classes = useStyles();
  console.log("(Scheduler) props: ", props);
  return (
    <div>
      <div>
        <br></br>
        {/* <div hidden={!submitted ? "hidden" : ""}>
          <Switch>
            <Route path="/apptconfirm">
              <ApptContext.Provider value={{ apptInfo, apptConfirmed }}>
                <AppointmentConfirmationPage
                  first_name={props.fName}
                  email={props.email}
                  phone_no={props.phoneNum}
                  treatment={props.treatmentName}
                  purchase_price={props.cost}
                  duration={props.duration}
                  image_url={props.image_url}
                />
              </ApptContext.Provider>
            </Route>
          </Switch>
        </div> */}
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
        <div
          className="text-center"
          style={errorMessage === "" ? { visibility: "hidden" } : {}}
        >
          <p style={{ color: "red", fontSize: "12px" }}>
            {errorMessage || "error"}
          </p>
        </div>
        <div
          aria-label={"click button to book your appointment"}
          hidden={!props.infoSubmitted ? "hidden" : ""}
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            disabled={submitted}
            onClick={bookAppt}
            className={classes.payButton}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
