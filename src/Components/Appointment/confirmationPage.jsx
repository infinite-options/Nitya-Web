import React, { useEffect, useState, useContext } from "react";
import ScrollToTop from "../../Blog/ScrollToTop";
import { Row, Col } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from 'react-router-dom';
import "./calendar.css";
import { ApptContext } from "./Scheduler";
import herbsImg from '../../images/herbsImg.png';
// import MapSection from "../Home/Map";
// import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const google = window.google;

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
  // const google = window.google;

  console.log("window: ", window);
  console.log("window.google: ", google);

  const classes = useStyles();
  const location = useLocation();

  const scaleWidthFn = () => {
    return 280-(810-dimensions.width)*0.4;
  }

  const scaleHeightFn = (y) => {
    return 210-(810-dimensions.width)*0.3;
  }

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

  const [dimensions, setDimensions] = useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  });

  useEffect(() => {
    console.log("RERENDER -- window: ", window);
    console.log("RERENDER -- window.google: ", window.google);
    // console.log("RERENDER -- this.google: ", this.google);
    function handleResize() {
			setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
		}

    window.addEventListener('resize', handleResize);

		return _ => {
      window.removeEventListener('resize', handleResize);
		}
  });

  useEffect(() => {
    // const map = new google.maps.Map(document.getElementById("map"), {
    //   center: { lat: 37, lng: 110},
    //   zoom: 12,
    // });
    // console.log();
  }, []);

  return (
    <div
      style={{
        // border: "dashed",
        // height: "100vh",
        height: "860px",
        width: "100vw",
        maxWidth: "100%",
        backgroundColor: "#DADADA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
        // marginBottom: "500px"
      }}
    >
      {/* For debugging window size */}
			{/* <span 
				style={{
					zIndex: '101',
					position: 'fixed',
					backgroundColor: 'white',
					border: 'solid',
					borderWidth: '1px',
					borderColor: 'red',
					width: '150px',
          left: '0'
				}}
			>
				Height: {dimensions.height}px
				<br />
				Width: {dimensions.width}px
			</span> */}
      {/* width: `calc(${280-(810-dimensions.width)}px)` */}
      {/* <span 
				style={{
					zIndex: '101',
					position: 'fixed',
					backgroundColor: 'white',
					border: 'solid',
					borderWidth: '1px',
					borderColor: 'green',
					width: '150px',
          right: '0'
				}}
			>
				Height: {scaleHeightFn(dimensions.width)}px
				<br />
				Width: {scaleWidthFn(dimensions.width)}px
			</span> */}
      <div
        style={{
          backgroundColor: "white",
          width: "90%",
          height: "800px",
          maxWidth: "980px",
          display: 'block',
          overflow: 'auto'
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
            display: 'inline-flex',
            width: '100%'
          }}
        >
          <div
            style={{
              // border: 'solid purple',
              borderRight: '1px solid #B28D42',
              height: '100%',
              // minWidth: 'calc(50%-30px)',
              // width: 'calc(50%-30px)',
              width: '50%',
              marginLeft: '30px',
              paddingRight: '30px'
            }}
          >
            <span
              style={{
                color: "#b28d42",
                fontSize: '18px',
                fontWeight: '500'
              }}
            >
              First-Time Customer Package (Online)
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
            {/* <div
              style={{
                position: 'relative',
                // border: '1px solid green',
                height: '224px'
              }}
            >
              <img
                // className={classes.img}
                // src={`url(${herbsImg})`}
                // src={herbsImg}
                // src={require(herbsImg)}
                src={require('../../Mask Group 12.png').default}
                style={{
                  position: 'absolute',
                  width: "280px",
                  maxWidth: '95%',
                  // height: "210px",
                  // height: '75vw',
                  paddingBottom: '75%',
                  margin: '20px 0 0 0'
                }}
              />
            </div> */}
            <img
              // className={classes.img}
              // src={`url(${herbsImg})`}
              // src={herbsImg}
              // src={require(herbsImg)}
              src={require('../../Mask Group 12.png').default}
              style={dimensions.width > 810 ? {
                width: '280px',
                height: '210px',
                // maxWidth: '95%',
                // height: "210px",
                // height: '75vw',
                // paddingBottom: '75%',
                margin: '20px 0 20px 0'
              } : {
                // width: `calc(${280-(810-dimensions.width)}px)`,
                // height: `calc(${210+(810-dimensions.width)}px)`,
                width: `${scaleWidthFn(dimensions.width)}px`,
                height: `${scaleHeightFn(dimensions.width)}px`,
                // height: `${dimensions.width-600}px`,
                // maxWidth: '95%',
                // height: "210px",
                // height: '75vw',
                // paddingBottom: '75%',
                margin: '20px 0 20px 0'
              }}
            />
            {/* <img
              // className={classes.img}
              // src={`url(${herbsImg})`}
              // src={herbsImg}
              // src={require(herbsImg)}
              src={require('../../Mask Group 12.png').default}
              style={{
                width: "280px",
                maxWidth: '95%',
                // height: "210px",
                // height: '75vw',
                paddingBottom: '75%',
                margin: '10px 0 10px 0'
              }}
            /> */}
            <br />
            <span
              style={{
                color: "#b28d42",
              }}
            >
              6055 Meridian Ave #40
            </span>
            <br />
            <span
              style={{
                color: "#b28d42",
              }}
            >
              San Jose, CA, 95120
            </span>
            <br />
            <br />
            <span
              style={{
                color: "#b28d42",
              }}
            >
              Office: (408) 471-7004
            </span>
            <br />
            {/* <div
              id = "map"
              style={{
                height: '200px',
                width: '200px',
                border: '1px solid',
                margin: '20px 0 20px 0',
              }}
            >
              MAPS
            </div> */}
            {/* <div
              style={{
                position: 'relative',
                border: '1px solid green',
                height: '250px'
              }}
            > */}
            {/* <MapSection location={{lat: 37, lng: 122}} zoomLevel={15}/> */}
            {/* <div 
              // className = {styles.googleMap} 
              style={{
                width: '280px',
                height: '210px',
                margin: '20px 0 0 0',
                borderRadius: '25px',
                border: '1px solid'
                // backgroundColor: '#E8E8E8',
                // display: 'flex',
                // alignItems: 'center',
                // justifyContent: 'center'
              }}
              // id = "map"
            />    */}
              <div
                style={dimensions.width > 810 ? {
                  width: '280px',
                  height: '210px',
                  margin: '20px 0 0 0',
                  borderRadius: '25px',
                  backgroundColor: '#E8E8E8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                } : {
                  // position: 'absolute',
                  // width: "280px",
                  // maxWidth: '95%',
                  // height: "210px",
                  // height: '75vw',
                  // paddingBottom: '75%',
                  width: `${scaleWidthFn(dimensions.width)}px`,
                  height: `${scaleHeightFn(dimensions.width)}px`,
                  // maxWidth: '95%',
                  // height: '210px',
                  margin: '20px 0 0 0',
                  borderRadius: '25px',
                  backgroundColor: '#E8E8E8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                Maps
              </div>
            {/* </div> */}
          </div>
          <div
            style={{
              borderLeft: '1px solid #B28D42',
              // border: 'solid cyan',
              height: '100%',
              // width: 'calc(50%-30px)',
              width: '50%',
              marginRight: '30px',
              paddingLeft: '30px'
            }}
          >
            <div
              style={{
                fontSize: '18px',
                fontWeight: '500'
              }}
            >
              If anything changes we will contact you: 
            </div>
            {/* <br />
            <br /> */}
            <div
              style={{
                fontSize: '22px',
                fontWeight: '300',
                margin: '16px 0 0 0'
              }}
            >
              {location.state.apptInfo.first_name}
            </div>
            {/* <br /> */}
            <div
              style={{
                fontSize: '22px',
                fontWeight: '300',
                // margin: '24px 0 0 0'
              }}
            >
              {location.state.apptInfo.phone_no}
            </div>
            {/* <br />
            <br /> */}
            {/* <br /> */}
            <div
              style={{
                color: "#b28d42",
                fontSize: '20px',
                margin: '40px 0 0 0'
              }}
            >
              How to prepare for your consultation:
            </div>
            {/* <br /> */}
            {/* <br /> */}
            <div
              style={{
                color: "#b28d42",
                fontSize: '14px',
                // padding: '50px 50px 50px 50px',
                margin: '12px 0 0 0'
                // display: 'inline-block',
                // width: '50%',
                // border: 'dashed'
              }}
            >
              Bringing these things to the consultation will help us accelerate the process.
            </div>
            {/* <br /> */}
            {/* <br /> */}
            {/* <span>
              List of your current medication, diet, and food preferences
            </span> */}
            <div
              style={{
                fontSize: '14px',
                margin: '12px 0 0 0'
                // display: 'inline-block',
                // width: '50%',
                // border: 'dashed'
              }}
            >
              List of your current medication, diet, and food preferences
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
