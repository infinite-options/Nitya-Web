import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Container, Col, Form, Modal, Row } from "react-bootstrap";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { AuthContext } from "../auth/AuthContext";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
let CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const useStyles = makeStyles({
  loginbuttons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signupbuttons: {
    background: "#000000 0% 0% no-repeat padding-box",
    borderRadius: "10px",
    font: "normal normal bold 16px Quicksand-Bold",
    color: "#ffffff",
    margin: "1rem",
    textTransform: "none",
  },
  loginbutton: {
    background: "#b28d42 0% 0% no-repeat padding-box",
    borderRadius: "10px",
    font: "normal normal bold 16px Quicksand-Bold",
    color: "#ffffff",
    margin: "1rem",
    textTransform: "none",
  },
  buttonLayout: { width: "100%", padding: "0", margin: "0" },

  textfield: {
    background: "##757575",
    borderRadius: "25px",
    marginBottom: "0.2rem",
    color: "#b28d42",
    padding: "10px 20px",
    width: "300px",
  },
});
function GoogleSignIn(props) {
  const Auth = useContext(AuthContext);
  const { errorValue, setError } = props;
  const history = useHistory();
  const classes = useStyles();
  const [emailValue, setEmail] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [doNotExistShow, setDoNotExistShow] = useState(false);
  let tokenClient = {};
  console.log("tc", tokenClient);

  function handleCallBackResponse(response) {
    console.log("Encoded JWT ID token:" + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log("User object", userObject);
    setEmail(userObject.email);

    let email = userObject.email;
    axios
      .get(BASE_URL + "UserSocialLogin/" + email)
      .then((res) => {
        console.log("loginSocialTA in events", res);
        if (res.data.result !== false) {
          // setUserID(res.data.result[0]);
          history.push("/blog");

          Auth.setIsAuth(true);
          Auth.setIsLoggedIn(true);
          console.log("Login success");
          let customerInfo = res.data.result.result[0];
          console.log("Login success, customerInfo");
          Auth.setIsAuth(true);
          Cookies.set("login-session", "good");
          Cookies.set("customer_uid", customerInfo.customer_uid);
          Cookies.set("role", customerInfo.role);
          let newAccountType = customerInfo.role.toLowerCase();
          console.log(newAccountType);
          switch (newAccountType) {
            case "admin":
              Auth.setAuthLevel(2);
              history.push("/blog");
              break;

            case "customer":
              Auth.setAuthLevel(0);
              history.push("/home");
              break;

            default:
              Auth.setAuthLevel(1);
              history.push("/home");
              break;
          }
          console.log("Login successful");
          console.log(email);

          // Successful log in, Try to update tokens, then continue to next page based on role
        } else {
          axios
            .get(BASE_URL + "GetUserEmailId/" + email)
            .then((response) => {
              console.log("GetUserEmailId", response);
              if (response.data.message === "User ID doesnt exist") {
                console.log("log in error");
                // history.push('/signup');
                setDoNotExistShow(true);
              }
            })
            .catch((error) => {
              console.log("its in landing page");
              console.log(error);
            });
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        }
        console.log(err);
      });
    socialGoogle(email);
  }
  const socialGoogle = (email) => {
    console.log("in socialgoogle");
    axios
      .get(BASE_URL + "UserSocialLogin/" + email)
      .then((res) => {
        console.log("loginSocialTA in events", res);
        if (res.data.result !== false) {
          // setUserID(res.data.result[0]);
          history.push("/blog");

          Auth.setIsAuth(true);
          Auth.isLoggedIn(true);
          setError("");
          console.log("Login success");
          let customerInfo = res.data.result.result[0];
          console.log("Login success, customerInfo");
          Auth.setIsAuth(true);
          Cookies.set("login-session", "good");
          Cookies.set("customer_uid", customerInfo.customer_uid);
          Cookies.set("role", customerInfo.role);
          setAccessToken(res.data.result.result[0].user_access_token);
          let newAccountType = customerInfo.role.toLowerCase();
          console.log(newAccountType);
          switch (newAccountType) {
            case "admin":
              Auth.setAuthLevel(2);
              history.push("/blog");
              break;

            case "customer":
              Auth.setAuthLevel(0);
              history.push("/home");
              break;

            default:
              Auth.setAuthLevel(1);
              history.push("/home");
              break;
          }
          console.log("Login successful");
          console.log(email);

          // Successful log in, Try to update tokens, then continue to next page based on role
        } else {
          console.log("do not exist");
          axios
            .get(BASE_URL + "GetUserEmailId/" + email)
            .then((response) => {
              console.log("GetUserEmailId", response);
              if (response.data.message === "User ID doesnt exist") {
                console.log("log in error");
                // history.push('/signup');
                console.log("do not exist");
                setDoNotExistShow(true);
              }
            })
            .catch((error) => {
              console.log("its in landing page");
              console.log(error);
            });
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        }
        console.log(err);
      });
  };

  const userDoNotExist = () => {
    console.log("do not exist");
    const modalStyle = {
      position: "absolute",
      top: "30%",
      left: "10%",
      width: "455px",
    };
    const headerStyle = {
      border: "none",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      font: "normal normal 600 20px Quicksand-Book",
      textTransform: "uppercase",
      backgroundColor: " #757575",
      padding: "1rem",
      color: "#b28d42",
    };
    const footerStyle = {
      border: "none",
      backgroundColor: " #757575",
    };
    const bodyStyle = {
      backgroundColor: " #757575",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      font: "normal normal 600 16px Quicksand-Regular",
    };
    return (
      <Modal show={doNotExistShow} onHide={hideDoNotExist} style={modalStyle}>
        <Form>
          <Modal.Header style={headerStyle} closeButton>
            <Modal.Title>User Account Does Not Exist</Modal.Title>
          </Modal.Header>

          <Modal.Body style={bodyStyle}>
            <div>
              The User with email: {emailValue} does not exist! Please Sign Up!
            </div>
          </Modal.Body>

          <Modal.Footer style={footerStyle}>
            <Row
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Col
                xs={6}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="submit"
                  onClick={hideDoNotExist}
                  className={classes.loginbutton}
                >
                  Cancel
                </Button>
              </Col>
              <Col
                xs={6}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="submit"
                  onClick={() => history.push("/signup")}
                  className={classes.loginbutton}
                >
                  Sign Up
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  };
  const hideDoNotExist = () => {
    setDoNotExistShow(false);
  };

  useEffect(() => {
    /* global google */

    if (window.google) {
      console.log("in here singnin");
      //  initializes the Sign In With Google client based on the configuration object
      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCallBackResponse,
      });
      //    method renders a Sign In With Google button in your web pages.
      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
        text: "signin_with",
        shape: "pill",
      });
      // access tokens
    }
  }, []);

  return (
    <div>
      <div id="signInDiv"></div>
      {userDoNotExist()}
    </div>
  );
}

export default GoogleSignIn;
