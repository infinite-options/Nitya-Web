/**
 * This form component is based on the code provided by the following Geeks for Geeks article:
 * https://www.geeksforgeeks.org/reactjs-forms/
 *
 * Separate tutorial on how to lift state up to ancestor component:
 * https://www.youtube.com/watch?v=dQw4w9WgXcQ
 *
 * https://reactjs.org/docs/lifting-state-up.html
 *
 * I have modified it down so that the form only has one label + input pair.
 **/

import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { field: this.props.field };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onHandleChange(event.target.value);
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
