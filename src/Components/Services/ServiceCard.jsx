import React, { useState, useEffect, Component } from "react";
import ContactInfo from "./ContactInfo";
import { Button } from "reactstrap";
import axios from "axios";
import "./ServiceCard.css";

// There are two files with very similar names: Services.js and Services.jsx
// The js file is responsible for rendering the services as they appear on the landing/home pageXOffset
// The jsx file is responsible for rendering the services as they appear on the "learn more" feature
export default function Service(treatment_uid) {
  const temp = {
    name: "",
    description: "",
    duration: "",
    price: "",
    imageSource: "",
    treatment_notes: "",
  };

  // const localTreatment_uid = { treatment_uid };

  const url =
    "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/treatments";
  const [servicesLoaded, setServicesLoaded] = useState(false);
  const [elementToBeRendered, setElementToBeRendered] = useState(temp);
  const localTreatment_uid = "330-000004";

  const [serviceArr, setServiceArr] = useState([]);

  useEffect(() => {
    //First, we must do the endpoint call to load the serviceArr
    if (!servicesLoaded) {
      axios.get(url).then((res) => {
        console.log("result", JSON.stringify(res.data.result));
        setServiceArr(res.data.result);
        //console.log("service Array set to", serviceArr);
        setServicesLoaded(true);
      });
    }
    //Second, (now that the serviceArr is populated), find the particular treatment object that we are looking for

    serviceArr.forEach((element) => {
      if (element.treatment_uid === localTreatment_uid) {
        console.log(element);
        setElementToBeRendered(element);
      }
    });
  });

  //   // 1. Services should be rendered correctly when given a item_uid
  //   // 2. Appointment booking should be able to save a date/time according to the user's preference
  //   //     UserID, date+time, treatment
  // }
  //Information of the component should be modified within its respective class, but the call must happen from the outside.

  // render() {
  return (
    <div className="background">
      {/* {this.loadServices} */}
      <div
        className="background"
        // Not very clean to put this in-line style when I already have .background in Services.css
        style={{
          margin: "auto",
          textAlign: "center",
          border: "3px",
          padding: "10px",
        }}
      >
        <div className="title">{elementToBeRendered.title}</div>
        <div className="desc">{elementToBeRendered.description}</div>
        <div
          className="desc"
          style={{
            fontSize: 21,
          }}
        >
          {elementToBeRendered.duration} | {elementToBeRendered.cost}
        </div>
        <Button>Book Now</Button>
        {/* make some room between the button and the image */}
        <br></br>
        <br></br>
        <img
          style={{
            width: "700px",
            height: "500px",
            padding: "20px",
          }} //Need to ensure that the aspect ratio of the original image does not change
          src={elementToBeRendered.image_url}
        ></img>
        <div className="desc">{elementToBeRendered.treatment_notes}</div>
        Gotta fix the formatting
        <ContactInfo />
      </div>
    </div>
  );
}
