import React, { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
// import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { animateScroll as scroll } from "react-scroll";
import logo from "../nitya_logo.png";
import InstagramIcon from "@material-ui/icons/Instagram";
// import LoginNavBar from "./LoginNavBar";
// import SignUp from "../Components/Home/SignUp";
// import LogIn from "../Components/Home/LogIn";
import "./Navbar.css";

const useStyles = makeStyles((theme) => ({
  authModal: {
    position: "absolute",
    width: "500px",
  },
}));

function useOutsideAlerter(ref) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !ref.current.hidden
      ) {
        ref.current.hidden = true;
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const Navbar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isLoginShown, setIsLoginShown] = useState(false); // checks if user is logged in
  const [isSignUpShown, setIsSignUpShown] = useState(false);

  const loginWrapperRef = useRef(null);
  useOutsideAlerter(loginWrapperRef, setIsLoginShown);

  const signupWrapperRef = useRef(null);
  useOutsideAlerter(signupWrapperRef, setIsSignUpShown);

  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <img
          src={logo}
          style={{
            width: 250,
            height: 150,
            objectFit: "cover",
          }}
          alt="Nitya Ayurveda’s Logo"
          onClick={scrollToTop}
        />
      </Link>
      <div onClick={handleClick} className="nav-icon">
        {open ? <FiX /> : <FiMenu />}
      </div>
      <ul className={open ? "nav-links active" : "nav-links"}>
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={closeMenu}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link" onClick={closeMenu}>
            About
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link to="/services" className="nav-link" onClick={closeMenu}>
            Services
          </Link>
        </li> */}
        <li className="nav-item">
          <Link to="/services" className="nav-link" onClick={closeMenu}>
            Services
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/blog" className="nav-link" onClick={closeMenu}>
            Blog
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link" onClick={closeMenu}>
            Contact
          </Link>
        </li>
      </ul>

      <ul className="right">
        <InstagramIcon
          fontSize="large"
          className="instagram-icon"
          onClick={(event) =>
            (window.location.href = "https://www.instagram.com/nityaayurveda/")
          }
        />
      </ul>

      {/* <ul className={"nav-log"}>
        <li className="nav-item" className="nav-link" className="log-in">
          <LoginNavBar
            isLoginShown={isLoginShown}
            setIsLoginShown={setIsLoginShown}
            isSignUpShown={isSignUpShown}
            setIsSignUpShown={setIsSignUpShown}
          /> */}
      {/* START: Login/SignUp Modal */}
      {/* <Box display="flex" justifyContent="flex-end"> */}
      {/* Login Modal */}
      {/* <Box
              position="absolute"
              width="50%"
              display="flex"
              justifyContent="center"
              zIndex={40}
            >
              <Box
                ref={loginWrapperRef}
                className={classes.authModal}
                hidden={!isLoginShown}
              >
                <LogIn />
              </Box>
            </Box> */}

      {/* Sign Up Modal */}
      {/* <Box display="flex" justifyContent="flex-end">
              <Box
                position="absolute"
                width="50%"
                display="flex"
                justifyContent="center"
                zIndex={40}
              >
                <Box
                  ref={signupWrapperRef}
                  className={classes.authModal}
                  hidden={!isSignUpShown}
                >
                  <SignUp />
                </Box>
              </Box>
            </Box>
          </Box>
        </li>
      </ul> */}
    </nav>
  );
};

export default Navbar;
