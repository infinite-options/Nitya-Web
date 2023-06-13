import React, { useEffect, useState } from "react";
import axios from "axios";
import LearnMoreBTN from "./LearnMoreBtn";
import BookNowBTN from "../Services/BookNowBtn";
import loadinggif from "../Assets/Images/loading.gif";
import "../Home/Home.css";
export default function Treatments(props) {
  // const [data, setData] = useState([]);
  const data = props.data;
  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/treatments"
  //     )
  //     .then((res) => {
  //       console.log("response email", res.data.result);
  //       setData(res.data.result);
  //     });
  // }, []);

  return (
    <div className="ServiceCard">
      <div
        className="CardGrid"
        style={{ gridTemplateColumns: "repeat(1, auto)", height: "auto" }}
      >
        {data.length > 0 ? (
          data
            .filter((service) => service.category === "Treatment")
            .map((filteredService) => (
              <div
                style={{
                  display: "flex",
                  backgroundColor: "#DADADA",
                  marginTop: "2rem",
                  maxHeight: "282px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flex: "1",
                    backgroundColor: "#DADADA",
                    justifyContent: "center",
                    maxHeight: "100%",
                  }}
                >
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "scale-down",
                    }}
                    variant="top"
                    src={filteredService.image_url}
                    alt={"An image of" + filteredService.title}
                  />
                </div>
                <div style={{ flex: "1" }}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      marginTop: "2rem",
                      marginBottom: "2rem",
                    }}
                  >
                    <div className="Services_Title_Font">
                      {filteredService.title}
                    </div>
                    <div className="Services_Body_Font">
                      {filteredService.description} <br />
                    </div>
                    <LearnMoreBTN
                      apptID={filteredService.treatment_uid}
                    />
                    <BookNowBTN
                      apptID={filteredService.treatment_uid}
                    />
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div>
            <img src={loadinggif} alt="LOADING" className="loading-img"></img>
          </div>
        )}
      </div>
    </div>
  );
}
