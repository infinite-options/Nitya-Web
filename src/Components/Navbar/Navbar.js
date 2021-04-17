import React, { Component } from "react";
import { NavHashLink } from "react-router-hash-link";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import PersonIcon from "@material-ui/icons/Person";
import InstagramIcon from "@material-ui/icons/Instagram";
import logo from "../../nitya_logo.png";
import "./Navbar.css";
export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="nav-center">
          <div className="navbar-logo">
            <Link
              spy={true}
              smooth={true}
              duration={1000}
              onClick={() => scroll.scrollToTop()}
            >
              <img src={logo} style={{ width: 200, height: 150 }} />
            </Link>
          </div>
          <ul className="nav-menu">
            <li className="nav-links">
              <Link
                to="home"
                spy={true}
                smooth={true}
                offset={-150}
                duration={1000}
              >
                Home
              </Link>
            </li>
            <li className="nav-links">
              <Link
                to="about"
                spy={true}
                smooth={true}
                offset={-150}
                duration={1000}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="services"
                className="nav-links"
                spy={true}
                smooth={true}
                offset={-250}
                duration={1000}
              >
                Services
              </Link>
            </li>
            <li className="nav-links">
              <Link
                to="blog"
                spy={true}
                smooth={true}
                offset={-150}
                duration={1000}
              >
                Blog
              </Link>
            </li>
            <li className="nav-links">
              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={-150}
                duration={1000}
              >
                Contact
              </Link>
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
