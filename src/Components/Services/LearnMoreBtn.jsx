import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

import "../Home/Consulting1.js";

class BookNowBTN extends Component {
  constructor(props) {
    super(props);
    // this.state = { apptID: "330-000006" };
    this.state = { tID: props.apptID };
  }



  render() {
    return (
      <div>
        <br />
      <div style={{
              textAlign: "center",
              //fontSize:"1.3rem",
              //width:"300px",            
              color: "white",
              textDecoration: "underline",
              font: "normal normal normal 22px/26px Hoefler Text"
              //paddingTop: "20px",
              //paddingBottom: "20px",
              //marginLeft: "600px",
              //fontWeight: "bolder",
              //backgroundColor: "#b28d42",
              //borderColor: "#b28d42",
              //borderRadius: "100px",
              //marginLeft:  "240px",
              // textDecoration: "none",
            }} 
            aria-label={"click button to learn more."}
      >
        
        <Link to={`/${this.state.tID}/services`} style={{color:"white"}}>Learn More</Link>
      </div>
      </div>
    );
  }
}

export default BookNowBTN;
