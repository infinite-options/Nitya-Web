import React, { useContext, useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Box, Button } from "@material-ui/core";
import { AuthContext } from "../auth/AuthContext";
import "./Navbar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "white",
    // backgroundColor: "red"
  },
  authButton: {
    color: "#ffffff",
    marginRight: "10px",
    backgroundColor: "#8d6f1a",
    border: "1px solid #8d6f1a",
    fontSize: "1.2rem",
    textTransform: "none",

    "&:hover": {
      backgroundColor: "#e9d9ac",
      color: "#88898a",
      border: "#88898a",
    },
  },
}));

export default function LoginNavBar({ ...props }) {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [isDisabled, setIsDisabled] = useState(!(auth.isAuth || auth.isGuest));

  const loginClicked = () => {
    props.setIsLoginShown(!props.isLoginShown);
    auth.login();
    props.setIsSignUpShown(false);
  };

  const signUpClicked = () => {
    props.setIsLoginShown(false);
    props.setIsSignUpShown(!props.isSignUpShown);
  };

  const handleClickLogOut = () => {
    auth.logout();
    Cookies.remove("login-session");
    Cookies.remove("customer_uid");
    Cookies.remove("role");
    auth.setIsAuth(false);
    auth.setAuthLevel(0);
    history.push("/");
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar color="white" position="static" elevation={0}>
          <Toolbar>
            <Box flexGrow={1} />
            {/* <Box>
              <Button
                className={classes.authButton}
                variant="contained"
                size="medium"
                onClick={signUpClicked}
              >
                Sign Up
              </Button>

              {!auth.isLoggedIn && (
                <Button
                  className={classes.authButton}
                  variant="contained"
                  size="medium"
                  onClick={loginClicked}
                >
                  Login
                </Button>
              )}
            </Box> */}
            {/* <Box>
              {auth.isLoggedIn && (
                <Button
                  className={classes.authButton}
                  disabled={isDisabled}
                  variant="contained"
                  size="medium"
                  onClick={handleClickLogOut}
                >
                  Logout
                </Button>
              )}
            </Box> */}
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
