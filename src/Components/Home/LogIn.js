import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import { withRouter } from "react-router";
import axios from "axios";
import { Grid, Paper, Button, Typography, Box } from "@material-ui/core";
import { AuthContext } from "../../auth/AuthContext";
import CssTextField from "../../utils/CssTextField";
import SocialLogin from "./SocialLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const eye = <FontAwesomeIcon icon={faEye} />;

function AdminLogin(props) {
  const [emailValue, setEmail] = useState("");
  const [passwordValue, setPassword] = useState("");
  const [errorValue, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const Auth = useContext(AuthContext);

  useEffect(() => {
    if (
      process.env.REACT_APP_APPLE_CLIENT_ID &&
      process.env.REACT_APP_APPLE_REDIRECT_URI
    ) {
      /*  window.AppleID.auth.init({
        clientId: process.env.REACT_APP_APPLE_CLIENT_ID,
        scope: "email",
        redirectURI: process.env.REACT_APP_APPLE_REDIRECT_URI,
      }); */
    }
    // Note: search query parameters used for Apple Login
    let queryString = props.location.search;
    let urlParams = new URLSearchParams(queryString);
    // Clear Query parameters
    window.history.pushState({}, document.title, window.location.pathname);
    // console.log(props,urlParams)
    // Successful Log in with Apple, set cookies, context, redirect
    if (urlParams.has("id")) {
      let customerId = urlParams.get("id");
      Auth.setIsAuth(true);
      Cookies.set("login-session", "good");
      Cookies.set("customer_uid", customerId);
      axios
        .get(process.env.REACT_APP_SERVER_BASE_URI + "Profile/" + customerId)
        .then((response) => {
          console.log("Account:", response);
          let newAccountType = response.data.result[0].role.toLowerCase();
          switch (newAccountType) {
            case "admin":
              Auth.setAuthLevel(2);
              props.history.push("/admin");
              break;

            case "customer":
              Auth.setAuthLevel(0);
              props.history.push("/store");
              break;
            default:
              Auth.setAuthLevel(0);
              props.history.push("/store");
          }
        })
        .catch((err) => {
          console.log(err.response || err);
        });
      props.history.push("/admin");
    }
    // Log which media platform user should have signed in with instead of Apple
    // May eventually implement to display the message for which platform to Login
    else if (urlParams.has("media")) {
      console.log(urlParams.get("media"));
    }
  }, []);

  useEffect(() => {
    if (
      process.env.REACT_APP_APPLE_CLIENT_ID &&
      process.env.REACT_APP_APPLE_REDIRECT_URI
    ) {
      /* window.AppleID.auth.init({
        clientId: process.env.REACT_APP_APPLE_CLIENT_ID,
        scope: "email",
        redirectURI: process.env.REACT_APP_APPLE_REDIRECT_URI,
      }); */
    }
    let queryString = props.location.search;
    let urlParams = new URLSearchParams(queryString);
    // Clear Query parameters
    window.history.pushState({}, document.title, window.location.pathname);
    console.log(props, urlParams);
    // Successful Log in with Apple, set cookies, context, redirect
    if (urlParams.has("id")) {
      let customerId = urlParams.get("id");
      Auth.setIsAuth(true);
      Cookies.set("login-session", "good");
      Cookies.set("customer_uid", customerId);
      props.history.push("/admin");
    }
    // Log which media platform user should have signed in with instead of Apple
    // May eventually implement to display the message for which platform to Login
    else if (urlParams.has("media")) {
      console.log(urlParams.get("media"));
    }
  }, []);

  const handleEmailChange = (e) => {
    // console.log('email is changing')
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    // console.log('password is changing')
    setPassword(e.target.value);
  };

  const verifyLoginInfo = (e) => {
    console.log("Verifying");
    // Attempt to login
    // Get salt for account
    e.preventDefault();
    axios
      .post(
        "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/AccountSalt",
        {
          // params: {
          email: emailValue,
          // }
        }
      )
      .then((res) => {
        console.log("response recieved: ");
        console.log(res);
        // console.log(emailValue, passwordValue);
        let saltObject = res;
        if (saltObject.data.code === 200) {
          let hashAlg = saltObject.data.result[0].password_algorithm;
          let salt = saltObject.data.result[0].password_salt;
          // let salt = "cec35d4fc0c5e83527f462aeff579b0c6f098e45b01c8b82e311f87dc6361d752c30293e27027653adbb251dff5d03242c8bec68a3af1abd4e91c5adb799a01b";
          if (hashAlg != null && salt != null) {
            // Make sure the data exists
            if (hashAlg !== "" && salt !== "") {
              // Rename hash algorithm so client can understand
              switch (hashAlg) {
                case "SHA512":
                  hashAlg = "SHA-512";
                  break;
                default:
                  break;
              }
              // console.log(hashAlg);
              // Salt plain text password
              let saltedPassword = passwordValue + salt;
              // console.log(saltedPassword);
              // Encode salted password to prepare for hashing
              const encoder = new TextEncoder();
              const data = encoder.encode(saltedPassword);
              //Hash salted password
              crypto.subtle.digest(hashAlg, data).then((res) => {
                let hash = res;
                // Decode hash with hex digest
                let hashArray = Array.from(new Uint8Array(hash));
                let hashedPassword = hashArray
                  .map((byte) => {
                    return byte.toString(16).padStart(2, "0");
                  })
                  .join("");
                console.log(hashedPassword);
                let loginObject = {
                  email: emailValue,
                  password: hashedPassword,
                  social_id: "",
                  signup_platform: "",
                };
                console.log(JSON.stringify(loginObject));
                axios
                  //post api login
                  .post(
                    "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/Login",
                    loginObject,
                    {
                      headers: {
                        "Content-Type": "text/plain",
                      },
                    }
                  )
                  //TODO: Tell Prashant social login has to be done from back end
                  .then((res) => {
                    //TODO: tell to please use Google/ Facebook login
                    console.log(res);
                    if (res.data.code === 200) {
                      setError("");
                      console.log("Login success");
                      let customerInfo = res.data.result[0];

                      Auth.setIsAuth(true);
                      Cookies.set("login-session", "good");
                      Cookies.set("customer_uid", customerInfo.customer_uid);
                      Cookies.set("role", customerInfo.role);

                      let newAccountType = customerInfo.role.toLowerCase();
                      switch (newAccountType) {
                        case "admin":
                          Auth.setAuthLevel(2);
                          props.history.push("/blog");
                          break;

                        case "customer":
                          Auth.setAuthLevel(0);
                          props.history.push("/home");
                          break;

                        default:
                          Auth.setAuthLevel(1);
                          props.history.push("/home");
                          break;
                      }
                    } else if (res.data.code === 406 || res.data.code === 404) {
                      console.log("Invalid credentials");
                      setError("credential");
                      setErrorMessage("Invalid credentials");
                    } else if (res.data.code === 401) {
                      console.log("Need to log in by social media");
                      setError("social");
                      setErrorMessage(res.data.message);
                    } else if (res.data.code === 407) {
                      console.log("Need email verification");
                      setError("email_verify");
                      axios
                        .post(
                          process.env.REACT_APP_SERVER_BASE_URI +
                            "email_verification",
                          { email: emailValue },
                          {
                            headers: {
                              "Content-Type": "text/plain",
                            },
                          }
                        )
                        .then((res) => {
                          console.log(res);
                          setErrorMessage(
                            "Email not verified. Check your email to get link for verification."
                          );
                        })
                        .catch((err) => {
                          setErrorMessage("Email not verified.");
                          if (err.response) {
                            console.log(err.response);
                          }
                          console.log(err);
                        });
                    } else {
                      console.log("Unknown login error");
                      setError("unknown");
                      setErrorMessage(res.data.message);
                    }
                  })
                  .catch((err) => {
                    // Log error for Login endpoint
                    if (err.response) {
                      console.log(err.response);
                    }
                    console.log(err);
                  });
              });
            }
          } else {
            // No hash/salt information, probably need to sign in by socail media
            console.log("Salt not found");
            // Try to login anyway to confirm
            let loginObject = {
              email: emailValue,
              password: "test",
              token: "",
              signup_platform: "",
            };
            // console.log(JSON.stringify(loginObject))
            axios
              .post(
                "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/Login",
                loginObject,
                {
                  headers: {
                    "Content-Type": "text/plain",
                  },
                }
              )
              .then((res) => {
                console.log(res);
                if (res.data.code === 404) {
                  console.log("Invalid credentials");
                  setError("credential");
                  setErrorMessage("Invalid credentials");
                } else {
                  console.log("Unknown login error");
                  setError("unknown");
                  setErrorMessage("Login failed, try again");
                }
              })
              .catch((err) => {
                // Log error for Login endpoint
                if (err.response) {
                  console.log(err.response);
                }
                console.log(err);
              });
          }
        } else if (res.data.code === 401) {
          console.log("Use Social Login");
          setError("social");
          let socialMediaUsed = res.data.result[0].user_social_media;
          let socialMediaUsedFormat =
            socialMediaUsed.charAt(0) + socialMediaUsed.slice(1).toLowerCase();
          let newErrorMessage = "Use " + socialMediaUsedFormat + " to login";
          setErrorMessage(newErrorMessage);
        } else if (res.data.code === 404) {
          // No information, probably because invalid email
          console.log("Invalid credentials");
          setError("credential");
          setErrorMessage("Invalid credentials");
        } else {
          console.log("Unknown log in error");
          setError("Log in failed, try again");
        }
      })
      .catch((err) => {
        // Log error for account salt endpoint
        if (err.response) {
          console.log(err.response);
        }
        console.log(err);
      });
  };

  const showError = () => {
    if (errorValue === "") {
      return null;
    }
    return <Typography style={{ color: "red" }}>{errorMessage}</Typography>;
  };

  const pageColor = "#b28d42";
  const useStyles = makeStyles({
    pageText: {
      fontSize: "24px",
      color: pageColor,
    },
    root: {
      backgroundColor: "#DADADA",
      padding: "50px",
    },
    container: {
      marginLeft: "auto",
      marginRight: "auto",
      textAlign: "center",
      backgroundColor: "white",
      width: "883px",
      padding: "20px",
    },
    formContainer: {
      display: "flex",
      flexDirection: "column",
      width: "457px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    formTextInput: {
      width: "457px",
      padding: "10px 20px",
      margin: "7px",
      borderRadius: "25px",
      border: "2px solid " + pageColor,
      outline: "none",
      "&::placeholder": {
        color: pageColor,
      },
    },
    button: {
      height: "60px",
      width: "243px",
      marginLeft: "auto",
      marginRight: "auto",
      color: "white",
      backgroundColor: pageColor,
      borderRadius: "25px",
      border: "none",
      "&:focus": {
        outline: "none",
      },
    },
    inputWrapper: {
      position: "relative",
    },
    eye: {
      color: pageColor,
      position: "absolute",
      top: "20px",
      right: "28px",
      cursor: "pointer",
    },
  });

  const classes = useStyles();
  const [password1Shown, setPassword1Shown] = useState(false);
  const togglePasswordVisiblity = (passwordShown) => {
    setPassword1Shown(!passwordShown);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.pageText} style={{ paddingBottom: "20px" }}>
          Login
        </div>
        <SocialLogin />
        <div className={classes.pageText} style={{ padding: "10px" }}>
          Or
        </div>
        <form className={classes.formContainer}>
          <div className={classes.inputWrapper}>
            <input
              className={classes.formTextInput}
              type="text"
              placeholder="Email Address"
              value={emailValue}
              onChange={handleEmailChange}
            />
          </div>

          <div className={classes.inputWrapper}>
            <input
              className={classes.formTextInput}
              type={password1Shown ? "text" : "password"}
              placeholder="Password"
              value={passwordValue}
              onChange={handlePasswordChange}
            />
            <i
              className={classes.eye}
              onClick={() => togglePasswordVisiblity(password1Shown)}
            >
              {eye}
            </i>
          </div>

          <div style={{ padding: "15px" }}>
            <input
              type="submit"
              value="Login"
              className={classes.button}
              onClick={verifyLoginInfo}
            />
          </div>
        </form>
        <div>{showError()}</div>
        <div className={classes.pageText} style={{ marginTop: "40px" }}>
          Don't have an account?
        </div>
        <button
          className={classes.button}
          style={{ marginBottom: "30px" }}
          onClick={() => {
            window.location.href = "/signup";
          }}
        >
          Sign Up
        </button>
      </div>
      {/* <Paper style={paperStyle}>
        <Grid container spacing={1} xs={12}>
          <Grid item xs={12}>
            <Box my={1} style={{ fontSize: "20px", color: "#8d6f1a" }}>
              Log In
            </Box>
          </Grid>
          <Grid item xs={12}>
            <CssTextField
              error={errorValue}
              id="outlined-required"
              label="email"
              variant="outlined"
              size="small"
              value={emailValue}
              onChange={handleEmailChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <CssTextField
              error={errorValue}
              id="outlined-password-input"
              label="Password"
              type="password"
              variant="outlined"
              size="small"
              value={passwordValue}
              onChange={handlePasswordChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            {showError()}
          </Grid>
          <Grid item xs={12}>
            <Box mb={2}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#e9d9ac",
                  color: "#8d6f1a",
                  width: "300px",
                  height: "40px",
                  border: "1px solid #8d6f1a",
                }}
                onClick={verifyLoginInfo}
              >
                Login
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mb={2}>
              <Box>or</Box>
            </Box>
          </Grid>
          <SocialLogin setError={setError} setErrorMessage={setErrorMessage} />
        </Grid>
      </Paper> */}
    </div>
  );
}

const paperStyle = {
  width: "500px",
  textAlign: "center",
  display: "inline-block",
  padding: "20px",
  marginTop: "50px",
  backgroundColor: "#e9d9ac",
};

export default withRouter(AdminLogin);
