import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js/pure";
import { Typography } from "@material-ui/core";
import { Radio } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ScrollToTop from "../Blog/ScrollToTop";
import SeminarImg from "../Assets/Images/Seminar.webp";
import DonationElement from "./DonationElement";
import "../Home/Home.css";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const YellowRadio = withStyles({
  root: {
    color: "#D3A625",
    "&$checked": {
      color: "#D3A625",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export default function SeminarRegister() {
  const history = useHistory();
  const [fNErrors, setFNErrors] = useState("");
  const [lNErrors, setLNErrors] = useState("");
  const [emailErrors, setEmailErrors] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [numAttendees, setNumAttendees] = useState("");
  const [mode, setMode] = useState({
    inPerson: true,
    online: false,
  });
  const [attendMode, setAttendMode] = useState("In-Person");
  const [notes, setNotes] = useState("");
  const [donation, setDonation] = useState("");
  const [stripePromise, setStripePromise] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [registeredConfirm, setRegisteredConfirm] = useState(false);
  const [payNow, setPayNow] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  const handleMode = (event) => {
    var optionPick = event.target.name;
    var newModeObj = {};
    var newMode = "";
    if (optionPick === "inPerson") {
      newModeObj = {
        inPerson: true,
        online: false,
      };
      newMode = "In-Person";
    } else {
      newModeObj = {
        inPerson: false,
        online: true,
      };
      newMode = "Online";
    }
    setMode(newModeObj);
    setAttendMode(newMode);
  };

  function register() {
    var register = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      city: city,
      state: state,
      mode: attendMode,
      notes: notes,
      donation: donation,
      num_attendees: numAttendees,
    };

    axios
      .post(BASE_URL + "SeminarRegister", register)
      .then((response) => {
        setAttendMode("In-Person");
        setMode({
          inPerson: true,
          online: false,
        });
        setRegistered(true);

        window.scrollTo({ behavior: "smooth", top: 620 });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  function confirmation() {
    var name = {
      name: firstName,
    };
    axios
      .post(BASE_URL + `RegistrationConfirmation/${email}`, name)
      .then((response) => { })
      .catch((error) => {
        console.log("error", error);
      });
  }

  function toggleKeys() {
    if (notes == "NITYATEST") {
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

          setStripePromise(tempStripePromise);
          window.scrollTo({ behavior: "smooth", top: 620 });
          console.log(tempStripePromise);
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
    } else {
      // Fetch public key live
      console.log("fetching public key live");
      axios
        .get(
          "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/stripe_key/NITYA"
        )
        .then((result) => {
          console.log(
            "(2 PaymentDetails) Stripe-key then result (1): " +
            JSON.stringify(result)
          );

          let tempStripePromise = loadStripe(result.data.publicKey);

          console.log("(2 PaymentDetails) setting state with stripePromise");

          console.log(tempStripePromise);
          setStripePromise(tempStripePromise);
          window.scrollTo({ behavior: "smooth", top: 620 });
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
    }
  }
  const showFNError = () => {
    if (firstName != "") {
      return null;
    }
    return <Typography style={{ color: "red" }}>{fNErrors}</Typography>;
  };
  const showLNError = () => {
    if (lastName != "") {
      return null;
    }
    return <Typography style={{ color: "red" }}>{lNErrors}</Typography>;
  };
  const showEmailError = () => {
    if (email != "") {
      return null;
    }
    return <Typography style={{ color: "red" }}>{emailErrors}</Typography>;
  };

  return (
    <div className="HomeContainer">
      <Helmet>
        <title>Seminar Registration</title>
        <meta
          name="description"
          content="We offer Ayurvedic health consultations, Panchakarma (cleansing & purification treatments) and classical Ayurvedic wellness therapies"
        />
        <link rel="canonical" href="/seminaregister" />
      </Helmet>

      {/* <ScrollToTop /> */}
      <div className="Card">
        <img
          src={SeminarImg}
          style={{ width: "100%", height: "100%" }}
          className="CardImage"
        />
        <div style={{ height: "auto" }}></div>
      </div>
      <div></div>
      {registered ? (
        <div className="Card">
          {payNow ? null : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="CardTitle">Registration Confirmed</div>
              <div className="textConfirm" style={{ marginTop: "3rem" }}>
                Congrats! You are now registered for the workshop.
                <br />
                We have sent a confirmation email to
                <div className="textTitle">{email}</div>
              </div>
              <div className="textTitle" style={{ marginTop: "3rem" }}>
                Please check your email for workshop details.
              </div>
              <button
                className="registerBtn"
                hidden={registeredConfirm}
                onClick={() => {
                  //setRegistered(false);
                  setRegisteredConfirm(true);
                  setPayNow(true);
                  setShowDonation(true);
                  toggleKeys();
                }}
              >
                Make a Donation
              </button>
              <button
                hidden={registeredConfirm}
                className="registerBtn"
                onClick={() => {
                  history.push("/");
                }}
              >
                Back to Home
              </button>
            </div>
          )}
          {showDonation ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <DonationElement
                stripePromise={stripePromise}
                first_name={firstName}
                last_name={lastName}
                email={email}
                city={city}
                state={state}
                mode={attendMode}
                notes={notes}
                numAttendees={numAttendees}
                registered={registeredConfirm}
              />
            </div>
          ) : null}
        </div>
      ) : (
        <div className="Card">
          {payNow ? null : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="CardTitle">Register</div>
              <div style={{ marginTop: "3rem" }}></div>
              <input
                className="inputField"
                id="First Name"
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                required
              />
              <br />

              <input
                className="inputField"
                id="Last Name"
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                required
              />

              <br />
              <input
                className="inputField"
                id="Email"
                type="text"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />

              <br />
              <input
                className="inputField"
                id="City"
                type="text"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
              <br />
              <input
                className="inputField"
                id="sweep_referrer"
                type="text"
                placeholder="State"
                onChange={(e) => setState(e.target.value)}
                value={state}
              />
              <br />
              <Typography className="textTitle">
                How do you plan on attending the workshop?
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                      <YellowRadio
                        checked={mode.inPerson}
                        onChange={(e) => handleMode(e)}
                        name="modeInPerson"
                      />
                    }
                    label="In-person"
                  />
                  <FormControlLabel
                    control={
                      <YellowRadio
                        checked={mode.online}
                        onChange={(e) => handleMode(e)}
                        name="modeOnline"
                      />
                    }
                    label="Online"
                  />
                </FormGroup>
              </div>
              <Typography className="textTitle">
                Number of people attending the workshop?
              </Typography>
              <input
                className="inputField"
                id="notes"
                type="text"
                placeholder="Number of attendees"
                onChange={(e) => setNumAttendees(e.target.value)}
                value={numAttendees}
              />
              <br />
              <input
                className="inputField"
                id="notes"
                type="text"
                placeholder="Any questions?"
                onChange={(e) => setNotes(e.target.value)}
                value={notes}
              />
              <br />
              <Typography className="textTitle">
                $10 Donation suggested but not required.
              </Typography>
              {showFNError()}
              {showLNError()}
              {showEmailError()}
              {console.log(emailErrors, fNErrors, lNErrors)}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <button
                  className="registerBtn"
                  hidden={showDonation}
                  onClick={() => {
                    if (firstName.length === 0) {
                      setFNErrors("Please enter your first name");
                    } else if (lastName.length === 0) {
                      setLNErrors("Please enter your last name");
                    } else if (email.length === 0) {
                      setEmailErrors("Please enter your email address");
                    } else {
                      register();
                      confirmation();
                    }
                  }}
                >
                  Register Only
                </button>
                <button
                  className="showRegBtn"
                  hidden={showDonation}
                  onClick={() => {
                    if (firstName.length === 0) {
                      setFNErrors("Please enter your first name");
                    } else if (lastName.length === 0) {
                      setLNErrors("Please enter your last name");
                    } else if (email.length === 0) {
                      setEmailErrors("Please enter your email address");
                    } else {
                      setPayNow(true);
                      setShowDonation(true);
                      toggleKeys();
                    }
                  }}
                >
                  Register <br />
                  and Donate
                </button>
              </div>
            </div>
          )}

          {showDonation ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <DonationElement
                stripePromise={stripePromise}
                first_name={firstName}
                last_name={lastName}
                email={email}
                city={city}
                state={state}
                mode={attendMode}
                notes={notes}
                numAttendees={numAttendees}
                registered={registeredConfirm}
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
