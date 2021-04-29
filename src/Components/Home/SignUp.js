import React from "react";

import ScrollToTop from "../../Blog/ScrollToTop";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

export default function SignUp(props) {
  const useStyles = makeStyles({
    signup: {
      display: "flex",
      justifyContent: "center",
      color: "#594d2c",
    },
    heading: {
      fontFamily: "DidoteTextW01-Italic",
      fontSize: "4rem",
    },
    content: {
      fontFamily: "'Open Sans', sans-serif",
      fontSize: "1.5rem",
    },
    fbBtn: {
      backgroundColor: "#3b5998",
      width: "180px",
    },
    gBtn: {
      backgroundColor: "#4285f4",
    },
    btn: {
      border: "solid #594d2c 1px",
      borderRadius: 0,
      color: "#594d2c",
      width: "300px",
    },
  });
  const classes = useStyles();

  return (
    <div className={classes.signup} id="signup">
      <ScrollToTop />

      <div className={classes.container}>
        <div>
          <br></br>
          <p className={classes.heading}>Sign Up</p>
          <br></br>
          <p className={classes.content}>
            Already a member?
            <a href="">Log In</a>
          </p>
        </div>
        <br></br>
        <hr></hr>
        <Button className={classes.btn}>Sign up with email</Button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}
