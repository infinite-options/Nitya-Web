import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../App";
import BookNowBTN from "./BookNowBtn";
import ScrollToTop from "../Blog/ScrollToTop";
import "./LearnMore.css";
import { Markup } from "interweave";
import "../Home/Home.css";

export default function LearnMore(props) {
  const location = useLocation();
  console.log(location.state);

  const { serviceArr: data } = useContext(MyContext);

  const parseDuration = (rawDuration) => {
    if (rawDuration === undefined) {
      return "";
    }
    console.log("rawDuration: ", rawDuration);
    let parsedDuration = "";

    let durationTokens = rawDuration.split(":");
    console.log("durationTokens: ", durationTokens);

    if (Number(durationTokens[0]) > 0) {
      parsedDuration = parsedDuration + durationTokens[0] + " hr ";
    }

    let minsNum = Number(durationTokens[1]);
    let secsNum = Number(durationTokens[2]);

    if (secsNum >= 31) {
      minsNum++;
    }

    parsedDuration = parsedDuration + minsNum + " min";

    return parsedDuration;
  };

  return (
    <div className="HomeContainer">
      <ScrollToTop />
      {/* <div className="Card"> */}

      {data != "" ? (
        data
          .filter((service) => location.state.apptID === service.treatment_uid)
          .map((filteredService) => (
            <div style={{ padding: "3% 20% 3% 20%" }}>
              <div style={{ textAlign: "center" }}>
                <div className="LearnMoreTitle">{filteredService.title}</div>
                <div className="LearnMoreText">
                  {filteredService.description} <br />
                </div>
                <div className="LearnMoreHeader">
                  {parseDuration(filteredService.duration)} |{" "}
                  {filteredService.cost}
                </div>
                <BookNowBTN
                  apptID={filteredService.treatment_uid}
                />
                <div style={{ margin: "2rem" }}>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    variant="top"
                    src={filteredService.image_url}
                    alt={"An image of" + filteredService.title}
                  />
                </div>
              </div>

              <div>
                <div style={{ padding: "0% 3% 0% 3%" }}>
                  <Markup content={filteredService.treatment_notes} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <div
                    className="LearnMoreHeader"
                    style={{ fontWeight: "bold" }}
                  >
                    {" "}
                    Book Online
                  </div>
                  <div className="LearnMoreHeader">{filteredService.title}</div>
                  <div className="LearnMoreHeader">
                    {parseDuration(filteredService.duration)} |{" "}
                    {filteredService.cost}
                  </div>
                  <BookNowBTN
                    apptID={filteredService.treatment_uid}
                  />

                  {/* <div className="LearnMoreText">
                    6055 Meridian Ave, Ste. 40, San Jose, CA 95120, US
                    4084717004 leena@nityaayurveda.com
                  </div> */}
                  <div style={{ fontWeight: "600", marginTop: "1rem" }}>
                    Cancellation Policy: To cancel or reschedule, please contact
                    us 24 hours in advance.
                  </div>
                </div>
              </div>
            </div>
          ))
      ) : (
        <div style={{ width: "1500px", backgroundColor: "white" }}></div>
      )}
    </div>
  );
}
