import React, {
  useMemo,
  useContext,
  useState,
  useEffect,
  createContext,
} from "react";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import Stripe from "stripe";
//Stripe = require("https://js.stripe.com/v3/");
import { loadStripe } from "@stripe/stripe-js";
import { useHistory } from "react-router";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/styles/withStyles";
import TextField from "@material-ui/core/TextField";

import PropTypes from "prop-types";
import { connect } from "react-redux";

// import checkoutItems from "../../utils/CheckoutItems";
import checkoutItems from "./CheckoutItems";
// import createGuestAccount from "../../utils/CreateGuestAccount";

import { SchedulerContext } from "./Scheduler";

// import { submitPayment } from "../../reducers/actions/subscriptionActions";
//Instead of importing the function from another file, we directly copy-pasted the function into this file.

// export const submitPayment = (
//   //I'm going to need to provide the variables that I wish to send into the database
//   customerFirstName,
//   customerLastName,
//   customerEmail,
//   customerPhoneNum,
//   selectedTreatmentID,
//   customerNotes,
//   selectedApptDate,
//   selectedApptTime,
//   dateOfPurchase,
//   amount,

//   // customerEmail,
//   // customerUid,
//   // loginMethod,
//   // customerPassword,
//   // deliveryFirstName,
//   // deliveryLastName,
//   // deliveryPhone,
//   // deliveryAddress,
//   // deliveryUnit,
//   // deliveryCity,
//   // deliveryState,
//   // deliveryZip,
//   // deliveryInstructions,
//   // selectedPlan,
//   cardNumber,
//   cardMonth,
//   cardYear,
//   cardCvv,
//   cardZip,
//   callback
// ) => (dispatch) => {
//   console.log(customerEmail, customerUid, loginMethod);
//   // if (loginMethod === "NULL") {
//   //   // Prepare to login
//   //   axios
//   //     .post(API_URL + "accountsalt", {
//   //       email: customerEmail,
//   //     })
//   //     .then((res) => {
//   //       let saltObject = res;
//   //       if (saltObject.status === 200) {
//   //         let hashAlg = saltObject.data.result[0].password_algorithm;
//   //         let salt = saltObject.data.result[0].password_salt;
//   //         //Get hash algorithm
//   //         switch (hashAlg) {
//   //           case "SHA512":
//   //             hashAlg = "SHA-512";
//   //             break;

