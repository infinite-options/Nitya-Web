import React, { useEffect, useState, useContext } from "react";
import ScrollToTop from "../../Blog/ScrollToTop";
import { Row, Col } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from 'react-router-dom';
import "./calendar.css";
import { ApptContext } from "./Scheduler";
import herbsImg from '../../Mask Group 12.png';

const useStyles = makeStyles({
  container: {
    margin: "50px auto",
    width: "980px",
    padding: "50px 50px",
    backgroundColor: "white",
    border: "inset"
  },
  h1: {
    fontSize: "24px",
    color: "#B28D42",
    fontFamily: "Hoefler",
  },
  content: {
    fontSize: "22px",
    fontFamily: "SFProDisplayRegular",
    color: "#B28D42",
    textAlign: "center",
  },
  selectTime: {
    fontSize: "32px",
    color: "#52330D",
    fontFamily: "AvenirHeavy",
    margin: "0 auto",
    textAlign: "center",
  },

  CalendarContainer: {
    margin: "auto",
    width: "980px",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "white",
    border: "2px solid #B28D42",
    color: "#B28D42",
    padding: "15px 90px",
    textAlign: "center",
    textDecoration: "none",
    display: "block",
    fontSize: "20px",
    borderRadius: "50px",
    margin: "2px auto",
    "&:hover": {
      background: "#B28D42",
      color: "white",
    },
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
    "&:active": {
      outline: "none",
      boxShadow: "none",
    },
  },
  date: {
    fontSize: "42px",
    fontFamily: "AvenirHeavy",
    margin: "0 auto",
    textAlign: "center",
  },

  center: {
    margin: "0 auto",
  },

  img: {
    width: "100%",
  }
});

export default function ConfirmationPage(props) {
  const classes = useStyles();
  const location = useLocation();

  console.log("(confirmationPage) props 1: ", props);
  console.log("(confirmationPage) props 2: ", props.location);
  console.log("location: ", location);
  // console.log("(confirmationPage) props 3: ", this.props);
  // console.log("(confirmationPage) props 4: ", this.props.location);

  //for confirmation page
  //const [apptInfo, apptInfoLoaded] = useContext(ApptContext);
  // const [elementToBeRendered, setElementToBeRendered] = useState([]);

  /* useEffect(() => {
    if (apptInfoLoaded) {
      apptInfo.forEach((element) => {
        setElementToBeRendered(element);
      });
    }
  }); */

  return (
    <div
      style={{
        // border: "dashed",
        // height: "100vh",
        height: "600px",
        width: "100vw",
        maxWidth: "100%",
        backgroundColor: "#DADADA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
        // marginBottom: "500px"
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "90%",
          height: "540px",
          maxWidth: "980px"
        }}
      >
        <div
          style={{
            // border: "1px solid green",
            height: "144px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              // border: "1px solid blue",
              display: "inline-block"
            }}
          >
            <div
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: "32px",
                color: "#b28d42",
                marginTop: "10px",
                width: "100%",
                textAlign: "center"
              }}
            >
              Booking Confirmed
            </div>
            <div
              style={{
                fontSize: "19px",
                color: "#b28d42",
                marginTop: "10px",
                width: "100%",
                textAlign: "center"
              }}
            >
              We have sent a confirmation email to
            </div>
            <div
              style={{
                fontSize: "19px",
                width: "100%",
                textAlign: "center"
              }}
            >
              {location.state.apptInfo.email}
            </div>
          </div>
        </div>
        <div
          style={{
            // border: 'dashed',
            height: 'calc(100% - 174px)',
            display: 'flex',

          }}
        >
          <div
            style={{
              // border: 'solid red',
              borderRight: '1px solid #B28D42',
              height: '100%',
              width: 'calc(50%-30px)',
              marginLeft: '30px',
              paddingRight: '30px'
            }}
          >
            <span
              style={{
                color: "#b28d42",
              }}
            >
              First-time Customer Package (online)
            </span>
            <br />
            <span
              style={{
                color: "#b28d42",
              }}
            >
              1 hr 30 min | {
                location.state.apptInfo.purchase_price.substring(
                  0, location.state.apptInfo.purchase_price.indexOf(' ')
                )
              }
            </span>
            {/* <img
              className={classes.img}
              id="blogImage"
              variant="top"
              src={
                post.blogImage == "NULL"
                  ? NityaLogo
                  : post.blogImage
              }
              style={{
                width: "50%",
                height: "50%",
                objectFit: "cover",
                objectPosition: "center -20px",
              }}
              onError={(e) =>
                (e.target.style.display = "none")
              }
              aria-label={"an image of " + post.blogTitle}
            /> */}
            <br />
            <img
              // className={classes.img}
              src={`url(${herbsImg})`}
              style={{
                width: "100px",
                height: "100px"
              }}
            />
            <br />
            <span
              style={{
                color: "#b28d42",
              }}
            >
              6055 Meridian Ave #40,
            </span>
            <br />
            <span
              style={{
                color: "#b28d42",
              }}
            >
              San Jose, CA 95120, USA
            </span>
            <br />
            <br />
            <span
              style={{
                color: "#b28d42",
              }}
            >
              Office: 408 471 7004
            </span>
          </div>
          <div
            style={{
              borderLeft: '1px solid #B28D42',
              // border: 'solid cyan',
              height: '100%',
              width: 'calc(50%-30px)',
              marginRight: '30px',
              paddingLeft: '30px'
            }}
          >
            <span>
              If anything changes we will contact you at: 
            </span>
            <br />
            <br />
            <span>
              {location.state.apptInfo.first_name}
            </span>
            <br />
            <span>
              {location.state.apptInfo.email}
            </span>
            <br />
            <br />
            <span
              style={{
                color: "#b28d42",
              }}
            >
              How to prepare for your consulation:
            </span>
            <br />
            <br />
            <span
              style={{
                color: "#b28d42",
              }}
            >
              Bringing these things to the consultation will help us accelerate the process.
            </span>
            <br />
            <br />
            <span>
            List of your current medication, diet, and food preferences
            </span>
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div 
  //     id="apptconfirm" 
  //     style={{ 
  //       backgroundColor: "#DADADA",
  //       // border: "dashed"
  //       height: "100%",
  //       width: "100%"
  //     }}
  //   >
  //     <ScrollToTop />
  //     <div className={classes.container}>
  //       <p>Booking Confirmed</p>
  //       <p>We have sent a confirmation email to </p>

  //       <Row>
  //         <Col>
  //           <p className={classes.content} style={{ textAlign: "left" }}>
  //             <br />
  //           </p>
  //           <br />

  //           <br />
  //           <br />
  //           <p className={classes.content} style={{ textAlign: "left" }}>
  //             6055 Meridian Ave #40, San Jose, CA 95120, USA
  //             <br />
  //             Office: 408 471 7004
  //           </p>
  //         </Col>
  //         <Col>
  //           <p>If anything changes we will contact you at:</p>

  //           <div>
  //             <p>How to prepare for your consultation:</p>
  //             <p>
  //               Bringing these things to the consultation will help us
  //               accelerate the process.
  //             </p>
  //             <p>
  //               List of your current medication Your diet and food preferences
  //             </p>
  //           </div>
  //         </Col>
  //       </Row>
  //     </div>
  //   </div>
  // );
}
