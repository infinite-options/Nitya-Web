import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { field: this.props.field };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onHandleChange(event.target.value);
    console.log("event", event.target.id);
  }

  render() {
    const info = this.props.variable;
    return (
      <form onSubmit={this.handleSubmit}>
        <div aria-label={"Enter your " + this.props.field + "here"}>
          <input
            name="variable"
            placeholder={this.props.field}
            value={info}
            id={this.props.field === "Email Address" ? "email" : ""}
            pattern={
              this.props.field === "Email Address"
                ? "^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$"
                : ""
            }
            maxLength={
              this.props.field === "Phone Number - 10 digits only"
                ? "10"
                : "100"
            }
            type={this.props.field === "Email Address" ? "email" : ""}
            onChange={this.handleChange}
            style={{
              padding: "10px",
              boxSizing: "border-box",
              borderRadius: "20px",
              fontColor: "black",
              fontSize: "20px",
              border: "2px solid #B28D42",
              width: "100%",
              // fontFamily: "AvenirHeavy",
              outline: "none",
            }}
          />
        </div>
      </form>
    );
  }
}

export default Form;
