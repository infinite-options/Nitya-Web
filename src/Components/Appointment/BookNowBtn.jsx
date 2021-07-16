import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

class BookNowBTN extends Component {
  constructor(props) {
    super(props);
    this.state = { tID: props.apptID };
  }

  render() {
    return (
      <div aria-label={"click button to book a session now"} style={{display:"flex", justifyContent:"center"}}>
        <Button
          style={{
            backgroundColor: "white",
            border: "none",
            borderRadius: "12px",
            //padding: "10px",
            width:"243px",
            height: "60px",
            paddingTop:"17px",
            align:"center",

          }}
        >
          <Link to={`/${this.state.tID}/appt`}>
            <p
              style={{
                color: "#B28D42",
                fontSize:"20px",
              }}
            >
              Book Now
            </p>
          </Link>
        </Button>
      </div>
    );
  }
}

export default BookNowBTN;
