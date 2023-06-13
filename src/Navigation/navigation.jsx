import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import InstagramIcon from "@material-ui/icons/Instagram";
import Logo from "../Assets/Images/Logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState(false);
  const [onClickAbout, setOnClickAbout] = useState(false);
  const [onClickproject, setOnClickProject] = useState(false);
  const [onClickteams, setOnClickTeams] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
    setProjects(false);
  };

  const closeMenuHome = () => {
    setOpen(false);
    setProjects(false);
    setOnClickAbout(!onClickAbout);
    console.log("about", onClickAbout);
  };

  const closeMenuProjects = () => {
    setOpen(false);
    setProjects(true);
    setOnClickProject(!onClickproject);
    console.log("clickPro", onClickproject);
  };

  const closeMenuTeams = () => {
    setOpen(false);
    setProjects(true);
    setOnClickTeams(!onClickteams);
    console.log("click", onClickteams);
  };

  return (
    <nav className="navbar">
      <div className="emptyDiv"></div>
      <Link to="/" className="nav-logobar" onClick={closeMenu}>
        <img className="nav-logo" src={Logo} />
      </Link>
      <div onClick={handleClick} className="nav-icon">
        {open ? <FiX /> : <FiMenu />}
      </div>
      <ul className={open ? "nav-links active" : "nav-links"}>
        <li className="nav-item">
          <Link
            to={{ pathname: "/", state_project: { project: onClickproject } }}
            className="nav-link"
            onClick={closeMenuProjects}
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to={{ pathname: "/services", state_teams: { teams: onClickteams } }}
            className="nav-link"
            onClick={closeMenuTeams}
          >
            Services
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={{ pathname: "/about", state: { click: onClickAbout } }}
            className="nav-link"
            onClick={closeMenuHome}
          >
            About Us
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/contact" className="nav-link" onClick={closeMenu}>
            Contact
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={{ pathname: "/blog", state: { click: onClickAbout } }}
            className="nav-link"
            onClick={closeMenuHome}
          >
            Blog
          </Link>
        </li>
      </ul>

      <div className="emptyDiv1">
        <InstagramIcon
          fontSize="large"
          className="instagram-icon"
          onClick={(event) =>
            (window.location.href = "https://www.instagram.com/nityaayurveda/")
          }
        />
      </div>
    </nav>
  );
};

export default Navbar;
