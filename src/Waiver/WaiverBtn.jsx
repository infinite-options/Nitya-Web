import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";
function WaiverBtn() {
  // console.log("learnmore props", props);
  const useStyles = makeStyles({
    dialog: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  
    dialogActions: {
      display: "flex",
      justifyContent: "space-evenly",
    },
  
    dialogButton: {
      cursor: "pointer",
      backgroundColor: "#D3A625",
      border: "2px solid #D3A625",
      color: "white",
      textDecoration: "none",
      width: "100px",
      fontSize: "24px",
      borderRadius: "50px",
      fontFamily: "AvenirHeavy",
      "&:hover": {
        borderColor: "#D3A625",
        background: "#D3A625",
        color: "#white",
      },
    },
  });
  return (
    <div>
      <br />
      <Button

        aria-label={"click to fill out."}
      >
        <Link
          to={{
            pathname: "/waiver",
            // state: {
            //   apptID: apptID,
            // },
          }}
          style={{ color: "#0288D1", fontSize: "16px" }}
        >
          Fill Out Waiver
        </Link>
      </Button>
    </div>
  );
}

export default WaiverBtn;
