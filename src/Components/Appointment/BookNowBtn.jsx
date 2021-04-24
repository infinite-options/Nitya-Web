import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

class BookNowBTN extends Component {
  constructor(props) {
    super(props);
    this.state = { apptID: "330-000006" };
  }

  render() {
    return (
      <Button>
        {" "}
        <Link to={`/${this.state.apptID}/appt`}>sup</Link>
      </Button>
    );
  }
}

export default BookNowBTN;
