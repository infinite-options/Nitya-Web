import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import Intro from "../Intro/Intro.jsx";
import About from "../About/About.jsx";
import Services from "../Services/Services.jsx";
import Contact from "../Contact/Contact.jsx";
import ScrollToTop from "../Blog/ScrollToTop";
import "./Home.css";

export default function Home() {
  const history = useHistory();
  const [seminarActive, setSeminarActive] = useState(false);

  useEffect(() => fetchSeminars(setSeminarActive), []);

  function fetchSeminars(setSeminarActive) {
    const endpoint = `https://3o9ul2w8a1.execute-api.us-west-1.amazonaws.com/dev/api/v2/promotions`;
    fetch(`${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "Nitya" }),
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        const seminar = json;
        setSeminarActive(seminar === "ACTIVE");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="HomeContainer">
      <ScrollToTop />

      {seminarActive ? (
        <Grid className="SeminarHeader">
          <Typography
            style={{ textAlign: "left", color: "#FFFFFF", marginLeft: "2rem" }}
          >
            <span className="title">‘Eating Right for Your Body Type’</span>
            <span className="subTitle">
              {" "}
              &nbsp;&nbsp;&nbsp;In-person/Online Workshop
            </span>
          </Typography>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div
            onClick={() => {
              history.push("/seminar");
            }}
            className="seminarBtn"
          >
            Register
          </div>
        </Grid>
      ) : null}

      <div>
        <Intro />
      </div>
      <div>
        <About />
      </div>
      <div>
        <Services />
      </div>
      <div>
        <Contact />
      </div>
    </div>
  );
}
