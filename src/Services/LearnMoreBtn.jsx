import React, { Component } from "react";
import { Link } from "react-router-dom";

function LearnMoreBtn(props) {
  const apptID = props.apptID;
  // console.log("learnmore props", props);
  return (
    <div>
      <br />
      <div
        style={{
          textAlign: "center",
          color: "blue",
          textDecoration: "underline",
          font: "normal normal normal 22px/26px Hoefler Text",
        }}
        aria-label={"click button to learn more."}
      >
        <Link
          to={{
            pathname: "/learnMore",
            state: {
              apptID: apptID,
            },
          }}
          style={{ color: "#0288D1", fontSize: "16px" }}
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}

export default LearnMoreBtn;
