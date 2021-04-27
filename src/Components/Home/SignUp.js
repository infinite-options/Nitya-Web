import React from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
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
  const responseFacebook = (response) => {
    console.log(response);
  };
  const responseGoogle = (response) => {
    console.log(response);
  };
  return (
    <div className={classes.signup} id="signup">
      <ScrollToTop />
      <div className={classes.container}>
        <div>
          <p className={classes.heading}>Sign Up</p>
          <p className={classes.content}>
            Already a member?
            <a href="">Log In</a>
          </p>
        </div>
        <hr></hr>
        <Button className={classes.btn}>Sign up with email</Button>
        <br></br>
        {/* <FacebookLogin
          appId="1088597931155576"
          autoLoad={true}
          fields="name,email,picture"
          callback={responseFacebook}
          icon="fa-facebook"
          className={classes.fbBtn}
        />
        <br />
        <br />
        <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Sign Up with Google
            </button>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          className={classes.gBtn}
          cookiePolicy={"single_host_origin"}
        /> */}
        <br></br>
      </div>
    </div>
  );
}
