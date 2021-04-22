import React, { Component } from "react";
import "./ServiceCard.css";

class ContactInfo extends Component {
  state = {};
  render() {
    return (
      <div className="desc">
        <br></br>
        <div className="title">
          6055 Meridian Ave, Ste. 40, San Jose, CA 95120, US
        </div>
        <br></br>
        4084717004
        <br></br>
        leena@nityaayurveda.com
        <br></br>
        6055 Meridian Avenue, San Jose, CA, USA Suite 40A
      </div>
    );
  }
}

export default ContactInfo;
