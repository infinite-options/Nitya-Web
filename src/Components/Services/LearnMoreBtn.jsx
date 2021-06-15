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
      <div aria-label={"click button to learn more."}>
        <Link to={`/${this.state.tID}/service`}>Learn More</Link>
      </div>
    );
  }
}

export default BookNowBTN;
