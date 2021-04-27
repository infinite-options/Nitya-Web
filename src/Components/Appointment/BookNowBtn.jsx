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
      <Button>
        <Link to={`/${this.state.tID}/appt`}>
          what's good, click here to book now
        </Link>
      </Button>
    );
  }
}

export default BookNowBTN;
