import React, { useEffect, useState } from "react";
import axios from "axios";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import moment from "moment";
import "moment-timezone";

// Loading spinner component
const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}
  >
    <div
      className='loader'
      style={{
        border: "4px solid #f3f3f3",
        borderTop: "4px solid #D3A625",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        animation: "spin 1s linear infinite",
        marginBottom: "15px",
      }}
    ></div>
    <div
      style={{
        color: "#D3A625",
        fontSize: "16px",
        fontWeight: "500",
      }}
    >
      Processing Payment...
    </div>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);
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
  // for loading state
  const [isProcessing, setIsProcessing] = useState(false);

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
    return date.getFullYear() + "-" + doubleDigitMonth(date) + "-" + doubleDigitDay(date);
  };

  useEffect(() => {
    console.log("🔍🔍🔍 NAVIGATION USEEFFECT TRIGGERED 🔍🔍🔍");
    console.log("🔍 apptInfo:", apptInfo);
    console.log("🔍 apptInfo type:", typeof apptInfo);
    console.log("🔍 apptInfo keys:", Object.keys(apptInfo));
    console.log("🔍 JSON.stringify(apptInfo):", JSON.stringify(apptInfo));
    console.log("🔍 JSON.stringify(apptInfo) !== '{}':", JSON.stringify(apptInfo) !== "{}");
    
    if (JSON.stringify(apptInfo) !== "{}") {
      console.log("🔍 apptInfo is not empty, proceeding with navigation");
      // Send data in the same format as AppointmentPage navigation
      const stateData = {
        date: apptInfo.appointmentDate,
        time: apptInfo.appointmentTime,
        mode: apptInfo.mode,
        totalCost: apptInfo.purchase_price,
        totalDuration: apptInfo.duration,
        durationText: durationToString(convertDurationToSeconds(apptInfo.duration)),
      };
      
      console.log("🔍 Scheduler navigation stateData:", stateData);
      console.log("🔍 Scheduler navigation time:", stateData.time);
      console.log("🔍 Scheduler navigation date:", stateData.date);
      console.log("🔍 Scheduler navigation mode:", stateData.mode);
      console.log("🔍 Navigation pathname:", `/${props.treatmentID}/confirm`);
      
      history.push({
        pathname: `/${props.treatmentID}/confirm`,
        state: stateData,
      });
      
      console.log("🔍 Navigation completed");
    } else {
      console.log("🔍 apptInfo is empty, not navigating");
    }
    console.log("🔍🔍🔍 END NAVIGATION USEEFFECT 🔍🔍🔍");
  }, [apptInfo, props.treatmentID, history]);
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

  // Enhanced timezone-aware time conversion
  const convertTimeWithTimezone = (time12h, date) => {
    // The time coming from the backend is already in PST
    // We need to ensure the Google Calendar event is created in PST
    let time = time12h.slice(0, -3);
    let modifier = time12h.slice(-2);

    if (time === "12") {
      time = "00";
    }

    if (modifier === "PM" || modifier === "pm") {
      time = parseInt(time, 10) + 12;
    }

    // Format as HH:MM:SS
    const formattedTime = `${time.toString().padStart(2, "0")}:00:00`;

    // Create a moment object in PST
    const pstDateTime = moment.tz(date + "T" + formattedTime, "America/Los_Angeles");

    // Return full datetime string for database storage
    return pstDateTime.format("YYYY-MM-DD HH:mm:ss");
  };

  function sendToDatabase() {
    // Convert treatmentTime from 12-hour format to 24-hour format for database
    let formattedTime = props.treatmentTime;
    
    // Check if it's in 12-hour format (contains AM/PM)
    if (props.treatmentTime && (props.treatmentTime.includes("AM") || props.treatmentTime.includes("PM"))) {
      console.log("Converting 12-hour format to 24-hour format");
      const [timePart, period] = props.treatmentTime.split(" ");
      const [hoursStr, minutesStr] = timePart.split(":");
      let hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);
      
      // Convert to 24-hour format
      if (period === "AM" && hours === 12) {
        hours = 0;
      } else if (period === "PM" && hours !== 12) {
        hours += 12;
      }
      
      formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    } else if (props.treatmentTime && props.treatmentTime.includes(":")) {
      // Already in 24-hour format, just ensure proper formatting
      const [hoursStr, minutesStr] = props.treatmentTime.split(":");
      const hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);
      formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    }
    
    console.log("=== APPOINTMENT CREATION DEBUG ===");
    console.log("Raw selectedTime (timezone-converted):", props.selectedTime);
    console.log("Raw treatmentTime (Pacific Time):", props.treatmentTime);
    console.log("Formatted time for database (24-hour format):", formattedTime);
    console.log("Raw date:", props.date);
    console.log("Full appointment data:", {
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
      appt_time: formattedTime,
      purchase_price: props.cost, //TREATMENT INFO #2
      purchase_date: dateFormat3(props.purchaseDate),
    });
    const postURL = "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/createAppointment";
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
        appt_time: formattedTime,
        purchase_price: props.cost, //TREATMENT INFO #2
        purchase_date: dateFormat3(props.purchaseDate),
      })
      .then((res) => {
        console.log("create appt", res);
        // Backend automatically sends confirmation emails, no need for frontend email call
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log("create appt: ");
        }
      });

    console.log("🔍🔍🔍 SETTING APPT INFO 🔍🔍🔍");
    console.log("🔍 props.treatmentTime:", props.treatmentTime);
    console.log("🔍 props.date:", props.date);
    console.log("🔍 props.mode:", props.mode);
    console.log("🔍 props.cost:", props.cost);
    console.log("🔍 props.duration:", props.duration);
    
    const newApptInfo = {
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
      appointmentDate: moment(props.date).format("YYYY-MM-DD"),
      appointmentTime: props.treatmentTime, // Use Pacific Time, not timezone-converted time
    };
    
    console.log("🔍 newApptInfo:", newApptInfo);
    setApptInfo(newApptInfo);
    console.log("🔍 setApptInfo called with:", newApptInfo);
    console.log("🔍 Current apptInfo state (before update):", apptInfo);
    console.log("🔍🔍🔍 END SETTING APPT INFO 🔍🔍🔍");
    
    // Navigate directly instead of relying on useEffect
    console.log("🔍🔍🔍 DIRECT NAVIGATION 🔍🔍🔍");
    console.log("🔍 props.treatmentID:", props.treatmentID);
    console.log("🔍 history object:", history);
    console.log("🔍 history.push function:", typeof history.push);
    
    const stateData = {
      date: newApptInfo.appointmentDate,
      time: newApptInfo.appointmentTime,
      mode: newApptInfo.mode,
      totalCost: newApptInfo.purchase_price,
      totalDuration: newApptInfo.duration,
      durationText: durationToString(convertDurationToSeconds(newApptInfo.duration)),
    };
    
    console.log("🔍 Direct navigation stateData:", stateData);
    console.log("🔍 Direct navigation pathname:", `/${props.treatmentID}/confirm`);
    
    try {
      history.push({
        pathname: `/${props.treatmentID}/confirm`,
        state: stateData,
      });
      console.log("🔍 Direct navigation completed successfully");
    } catch (error) {
      console.error("❌ Navigation error:", error);
      console.error("❌ Error stack:", error.stack);
    }
    
    console.log("🔍🔍🔍 END DIRECT NAVIGATION 🔍🔍🔍");
  }

  function convert(value) {
    var a = value.split(":"); // split it at the colons

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];

    return seconds + 1;
  }

  const convertDurationToSeconds = (durationStr) => {
    if (!durationStr) return 0;
    const [hours, minutes, seconds] = durationStr.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const durationToString = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  function creatEvent() {
    console.log("=== GOOGLE CALENDAR EVENT CREATION DEBUG ===");
    console.log("props.date:", props.date);
    console.log("props.selectedTime:", props.selectedTime);
    console.log("props.treatmentTime:", props.treatmentTime);

    try {
      // Use the raw treatmentTime (Pacific Time) for Google Calendar
      let timeString = props.treatmentTime;
      
      // Convert from 12-hour to 24-hour format if needed
      if (timeString && (timeString.includes("AM") || timeString.includes("PM"))) {
        const [timePart, period] = timeString.split(" ");
        const [hoursStr, minutesStr] = timePart.split(":");
        let hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);
        
        if (period === "AM" && hours === 12) {
          hours = 0;
        } else if (period === "PM" && hours !== 12) {
          hours += 12;
        }
        
        timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      }
      
      console.log("Converted time string:", timeString);

      // Create proper datetime string
      const dateString = moment(props.date).format("YYYY-MM-DD");
      const startDateTime = `${dateString}T${timeString}:00`;
      console.log("Start datetime string:", startDateTime);
      
      // Create moment objects in PST
      const startMoment = moment.tz(startDateTime, "America/Los_Angeles");
      const durationSeconds = convertDurationToSeconds(props.duration);
      const endMoment = startMoment.clone().add(durationSeconds, 'seconds');
      
      console.log("Start moment:", startMoment.format());
      console.log("End moment:", endMoment.format());
      const event = {
        summary: props.treatmentName,
        location: "1610 Blossom Hill Road, #1, San Jose, CA, 95124",
        description: `Name: ${props.firstName} ${props.lastName}\nPhone: ${props.phoneNum.replace(/[^a-z\d\s]+/gi, "")}`,
        start: {
          dateTime: startMoment.format(),
          timeZone: "America/Los_Angeles",
        },
        end: {
          dateTime: endMoment.format(),
          timeZone: "America/Los_Angeles",
        },
        attendees: [
          {
            email: props.email,
          },
          { 
            email: "Lmarathay@gmail.com" 
          },
        ],
      };
      
      console.log("Google Calendar event object:", JSON.stringify(event, null, 2));
      
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${props.accessToken}`,
      };
      
      axios
        .post(`https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${API_KEY}`, event, {
          headers: headers,
        })
        .then((response) => {
          console.log("✅ Google Calendar event created successfully:", response.data);
        })
        .catch((error) => {
          console.error("❌ Google Calendar API error:", error);
          console.error("❌ Error response:", error.response?.data);
          console.error("❌ Error status:", error.response?.status);
          console.error("❌ Error headers:", error.response?.headers);
          console.error("❌ Full error object:", error);
        });
    } catch (error) {
      console.error("❌ Error in creatEvent function:", error);
    }
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
    // Prevent multiple submissions
    if (isProcessing) {
      return;
    }

    console.log(props);
    const price = props.cost.split(" ", 1);

    setCustomerUidState(!customerUidState);
    setIsProcessing(true); // Start loading
    const temp = {
      tax: 0,
      total: price[0].replace(/[$]/g, ""),
    };

    var clientSecret;
    const cardElement = elements.getElement(CardElement);
    
    // Validate card element exists
    if (!cardElement) {
      setErrorMessage("Card information is required");
      setIsProcessing(false);
      return;
    }

    const paymentJSON = {
      customer_uid: props.customerUid,
      business_code: props.notes === "NITYATEST" ? "NITYATEST" : "NITYA",
      payment_summary: temp,
    };
    console.log(props.customerUid);
    const postURL = "https://huo8rhh76i.execute-api.us-west-1.amazonaws.com/dev/api/v2/createPaymentIntent";
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
            billing_details: {
              name: props.firstName + " " + props.lastName,
              email: props.email,
              phone: props.phoneNum
            }
          })
          .then(function (res) {
            console.log("🔍🔍🔍 CREATE PAYMENT METHOD RESULT 🔍🔍🔍");
            console.log("🔍 createPaymentMethod res:", JSON.stringify(res));
            console.log("🔍 res.error:", res.error);
            console.log("🔍 res.error exists:", !!res.error);
            
            // Check for createPaymentMethod errors
            if (res.error) {
              console.log("❌ createPaymentMethod error detected:", res.error);
              console.log("createPaymentMethod error:", res.error);
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
              axios.post("https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/SendEmailPaymentIntent", body).then((response) => {
                console.log("response", response.data.result);
              });
              setSubmitted(false);
              setLoadingState(false);
              setIsProcessing(false);
              return;
            }

            console.log("✅ createPaymentMethod successful! Calling confirmCardPayment...");

            try {
              const confirmedCardPayment = stripe
                .confirmCardPayment(clientSecret, {
                  payment_method: res.paymentMethod.id,
                  setup_future_usage: "off_session",
                })
                .then(function (result) {
                  console.log("🔍🔍🔍 CONFIRM CARD PAYMENT RESULT 🔍🔍🔍");
                  console.log("🔍 confirmedCardPayment result:", JSON.stringify(result));
                  console.log("🔍 result.data:", result.data);
                  console.log("🔍 result.error:", result.error);
                  console.log("🔍 result.error exists:", !!result.error);
                  
                  if (result.error) {
                    console.log("❌ Payment error detected:", result.error);
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
                    axios.post("https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/SendEmailPaymentIntent", body).then((response) => {
                      console.log("response", response.data.result);
                    });

                    setSubmitted(false);
                    setLoadingState(false);
                    setIsProcessing(false); // Stop loading on error
                  } else {
                    console.log("✅ Payment successful! Calling sendToDatabase() and creatEvent()");
                    sendToDatabase();
                    creatEvent();
                    setIsProcessing(false); // Stop loading on success
                  }
                });
            } catch (e) {
              console.log("Error in confirmCardPayment:", e);
              setErrorMessage("Payment confirmation failed");
              const body = {
                name: props.firstName + " " + props.lastName,
                phone: props.phoneNum,
                email: props.email,
                message: props.notes,
                error: JSON.stringify(e),
                endpoint_call: "confirmCardPayment",
                jsonObject_sent: JSON.stringify(paymentJSON),
              };
              // sendToDatabase();
              axios.post("https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/SendEmailPaymentIntent", body).then((response) => {
                console.log("response");
              });
              console.log("error trying to pay: ", e);

              setSubmitted(false);
              setLoadingState(false);
              setIsProcessing(false); // Stop loading on error
            }
          })
          .catch(function (error) {
            console.log("createPaymentMethod catch error:", error);
            setErrorMessage("Payment method creation failed");
            const body = {
              name: props.firstName + " " + props.lastName,
              phone: props.phoneNum,
              email: props.email,
              message: props.notes,
              error: JSON.stringify(error),
              endpoint_call: "createPaymentMethod",
              jsonObject_sent: JSON.stringify(paymentJSON),
            };
            axios.post("https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/SendEmailPaymentIntent", body).then((response) => {
              console.log("response");
            });
            setSubmitted(false);
            setLoadingState(false);
            setIsProcessing(false);
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
        axios.post("https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/SendEmailPaymentIntent", body).then((response) => {
          console.log("response", response.data.result);
          setErrorMessage("Payment Error");
        });
        if (err.response) {
          console.log("error: " + JSON.stringify(err.response));
          setSubmitted(false);
          setLoadingState(false);
          setIsProcessing(false); // Stop loading on error
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
        <div className='text-center' style={errorMessage === "" ? { visibility: "hidden" } : {}}>
          <p style={{ color: "red", fontSize: "12px" }}>{errorMessage || "error"}</p>
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
          {isProcessing ? (
            <LoadingSpinner />
          ) : (
            <button disabled={submitted} onClick={bookAppt} className={classes.payButton}>
              Pay Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
