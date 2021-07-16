import React from "react";
import Cookies from "universal-cookie";
import { makeStyles } from "@material-ui/core/styles";

import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  btn: {
    backgroundColor: "#d3a625",
    color: "#ffffff",
    boxShadow: "none",
  },
}));

function BlogEntries(props) {
  const cookies = new Cookies();

  const classes = useStyles();
  const customerId = cookies.get("customer_uid");
  console.log(customerId);
  let role = cookies.get("role");
  console.log(role);

  const businessList = () => {
    if (role === "ADMIN") {
      return (
        <Button variant="contained" className={classes.btn} href="/addpost">
          Add Blog Entry
        </Button>
      );
    }
  };
  return <div style={{ paddingBottom: "30px" }}>{businessList()}</div>;
}

export default BlogEntries;
