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
      <div aria-label={"click button to book a session now"}>
        <Button
          style={{
            backgroundColor: "white" /* Green */,
            border: "none",
            // color: "white",
            // padding: "20px",
            // textAlign: "center",
            // textDecoration: "none",
            // display: "inline-block",
            // fontSize: "16px",
            // margin: "4px 2px",
            // cursor: "pointer",
            borderRadius: "12px",
          }}
        >
          <Link to={`/${this.state.tID}/appt`}>
            <p>Book a Session</p>
          </Link>
        </Button>
      </div>
    );
  }
}

export default BookNowBTN;
