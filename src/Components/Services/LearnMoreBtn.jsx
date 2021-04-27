import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

class BookNowBTN extends Component {
  constructor(props) {
    super(props);
    // this.state = { apptID: "330-000006" };
    this.state = { tID: props.apptID };
  }

  render() {
    return (
      <Button>
        <Link to={`/${this.state.tID}/service`}>
          what's good, click here to learn more about this appt
        </Link>
      </Button>
    );
  }
}

export default BookNowBTN;
