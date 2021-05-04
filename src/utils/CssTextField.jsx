import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/styles/withStyles";

const CssTextField = withStyles({
  root: {
    backgroundColor: "#ffffff",
    "& label.Mui-focused": {
      border: "3px solid #8d6f1a",
      color: "#8d6f1a",
      backgroundColor: "#ffffff",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        border: "3px solid #8d6f1a",
      },
    },
    "&:hover": {
      backgroundColor: "#fff",
    },
    "&focused": {
      backgroundColor: "#fff",
    },
  },
})(TextField);

export default CssTextField;
