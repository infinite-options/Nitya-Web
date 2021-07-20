import axios from "axios";
// import fetchAddressCoordinates from "./FetchAddressCoordinates";
// import hashPassword from "./HashPassword";

//TODO: Use the point field
export default async function checkoutItems(data, _callback) {
  // POST to checkout endpoint
  console.log("checkout data: ", data);

  axios
    .post(process.env.REACT_APP_SERVER_BASE_URI + "checkout", data)
    .then(() => {
      console.log("Checkout complete");
      _callback();
    })
    .catch((err) => {
      console.log("error happened while posting to checkoutapi", err);
      if (err.response) {
        console.log("err.response: " + JSON.stringify(err.response));
      }
    });
}
