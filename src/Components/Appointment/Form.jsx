/**
 * This form component is based on the code provided by the following Geeks for Geeks article:
 * https://www.geeksforgeeks.org/reactjs-forms/
 **/

//Yo, why can't I get rid of this?

import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", fName: "", lName: "", notes: "", phoneNo: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Form submitting logic, prevent default page refresh
  handleSubmit(event) {
    const { email, fName, lName, notes, phoneNo } = this.state;
    event.preventDefault();
    alert(`
      ____Your Details____\n
      Email : ${email}
      First Name : ${fName}
      Last Name : ${lName}
      Notes : ${notes}
      Phone No : ${phoneNo}
    `);
  }

  // Method causes to store all the values of the
  // input field in react state single method handle
  // input changes of all the input field using ES6
  // javascript feature computed property names
  handleChange(event) {
    this.setState({
      // Computed property names
      // keys of the objects are computed dynamically
      [event.target.name]: event.target.value,
    });
  }

  // Return a controlled form i.e. values of the
  // input field not stored in DOM values are exist
  // in react component itself as state
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor=" ">Name</label>
          <input
            name="fName"
            placeholder="First Name goes here"
            value={this.state.fName}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="age"> Last Name</label>
          <input
            name="lName"
            placeholder="Last Name goes here"
            value={this.state.lName}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="phoneNo">Phone Number</label>
          <input
            name="phoneNo"
            placeholder="Phone No"
            value={this.state.phoneNo}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="address">Notes</label>
          <input
            name="notes"
            placeholder="Notes for practicioner"
            value={this.state.notes}
            onChange={this.handleChange}
          />
        </div>
        <br></br>

        <div>
          <button> Submit Information</button>
        </div>
      </form>
    );
  }
}

export default Form;