//   //           default:
//   //             break;
//   //         }
//   //         let saltedPassword = customerPassword + salt;
//   //         console.log("saltedPW: " + saltedPassword);
//   //         console.log("customerPW: " + customerPassword);
//   //         console.log("salt: " + salt);
//   //         // Encode salted password to prepare for hashing
//   //         const encoder = new TextEncoder();
//   //         const data = encoder.encode(saltedPassword);
//   //         // Hash salted password
//   //         crypto.subtle.digest(hashAlg, data).then((res) => {
//   //           // Decode hash with hex digest
//   //           let hash = res;
//   //           let hashArray = Array.from(new Uint8Array(hash));
//   //           let hashedPassword = hashArray
//   //             .map((byte) => byte.toString(16).padStart(2, "0"))
//   //             .join("");
//   //           console.log("hashed password: " + hashedPassword);
//   //           axios
//   //             .get(BING_LOCATION_API_URL, {
//   //               params: {
//   //                 CountryRegion: "US",
//   //                 adminDistrict: deliveryState,
//   //                 locality: deliveryCity,
//   //                 postalCode: deliveryZip,
//   //                 addressLine: deliveryAddress,
//   //                 key: process.env.REACT_APP_BING_LOCATION_KEY,
//   //               },
//   //             })
//   //             .then((res) => {
//   //               let locationApiResult = res.data;
//   //               if (locationApiResult.statusCode === 200) {
//   //                 let locations = locationApiResult.resourceSets[0].resources;
//   //                 /* Possible improvement: choose better location in case first one not desired
//   //                  */
//   //                 let location = locations[0];
//   //                 let lat = location.geocodePoints[0].coordinates[0];
//   //                 let long = location.geocodePoints[0].coordinates[1];
//   //                 if (location.geocodePoints.length === 2) {
//   //                   lat = location.geocodePoints[1].coordinates[0];
//   //                   long = location.geocodePoints[1].coordinates[1];
//   //                 }
//   //                 console.log(selectedPlan);
//   //                 let purchasedItem = [
//   //                   {
//   //                     qty: selectedPlan.num_deliveries.toString(),
//   //                     name: selectedPlan.item_name,
//   //                     price: (
//   //                       selectedPlan.item_price *
//   //                       selectedPlan.num_deliveries *
//   //                       (1 - selectedPlan.delivery_discount * 0.01)
//   //                     ).toFixed(2),
//   //                     item_uid: selectedPlan.item_uid,
//   //                     itm_business_uid: "200-000002",
//   //                   },
//   //                 ];
//   //                 console.log(
//   //                   "purchased item: " + JSON.stringify(purchasedItem)
//   //                 );
//   //                 let object = {
//   //                   customer_uid: customerUid,
//   //                   salt: hashedPassword,
//   //                   business_uid: "200-000002",
//   //                   delivery_first_name: deliveryFirstName,
//   //                   delivery_last_name: deliveryLastName,
//   //                   delivery_email: customerEmail,
//   //                   delivery_phone: deliveryPhone,
//   //                   delivery_address: deliveryAddress,
//   //                   delivery_unit: deliveryUnit,
//   //                   delivery_city: deliveryCity,
//   //                   delivery_state: deliveryState,
//   //                   delivery_zip: deliveryZip,
//   //                   delivery_instructions: deliveryInstructions,
//   //                   delivery_longitude: long.toString(),
//   //                   delivery_latitude: lat.toString(),
//   //                   items: purchasedItem,
//   //                   amount_due: (
//   //                     selectedPlan.item_price *
//   //                     selectedPlan.num_deliveries *
//   //                     (1 - selectedPlan.delivery_discount * 0.01)
//   //                   ).toFixed(2),
//   //                   amount_discount: "0",
//   //                   amount_paid: "0",
//   //                   cc_num: cardNumber,
//   //                   cc_exp_month: cardMonth,
//   //                   cc_exp_year: cardYear,
//   //                   cc_cvv: cardCvv,
//   //                   cc_zip: cardZip,
//   //                 };
//   //                 console.log(
//   //                   "password checkoutInfo: " + JSON.stringify(object)
//   //                 );
//   //                 axios
//   //                   .post(API_URL + "checkout", object)
//   //                   .then((res) => {
//   //                     console.log("checkout successful!");
//   //                     //console.log("checkout response: " + JSON.stringify(res));
//   //                     dispatch({
//   //                       type: SUBMIT_PAYMENT,
//   //                     });
//   //                     callback(res);
//   //                   })
//   //                   .catch((err) => {
//   //                     //console.log("Error attempting to complete purchase");
//   //                     console.log("Error: " + err);
//   //                     if (err.response) {
//   //                       console.log(
//   //                         "error.response: " + JSON.stringify(err.response)
//   //                       );
//   //                       callback(err.response);
//   //                     }
//   //                   });
//   //               }
//   //             })
//   //             .catch((err) => {
//   //               console.log(err);
//   //               if (err.response) {
//   //                 console.log(err.response);
//   //                 callback(err.response);
//   //               }
//   //             });
//   //         });
//   //       }
//   //     });
//   // } else {
//   //   //the user is logged in
//   //   // Skip sign in part

