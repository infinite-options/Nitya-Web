/**
 * This form component was lifted directly from Geeks for Geeks
 **/

import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    // this.state = { variable: "", field: this.props.field };
    this.state = { field: this.props.field };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Form submitting logic, prevent default page refresh
  handleSubmit(event) {
    const { variable } = this.state;
    event.preventDefault();
    alert(`
       ____Your Details____\n
       ${this.props.field} : ${variable}
     `);
  }

  // Method causes to store all the values of the
  // input field in react state single method handle
  // input changes of all the input field using ES6
  // javascript feature computed property names
  //   handleChange(event) {
  //     this.setState({
  //       // Computed property names
  //       // keys of the objects are computed dynamically
  //       [event.target.name]: event.target.value,
  //     });
  //   }
  handleChange(event) {
    this.props.onHandleChange(event.target.value);
  }

  // Return a controlled form i.e. values of the
  // input field not stored in DOM values are exist
  // in react component itself as state
  render() {
    // const info = this.state.variable;
    const info = this.props.variable;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          {/* <label htmlFor="email">{this.props.field}</label> */}
          <input
            name="variable"
            placeholder={this.props.field}
            // value={this.state.variable}
            value={info}
            onChange={this.handleChange}
          />
        </div>

        {/* <div>
          <button>Submit Information</button>
        </div> */}
      </form>
    );
  }
}

export default Form;
