import React, { Component, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import MenuItem from "@material-ui/core/MenuItem";
import PostForm from "./PostForm";
const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    top: "40px",
    marginBottom: "100px",
    left: "200px",
    right: "80px",
    height: "auto",
    width: "1430px",
    backgroundColor: "white",
    paddingTop: 0,
    paddingBottom: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.5rem",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  btn: {
    backgroundColor: "#d3a625",
    color: "#ffffff",
    boxShadow: "none",
  },
}));

export default function AddPost(props) {
  const classes = useStyles();
  return (
    <div className="page-container ">
      <div className="addpost" id="addpost">
        <h1
          style={{
            textAlign: "center",
            fontFamily: "DidoteTextW01-Italic",
            fontStyle: "italic",
            fontSize: "4.5rem",
            wordWrap: "break-word",
            color: "#d3a625",
          }}
        >
          Blog Entry
        </h1>
        <div className={classes.container}>
          <PostForm />
        </div>
      </div>
    </div>
  );
}