//     // axios
//     //   .get(BING_LOCATION_API_URL, {
//     //     params: {
//     //       CountryRegion: "US",
//     //       adminDistrict: deliveryState,
//     //       locality: deliveryCity,
//     //       postalCode: deliveryZip,
//     //       addressLine: deliveryAddress,
//     //       key: process.env.REACT_APP_BING_LOCATION_KEY,
//     //     },
//     //   })
//     //   .then((res) => {
//     //     let locationApiResult = res.data;
//     //     if (locationApiResult.statusCode === 200) {
//     //       let locations = locationApiResult.resourceSets[0].resources;
//     //       /* Possible improvement: choose better location in case first one not desired
//     //        */
//     //       let location = locations[0];
//     //       let lat = location.geocodePoints[0].coordinates[0];
//     //       let long = location.geocodePoints[0].coordinates[1];
//     //       if (location.geocodePoints.length === 2) {
//     //         lat = location.geocodePoints[1].coordinates[0];
//     //         long = location.geocodePoints[1].coordinates[1];
//     //       }
//     //       console.log(selectedPlan);
//     //       let purchasedItem = [
//     //         {
//     //           qty: selectedPlan.num_deliveries.toString(),
//     //           name: selectedPlan.item_name,
//     //           price: (
//     //             selectedPlan.item_price *
//     //             selectedPlan.num_deliveries *
//     //             (1 - selectedPlan.delivery_discount * 0.01)
//     //           ).toFixed(2),
//     //           item_uid: selectedPlan.item_uid,
//     //           itm_business_uid: "200-000002",
//     //         },
//     //       ];
//     //       console.log("purchased item: " + JSON.stringify(purchasedItem));
//           let object = {
//             //The information I am grabbing from the web form must be put in here
//             //that way I send information about a particular treatment.
//             customerFirstName: fName,
//             customerLastName: lName,
//             customerEmail: email,
//             customerPhoneNum: phoneNum,
//             selectedTreatmentID: treatment_uid,
//             customerNotes: notes,
//             selectedApptDate: apptDate,
//             selectedApptTime: selectedTime,
//             dateOfPurchase: purchaseDate,
//             amount: price,

//             // customer_uid: customerUid,
//             // business_uid: "200-000002",
//             // delivery_first_name: deliveryFirstName,
//             // //example delivery_first_name: customerFirstName,
//             // delivery_last_name: deliveryLastName,
//             // delivery_email: customerEmail,
//             // delivery_phone: deliveryPhone,
//             // delivery_address: deliveryAddress,
//             // delivery_unit: deliveryUnit,
//             // delivery_city: deliveryCity,
//             // delivery_state: deliveryState,
//             // delivery_zip: deliveryZip,
//             // delivery_instructions: deliveryInstructions,
//             // delivery_longitude: long.toString(),
//             // delivery_latitude: lat.toString(),
//             // items: purchasedItem,
//             // amount_due: (
//             //   selectedPlan.item_price *
//             //   selectedPlan.num_deliveries *
//             //   (1 - selectedPlan.delivery_discount * 0.01)
//             // ).toFixed(2),
//             // amount_discount: "0",
//             // amount_paid: "0",
//             cc_num: cardNumber,
//             cc_exp_month: cardMonth,
//             cc_exp_year: cardYear,
//             cc_cvv: cardCvv,
//             cc_zip: cardZip,
//           };

//           console.log(JSON.stringify(object));
//           axios
//             .post(API_URL + "checkout", object)
//             .then((res) => {
//               console.log(res);
//               dispatch({
//                 type: SUBMIT_PAYMENT,
//               });
//               callback();
//             })
//             .catch((err) => {
//               console.log(err);
//               if (err.response) {
//                 console.log(err.response);
//               }
//             });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         if (err.response) {
//           console.log(err.response);
//         }
//       });
//   }
// };

export const submitPayment = (
  //I'm going to need to provide the variables that I wish to send into the database
  customerFirstName,
  customerLastName,
  customerEmail,
  customerPhoneNum,
  selectedTreatmentID,
  customerNotes,
  selectedApptDate,
  selectedApptTime,
  dateOfPurchase,
  amount,

  cardNumber,
  cardMonth,
  cardYear,
  cardCvv,
  cardZip,
  callback
) => (dispatch) => {
  const {
    fName,
    lName,
    email,
    phoneNum,
    treatment_uid,
    notes,
    apptDate,
    selectedTime,
    purchaseDate,
    price,
  } = useContext(SchedulerContext);
  // console.log(customerEmail, customerUid, loginMethod);

  // let object = {
  //   //The information I am grabbing from the web form must be put in here
  //   //that way I send information about a particular treatment.
  //   customerFirstName: fName,
  //   customerLastName: lName,
  //   customerEmail: email,
  //   customerPhoneNum: phoneNum,
  //   selectedTreatmentID: treatment_uid,
  //   customerNotes: notes,
  //   selectedApptDate: apptDate,
  //   selectedApptTime: selectedTime,
  //   dateOfPurchase: purchaseDate,
  //   amount: price,

  //   cc_num: cardNumber,
  //   cc_exp_month: cardMonth,
  //   cc_exp_year: cardYear,
  //   cc_cvv: cardCvv,
  //   cc_zip: cardZip,
  // };

  const postURL =
    "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/createAppointment";
  axios
    .post(postURL, {
      first_name: fName,
      last_name: lName,
      email: email,
      phone_no: phoneNum,
      appt_treatment_uid: treatment_uid, //TREATMENT INFO #1
      notes: notes,
      appt_date: apptDate,
      appt_time: selectedTime,
      purchase_price: price, //TREATMENT INFO #2
      purchase_date: purchaseDate,
    })
    .then((res) => console.log(res));
}; //end submitPayment

