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
        <Button>
          <Link to={`/${this.state.tID}/appt`}>Book Now</Link>
        </Button>
      </div>
    );
  }
}

export default BookNowBTN;
