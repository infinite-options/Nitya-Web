import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import "../Home/Home.css";
import "../Appointment/AppointmentPage.css";
import { Link, useHistory } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import WaiverContext from "./WaiverContext";
const google = window.google;


const useStyles = makeStyles({
  MobileContainerDivider: {
    height: "calc(100% - 174px)",
    display: "flex",
    width: "100%",
    "@media (max-width: 500px)": {
      height: "auto",
      display: "flex",
      flexDirection: "column",
    },
  },

  MobileContainerSubDivider: {
    borderRight: "1px solid #D3A625",
    height: "100%",
    width: "50%",
    marginLeft: "30px",
    marginBottom: "10px",
    "@media (max-width: 500px)": {
      width: "100%",
      borderRight: "0px solid #D3A625",
      marginLeft: "0px",
    },
  },
});

export default function WaiverConfirmation(props) {
  const classes = useStyles();
  const location = useLocation();
  const [userEmail, setUserEmail] = useState(null);
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    console.log('email: ', email);
    if (email) {
        setUserEmail(email);
    }
    }, []);
//   const {email} = useContext(WaiverContext);

  const scaleWidthFn = () => {
    return 280 - (810 - dimensions.width) * 0.4;
  };

  const scaleHeightFn = (y) => {
    return 210 - (810 - dimensions.width) * 0.3;
  };

  console.log("(confirmationPage) props 1: ", props);
  console.log("(confirmationPage) props 2: ", props.location);

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  return (
    <div className="HomeContainer">
      <div className="Card">
        <div className="TitleFontAppt" style={{ marginTop: "1rem" }}>
          <div>Waiver Sent</div>
          <div className="CardText" style={{ marginTop: "1rem" }}>
              You have successfully filled out a waiver!
            </div>
          <div className="CardText" style={{ marginTop: "1rem" }}>
            We have sent a waiver email to: 
          </div>
          <div className="CardText" style={{ marginTop: "1rem" }}>
          {userEmail}
          </div>
        </div>

        <div className="CardGrid">

          <div style={{ padding: "1rem" }}>
            <div
              style={{
                color: "#D3A625",
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              If anything changes we will contact you:
            </div>
            

            <div style={{ padding: "1rem" }}>
              <Link
                to={{ pathname: "/"}}
                className="nav-link"
              >
                <Box 
                  sx={{
                    display: 'flex',
                    justifyContent: 'center', // Center the button horizontally
                    alignItems: 'center', // Center the button vertically
                  }}>
                  <Button
                    className={classes.bookButton}
                    style={{borderRadius: "24px" }}
                    variant="contained"
                    component="span"
                    type="button"
                    // onClick={onImageUpload}
                  >
                    Return to Home
                </Button>
                </Box>
                
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
