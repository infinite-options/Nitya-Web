import LearnMoreBTN from "./LearnMoreBtn";
import BookNowBTN from "../Services/BookNowBtn";
import loadinggif from "../Assets/Images/loading.gif";
import "../Home/Home.css";
import { Link } from "react-router-dom/cjs/react-router-dom";

export default function ServiceList(props) {
  const {serviceArr, serviceType} = props.data;
  const editable = props.mode;
  const data = serviceArr;
  return (
    <div className="ServiceCard">
      <div
        className="CardGrid"
        style={{ gridTemplateColumns: "repeat(1, auto)", height: "auto" }}
      >
        {data.length > 0 ? (
          data
            .filter((service) => service.category === serviceType)
            .map((filteredService) => (
              <div
                style={{
                  display: "flex",
                  backgroundColor: "#DADADA",
                  marginTop: "2rem",
                  height: "auto",
                }} key={filteredService.treatment_uid}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flex: "1",
                    backgroundColor: "#DADADA",
                    justifyContent: "center",
                    
                  }}
                >
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "300px",
                      objectFit: "scale-down",
                    }}
                    className="ServiceImg"
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
                    <div hidden={!editable}>
                    <Link
                      to={{
                        pathname: "/manageLearnMore",
                        state: {
                          apptID: filteredService.treatment_uid,
                        },
                      }}
                      style={{ color: "red", fontSize: "16px" }}
                    >
                      Edit service
                    </Link>
                    </div>
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
