import React, { useState } from "react";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import Logo from "../../nitya_logo.png";
import InstagramIcon from "@material-ui/icons/Instagram";
import PersonOutline from "@material-ui/icons/PersonOutline";
import { animateScroll as scroll } from "react-scroll";

import "./Navbar.css";
function Navbar() {
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <nav className="NavbarItems">
        <h1 className="navbar-logo">
          <img
            src={Logo}
            onClick={toggleHome}
            style={{ width: 300, height: 200 }}
          />
        </h1>
        <ul className="nav-menu">
          <li className="nav-links">
            <Link
              to="/Home"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
            >
              <span>Home</span>
            </Link>
          </li>
          <li className="nav-links">
            <Link
              to="/About"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
            >
              <span>About</span>
            </Link>
          </li>
          <li className="nav-links">
            <Link
              to="/Services"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
            >
              <span>Services</span>
            </Link>
          </li>
          <li className="nav-links">
            <Link
              to="/Blog"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
            >
              <span>Blog</span>
            </Link>
          </li>
          <li className="nav-links">
            <Link
              to="/Contact"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
            >
              <span>Contact</span>
            </Link>
          </li>
        </ul>
        <ul className="log-in">
          <li className="icons">
            <PersonOutline
              fontSize="large"
              aria-hidden="false"
              aria-label="Instagram"
            />
          </li>
          <li className="login" className="nav-links">
            <Link to="/">
              <span>Log In</span>
            </Link>
          </li>
          <li className="icons">
            <InstagramIcon
              fontSize="large"
              onClick={(event) =>
                (window.location.href =
                  "https://www.instagram.com/nityaayurveda/")
              }
              aria-hidden="false"
              aria-label="Instagram"
            />
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