const appColors = {
  primary: "#e88330",
  secondary: "#397d87",
  paragraphText: "#7d7d7d",
  componentBg: "#f1f4f4",
  checkoutSectionBorder: "#e2e5e5",
  border: "#d1d1d1",
  buttonText: "white",
};

const CssTextField = withStyles({
  root: {
    backgroundColor: "#fcfcfb",
    "& label.Mui-focused": {
      color: appColors.secondary,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: appColors.secondary,
      },
    },
    "&:hover": {
      backgroundColor: "#fff",
    },
    "&focused": {
      backgroundColor: "#fff",
    },
  },
})(TextField);

function useResponsiveFontSize() {
  const getFontSize = () => (window.innerWidth < 450 ? "16px" : "18px");
  const [fontSize, setFontSize] = useState(getFontSize);

  useEffect(() => {
    const onResize = () => {
      setFontSize(getFontSize());
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  return fontSize;
}

const ConfirmationServiceContext = React.createContext(Promise.reject);

export const useConfirmation = () => useContext(ConfirmationServiceContext);

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: appColors.paragraphText,
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    [fontSize]
  );

  return options;
};

const StripeCheckout = (props) => {
  //Use the context of the Scheduler component
  const {
    fname,
    lName,
    email,
    phoneNum,
    treatment_uid,
    notes,
    apptDate,
    selectedTime,
    purchaseDate,
    price,
  } = useContext(SchedulerContext);

  const elements = useElements();
  const stripe = useStripe();
  const options = useOptions();
  const history = useHistory();

  const [cardholderName, setCardholderName] = useState(null);
  const [loadingState, changeLoadingState] = useState(false);

  var orderData = {
    currency: "usd",
  };

  console.log("orderData: " + JSON.stringify(orderData));

  const changeCardholderName = (name) => {
    console.log("Name changes: " + name);
    setCardholderName(name);
  };

  var pay = async function () {
    changeLoadingState(true);

    console.log("=== pay()");
    console.log("cardholderName from state: " + cardholderName);
    var data = {
      billing_details: {},
    };

    if (cardholderName !== null) {
      console.log("cardholderName is not null");
      data["billing_details"]["name"] = cardholderName;
    } else {
      console.log("cardholderName is null");
    }

    const cardElement = await elements.getElement(CardElement);

    console.log("stripe: ", stripe);
    console.log("cardElement: ", cardElement);
    console.log("data: ", data);

    //changeLoadingState(true);

    orderData.customer_uid = props.customerUid;
    orderData.business_code = props.deliveryInstructions;
    orderData.currency = "usd";
    orderData.item_uid = props.selectedPlan.item_uid;
    orderData.num_items = props.selectedPlan.num_items;
    orderData.num_deliveries = props.selectedPlan.num_deliveries;
    orderData.delivery_discount = props.selectedPlan.delivery_discount;
    orderData.payment_summary = props.paymentSummary;

    console.log(
      "orderData before createPaymentIntent: " + JSON.stringify(orderData)
    );

    var clientSecret;

    await axios
      .post(
        "https://huo8rhh76i.execute-api.us-west-1.amazonaws.com/dev/api/v2/createPaymentIntent",
        orderData
      )
      .then(function (result) {
        console.log("createPaymentIntent result: " + JSON.stringify(result));
        console.log("clientSecret from createPaymentIntent: " + result.data);
        clientSecret = result.data;

        console.log("calling createPaymentMethod...");

        const paymentMethod = stripe
          .createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: data.billingDetails,
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

                  const items = [
                    {
                      qty: props.selectedPlan.num_deliveries.toString(),
                      name: props.selectedPlan.item_name,
                      price: props.selectedPlan.item_price.toString(),
                      item_uid: props.selectedPlan.item_uid,
                      itm_business_uid: props.selectedPlan.itm_business_uid,
                    },
                  ];

                  console.log(
                    "customerUid before checkout: ",
                    props.customerUid
                  );

                  if (props.customerUid !== "GUEST") {
                    console.log("STRIPE CHECKOUT (1) -- not a guest");
                    console.log(
                      "STRIPE CHECKOUT (1) -- amount_due: " +
                        props.paymentSummary.total
                    );

                    checkoutItems(
                      {
                        customer_uid: props.customerUid,
                        business_uid: "WEB",
                        items,
                        salt: "",
                        order_instructions: "fast",
                        delivery_instructions: props.deliveryInstructions,
                        delivery_first_name: props.firstName,
                        delivery_last_name: props.lastName,
                        delivery_phone: props.phone,
                        delivery_email: props.email,
                        delivery_address: props.address.street,
                        delivery_unit: props.unit,
                        delivery_city: props.city,
                        delivery_state: props.state,
                        delivery_zip: props.zip,
                        delivery_latitude: props.latitude,
                        delivery_longitude: props.longitude,
                        purchase_notes: "purchase_notes",
                        amount_due: props.paymentSummary.total,
                        amount_discount: props.paymentSummary.discountAmount,
                        amount_paid: "0.00",
                        cc_num: "NULL",
                        cc_exp_year: "NULL",
                        cc_exp_month: "NULL",
                        cc_cvv: "NULL",
                        cc_zip: "NULL",
                        charge_id: result.paymentIntent.id,
                        payment_type: "STRIPE",
                        service_fee: props.paymentSummary.serviceFee,
                        delivery_fee: props.paymentSummary.deliveryFee,
                        tip: props.paymentSummary.tip,
                        tax: props.paymentSummary.taxAmount,
                        //subtotal: props.paymentSummary.subtotal,
                        subtotal: props.paymentSummary.mealSubPrice,
                        amb: props.paymentSummary.ambassadorDiscount,
                      },
                      () => {
                        history.push("/congrats");
                      }
                    );
                  } else {
                    console.log("STRIPE CHECKOUT (3) -- error; wrong data");
                    changeLoadingState(false);
                  }
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
  };

  return (
    <>
      <input
        variant="outlined"
        size="small"
        placeholder="cardholder name"
        fullWidth
        onChange={(e) => {
          changeCardholderName(e.target.value);
        }}
      />

      {/* <div className={props.classes.label}> */}
      <div>
        <CardElement
          elementRef={(c) => (this._element = c)}
          className={props.classes.element}
          options={options}
        />
      </div>

      <button
        className={props.classes.button}
        variant="outlined"
        size="small"
        color="paragraphText"
        onClick={() => {
          console.log("PAY BUTTON CLICKED");
          pay();
        }}
        disabled={
          props.fetchingFees || loadingState || props.recalculatingPrice
        }
      >
        Pay With Stripe
      </button>
    </>
  );
};

StripeCheckout.propTypes = {
  submitPayment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  subscribeInfo: state.subscribe,
  socialMedia: state.subscribe.profile.socialMedia,
  firstName: state.subscribe.addressInfo.firstName,
  lastName: state.subscribe.addressInfo.lastName,
  street: state.subscribe.address.street,
  unit: state.subscribe.address.unit,
  city: state.subscribe.address.city,
  state: state.subscribe.address.state,
  zip: state.subscribe.address.zip,
  phone: state.subscribe.addressInfo.phoneNumber,
  instructions: state.subscribe.deliveryInstructions,
  selectedPlan: state.subscribe.selectedPlan,
  address: state.subscribe.address,
  addressInfo: state.subscribe.addressInfo,
  creditCard: state.subscribe.creditCard,
});

const functionList = {
  submitPayment,
};

//export default StripeCheckout;
export default connect(mapStateToProps, functionList)(StripeCheckout);
