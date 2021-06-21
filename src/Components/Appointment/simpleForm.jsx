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
import { makeStyles } from "@material-ui/core/styles";

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
              borderRadius: "5px",
              borderColor: "b28d42",
              borderWidth: "10px",
            }}
          />
        </div>
      </form>
    );
  }
}

export default Form;
