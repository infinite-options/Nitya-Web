import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

class BookNowBTN2 extends Component {
  constructor(props) {
    super(props);
    this.state = { tID: props.apptID };
  }

  render() {
    return (
      <div aria-label={"click button to book a session now"} >
        <Button
          style={{
            backgroundColor: "#B28D42",
            border: "none",
            borderRadius: "20px",
          }}
        >
          <Link to={`/${this.state.tID}/appt`}>
            <p
              style={{
                color: "white",
                font: "normal normal normal 20px Hoefler Text",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingBottom: "10px",
                paddingTop: "10px",
              }}
            >
              Book a Session
            </p>
          </Link>
        </Button>
      </div>
    );
  }
}

export default BookNowBTN2;