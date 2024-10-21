import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { Link } from "react-router-dom";
import "./BookNowBtn.css";

export default function BookNowBTN(props) {
  const { apptID, addons, onBookingSuccess, isTherapyBooked } = props;
  const [showQuesDialog, setShowQuesDialog] = useState(false);
  
  const handleButtonClick = () => {
    if (!isTherapyBooked) {
      setShowQuesDialog(true);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
      <Dialog
        open={showQuesDialog}
        onClose={() => setShowQuesDialog(false)}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">{"Please confirm"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{"Have you had an Initial Consultation?"}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to={`/${apptID}/appt`} style={{ textDecoration: "none" }}>
            <Button onClick={() => {
              onBookingSuccess();
              setShowQuesDialog(false);
            }}>
              Yes
            </Button>
          </Link>
          <Button onClick={() => setShowQuesDialog(false)}>
            No
          </Button>
        </DialogActions>
      </Dialog>
      
      {!isTherapyBooked ? (
        <Button
          className="BookNowBtn"
          onClick={handleButtonClick}
        >
          <p className="BookNowBtn">Book Now</p>
        </Button>
      ) : (
        <p style={{ color: "gray" }}>All therapies are booked for today</p>
      )}
    </div>
  );
}




// import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Dialog from "@material-ui/core/Dialog";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogActions from "@material-ui/core/DialogActions";
// import { Button } from "reactstrap";
// import { Link } from "react-router-dom";
// import Popup from "../Popup/Popup";
// import "./BookNowBtn.css";
// import "../Home/Home.css";

// const useStyles = makeStyles({
//   dialog: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   dialogActions: {
//     display: "flex",
//     justifyContent: "space-evenly",
//   },
//   dialogButton: {
//     cursor: "pointer",
//     backgroundColor: "#D3A625",
//     border: "2px solid #D3A625",
//     color: "white",
//     textDecoration: "none",
//     width: "100px",
//     fontSize: "24px",
//     borderRadius: "50px",
//     fontFamily: "AvenirHeavy",
//     "&:hover": {
//       backgroundColor: "#D3A625",
//       color: "#fff",
//     },
//   },
// });

// export default function BookNowBtn({ apptID, addons }) {
//   const classes = useStyles();
//   const [showQuesDialog, setShowQuesDialog] = useState(false);
//   const [showInfoDialog, setShowInfoDialog] = useState(false);

//   const handleOnNo = () => {
//     setShowQuesDialog(false);
//     setShowInfoDialog(true);
//   };

//   return (
//     <div aria-label={"click button to book a session now"} style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
//       <Popup
//         showDialog={showInfoDialog}
//         onClose={() => setShowInfoDialog(false)}
//         title={"Note"}
//         text={"Please book an Initial Consultation first."}
//       />
//       <Dialog open={showQuesDialog} onClose={() => setShowQuesDialog(false)} aria-labelledby="alert-dialog-title" className={classes.dialog}>
//         <DialogTitle id="alert-dialog-title">{"Please confirm"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText>{"Have you had an Initial Consultation?"}</DialogContentText>
//         </DialogContent>
//         <DialogActions className={classes.dialogActions}>
//           <Link to={`/${apptID}/appt`} style={{ textDecoration: "none" }}>
//             <Button className={classes.dialogButton}>Yes</Button>
//           </Link>
//           <Button onClick={handleOnNo} className={classes.dialogButton}>No</Button>
//         </DialogActions>
//       </Dialog>
//       <Button
//         className="BookNowBtn"
//         onClick={() => {
//           if (['330-000005', '330-000006'].includes(apptID)) {
//             setShowQuesDialog(true);
//           }
//         }}
//       >
//         <Link to={['330-000005', '330-000006'].includes(apptID) ? undefined : `/${apptID}/appt`} style={{ textDecoration: "none" }}>
//           <p className="BookNowBtn">Book Now</p>
//         </Link>
//       </Button>
//     </div>
//   );
// }




