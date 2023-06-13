import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

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
    fontSize: "15px",
    borderRadius: "50px",
    fontFamily: "AvenirHeavy",
    "&:hover": {
      borderColor: "#D3A625",
      background: "#D3A625",
      color: "#white",
    },
  },
});

const Popup = ({ showDialog, onClose, title, text }) => {
  const classes = useStyles();
  return (
    <Dialog
      open={showDialog}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      className={classes.dialog}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={onClose} className={classes.dialogButton}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
