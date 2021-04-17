import React, { Component } from "react";
import { Link } from "react-router-dom";
import Scroll from "react-scroll";
import PersonIcon from "@material-ui/icons/Person";
import InstagramIcon from "@material-ui/icons/Instagram";
import logo from "../../nitya_logo.png";
import "./Navbar.css";

const ScollLink = Scroll.Link;
export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="nav-center">
          <div className="navbar-logo">
            <ScollLink
              to="home"
              spy={true}
              smooth={true}
              duration={1000}
              offset={-150}
            >
              <img src={logo} style={{ width: 200, height: 150 }} alt="logo" />
            </ScollLink>
          </div>
          <ul className="nav-menu">
            <li className="nav-links">
              <ScollLink
                to="home"
                spy={true}
                smooth={true}
                offset={-150}
                duration={1000}
              >
                Home
              </ScollLink>
            </li>
            <li className="nav-links">
              <ScollLink
                to="about"
                spy={true}
                smooth={true}
                offset={-150}
                duration={1000}
              >
                About
              </ScollLink>
            </li>
            <li>
              <ScollLink
                to="services"
                className="nav-links"
                spy={true}
                smooth={true}
                offset={-250}
                duration={1000}
              >
                Services
              </ScollLink>
            </li>
            <li className="nav-links">
              <Link to="/blog">Blog</Link>
            </li>
            <li className="nav-links">
              <ScollLink
                to="contact"
                spy={true}
                smooth={true}
                offset={-150}
                duration={1000}
              >
                Contact
              </ScollLink>
            </li>
          </ul>

          <ul className="log-in">
            <li className="nav-links">
              <Link
                to="LogIn"
                className="nav-links"
                spy={true}
                smooth={true}
                offset={-150}
                duration={1000}
              >
                <PersonIcon
                  fontSize="medium"
                  aria-hidden="false"
                  aria-label="Facebook"
                  style={{ color: "#8d6f1a" }}
                />
              </Link>
            </li>
            <li className="nav-links">
              <Link
                to="LogIn"
                className="nav-links"
                spy={true}
                smooth={true}
                offset={-150}
                duration={1000}
              >
                Log In
              </Link>
            </li>
            <li className="nav-links">
              <Link
                to="LogIn"
                className="nav-links"
                spy={true}
                smooth={true}
                offset={-150}
                duration={1000}
              >
                <InstagramIcon
                  fontSize="medoum"
                  onClick={(event) =>
                    (window.location.href =
                      "https://www.instagram.com/nityaayurveda/")
                  }
                  aria-hidden="false"
                  aria-label="Instagram"
                  style={{ color: "8d6f1a" }}
                />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
