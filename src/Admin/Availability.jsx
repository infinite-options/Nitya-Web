import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import moment from "moment";
import { Box, Button, Typography, Modal } from "@material-ui/core";
import { Col, Form, Row } from "react-bootstrap";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import DeleteForeverSharpIcon from "@material-ui/icons/DeleteForeverSharp";
import ScrollToTop from "../Blog/ScrollToTop";
import "../Home/Home.css";
const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#d3a625",
  border: "2px solid #000",
  boxShadow: 24,
  color: "white",
  font: "normal normal medium 20px SF Pro Display",
  p: 4,
};
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#dadada",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0%",
    margin: "0%",
  },
  weekDiv: {
    padding: "5px 5px",
    borderTop: "1px solid #AFAFB3",
    borderBottom: "1px solid #AFAFB3",
    backgroundColor: "white",
    display: "flex",
    // flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  colHeader: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    fontSize: "14px",
    color: "#2C2C2E",
    padding: "2rem",
    font: "normal normal normal 14px/16px SF Pro Display",
  },
  colTitle: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    fontSize: "18px",
    color: "#2C2C2E",
    padding: "13px 0px",
    font: "normal normal normal 18px SF Pro Display",
  },
  colData: {
    fontSize: "16px",
    color: "#636366",
    textAlign: "left",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // width: "",
    // padding: "10px 0px",
  },
  cardTitle: {
    fontFamily: "Hoefler Text Bold",
    color: "#d3a625",
    fontSize: "32px",
    fontStyle: "italic",
    /* fontSeight: "bold", */
    marginRight: "0rem",
    padding: "0px",
    textAlign: "center",
  },
  tableCells: {
    width: "30%",
    padding: "0.3rem",
    textAlign: "center",
  },
  formLabels: {
    color: "white",
    fontSize: "16px",
    font: "normal normal medium 16px SF Pro Display",
  },
  formButton: {
    backgroundColor: "white",
    color: "#d3a625",
    fontSize: "16px",
    font: "normal normal medium 16px SF Pro Display",
    borderRadius: "10px",
  },
}));

function Availability() {
  const classes = useStyles();
  const [availabilityOnlineHours, setAvailabilityOnlineHours] = useState([]);
  const [availabilityOfficeHours, setAvailabiltyOfficeHours] = useState([]);
  const [unavailability, setUnavailabilty] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dateUnavailable, setDateUnavailable] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedUnavailable, setSelectedUnavailable] = useState("");

  const [sundayFieldsOnline, setSundayFieldsOnline] = useState([
    {
      id: "",
      morning_start_time: "",
      morning_end_time: "",
      afternoon_start_time: "",
      afternoon_end_time: "",
    },
  ]);
  const [mondayFieldsOnline, setMondayFieldsOnline] = useState([
    {
      id: "",
      morning_start_time: "",
      morning_end_time: "",
      afternoon_start_time: "",
      afternoon_end_time: "",
    },
  ]);
  const [tuesdayFieldsOnline, setTuesdayFieldsOnline] = useState([
    {
      id: "",
      morning_start_time: "",
      morning_end_time: "",
      afternoon_start_time: "",
      afternoon_end_time: "",
    },
  ]);
  const [wednesdayFieldsOnline, setWednesdayFieldsOnline] = useState([
    {
      id: "",
      morning_start_time: "",
      morning_end_time: "",
      afternoon_start_time: "",
      afternoon_end_time: "",
    },
  ]);
  const [thursdayFieldsOnline, setThursdayFieldsOnline] = useState([
    {
      id: "",
      morning_start_time: "",
      morning_end_time: "",
      afternoon_start_time: "",
      afternoon_end_time: "",
    },
  ]);
  const [fridayFieldsOnline, setFridayFieldsOnline] = useState([
    {
      id: "",
      morning_start_time: "",
      morning_end_time: "",
      afternoon_start_time: "",
      afternoon_end_time: "",
    },
  ]);
  const [saturdayFieldsOnline, setSaturdayFieldsOnline] = useState([
    {
      id: "",
      morning_start_time: "",
      morning_end_time: "",
      afternoon_start_time: "",
      afternoon_end_time: "",
    },
  ]);

  const [sundayFieldsOffice, setSundayFieldsOffice] = useState([
    {
      id: "",
      morning_start_time: "",
      morning_end_time: "",
      afternoon_start_time: "",
      afternoon_end_time: "",
    },
  ]);
  const [mondayFieldsOffice, setMondayFieldsOffice] = useState([
    {
      id: "",
      morning_start_time: "",
      morning_end_time: "",
      afternoon_start_time: "",
      afternoon_end_time: "",
    },
  ]);
  const [tuesdayFieldsOffice, setTuesdayFieldsOffice] = useState([
    {
      id: "",
      morning_start_time: "",
      morning_end_time: "",
      afternoon_start_time: "",
      afternoon_end_time: "",
    },
  ]);
  const [wednesdayFieldsOffice, setWednesdayFieldsOffice] = useState([
    {
      id: "",
      morning_start_time: "",
      morning_end_time: "",
      afternoon_start_time: "",
      afternoon_end_time: "",
    },
  ]);
  const [thursdayFieldsOffice, setThursdayFieldsOffice] = useState([
    {
      id: "",
      morning_start_time: "",
      morning_end_time: "",
      afternoon_start_time: "",
      afternoon_end_time: "",
    },
  ]);
  const [fridayFieldsOffice, setFridayFieldsOffice] = useState([
    {
      id: "",
      morning_start_time: "",
      morning_end_time: "",
      afternoon_start_time: "",
      afternoon_end_time: "",
    },
  ]);
  const [saturdayFieldsOffice, setSaturdayFieldsOffice] = useState([
    {
      id: "",
      morning_start_time: "",
      morning_end_time: "",
      afternoon_start_time: "",
      afternoon_end_time: "",
    },
  ]);

  useEffect(() => {
    getAvailabilty();
    getUnavailabilty();
  }, []);

  const getAvailabilty = () => {
    axios
      .get(BASE_URL + `availability`)
      .then((response) => {
        let times = response.data.result;
        let onlineHours = [];
        let officeHours = [];

        for (let i = 0; i < times.length; i++) {
          if (times[i]["hoursMode"] === "Online") {
            onlineHours.push(times[i]);
          } else {
            officeHours.push(times[i]);
          }
        }
        // console.log(onlineHours, officeHours);
        for (let i = 0; i < onlineHours.length; i++) {
          if (onlineHours[i].day === "Sunday") {
            let fields = {
              id: onlineHours[i].days_uid,
              morning_start_time: onlineHours[i].morning_start_time,
              morning_end_time: onlineHours[i].morning_end_time,
              afternoon_start_time: onlineHours[i].afternoon_start_time,
              afternoon_end_time: onlineHours[i].afternoon_end_time,
            };
            console.log(fields);
            setSundayFieldsOnline([fields]);
          } else if (onlineHours[i].day === "Monday") {
            let fields = {
              id: onlineHours[i].days_uid,
              morning_start_time: onlineHours[i].morning_start_time,
              morning_end_time: onlineHours[i].morning_end_time,
              afternoon_start_time: onlineHours[i].afternoon_start_time,
              afternoon_end_time: onlineHours[i].afternoon_end_time,
            };
            setMondayFieldsOnline([fields]);
          } else if (onlineHours[i].day === "Tuesday") {
            let fields = {
              id: onlineHours[i].days_uid,
              morning_start_time: onlineHours[i].morning_start_time,
              morning_end_time: onlineHours[i].morning_end_time,
              afternoon_start_time: onlineHours[i].afternoon_start_time,
              afternoon_end_time: onlineHours[i].afternoon_end_time,
            };
            setTuesdayFieldsOnline([fields]);
          } else if (onlineHours[i].day === "Wednesday") {
            let fields = {
              id: onlineHours[i].days_uid,
              morning_start_time: onlineHours[i].morning_start_time,
              morning_end_time: onlineHours[i].morning_end_time,
              afternoon_start_time: onlineHours[i].afternoon_start_time,
              afternoon_end_time: onlineHours[i].afternoon_end_time,
            };
            setWednesdayFieldsOnline([fields]);
          } else if (onlineHours[i].day === "Thursday") {
            let fields = {
              id: onlineHours[i].days_uid,
              morning_start_time: onlineHours[i].morning_start_time,
              morning_end_time: onlineHours[i].morning_end_time,
              afternoon_start_time: onlineHours[i].afternoon_start_time,
              afternoon_end_time: onlineHours[i].afternoon_end_time,
            };
            setThursdayFieldsOnline([fields]);
          } else if (onlineHours[i].day === "Friday") {
            let fields = {
              id: onlineHours[i].days_uid,
              morning_start_time: onlineHours[i].morning_start_time,
              morning_end_time: onlineHours[i].morning_end_time,
              afternoon_start_time: onlineHours[i].afternoon_start_time,
              afternoon_end_time: onlineHours[i].afternoon_end_time,
            };
            setFridayFieldsOnline([fields]);
          } else {
            let fields = {
              id: onlineHours[i].days_uid,
              morning_start_time: onlineHours[i].morning_start_time,
              morning_end_time: onlineHours[i].morning_end_time,
              afternoon_start_time: onlineHours[i].afternoon_start_time,
              afternoon_end_time: onlineHours[i].afternoon_end_time,
            };
            setSaturdayFieldsOnline([fields]);
          }
        }

        for (let i = 0; i < officeHours.length; i++) {
          if (officeHours[i].day === "Sunday") {
            let fields = {
              id: officeHours[i].days_uid,
              morning_start_time: officeHours[i].morning_start_time,
              morning_end_time: officeHours[i].morning_end_time,
              afternoon_start_time: officeHours[i].afternoon_start_time,
              afternoon_end_time: officeHours[i].afternoon_end_time,
            };
            console.log(fields);
            setSundayFieldsOffice([fields]);
          } else if (officeHours[i].day === "Monday") {
            let fields = {
              id: officeHours[i].days_uid,
              morning_start_time: officeHours[i].morning_start_time,
              morning_end_time: officeHours[i].morning_end_time,
              afternoon_start_time: officeHours[i].afternoon_start_time,
              afternoon_end_time: officeHours[i].afternoon_end_time,
            };
            setMondayFieldsOffice([fields]);
          } else if (officeHours[i].day === "Tuesday") {
            let fields = {
              id: officeHours[i].days_uid,
              morning_start_time: officeHours[i].morning_start_time,
              morning_end_time: officeHours[i].morning_end_time,
              afternoon_start_time: officeHours[i].afternoon_start_time,
              afternoon_end_time: officeHours[i].afternoon_end_time,
            };
            setTuesdayFieldsOffice([fields]);
          } else if (officeHours[i].day === "Wednesday") {
            let fields = {
              id: officeHours[i].days_uid,
              morning_start_time: officeHours[i].morning_start_time,
              morning_end_time: officeHours[i].morning_end_time,
              afternoon_start_time: officeHours[i].afternoon_start_time,
              afternoon_end_time: officeHours[i].afternoon_end_time,
            };
            setWednesdayFieldsOffice([fields]);
          } else if (officeHours[i].day === "Thursday") {
            let fields = {
              id: officeHours[i].days_uid,
              morning_start_time: officeHours[i].morning_start_time,
              morning_end_time: officeHours[i].morning_end_time,
              afternoon_start_time: officeHours[i].afternoon_start_time,
              afternoon_end_time: officeHours[i].afternoon_end_time,
            };
            setThursdayFieldsOffice([fields]);
          } else if (officeHours[i].day === "Friday") {
            let fields = {
              id: officeHours[i].days_uid,
              morning_start_time: officeHours[i].morning_start_time,
              morning_end_time: officeHours[i].morning_end_time,
              afternoon_start_time: officeHours[i].afternoon_start_time,
              afternoon_end_time: officeHours[i].afternoon_end_time,
            };
            setFridayFieldsOffice([fields]);
          } else {
            let fields = {
              id: officeHours[i].days_uid,
              morning_start_time: officeHours[i].morning_start_time,
              morning_end_time: officeHours[i].morning_end_time,
              afternoon_start_time: officeHours[i].afternoon_start_time,
              afternoon_end_time: officeHours[i].afternoon_end_time,
            };
            setSaturdayFieldsOffice([fields]);
          }
        }

        setAvailabilityOnlineHours(onlineHours);
        setAvailabiltyOfficeHours(officeHours);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUnavailabilty = () => {
    axios
      .get(BASE_URL + `unavailability`)
      .then((response) => {
        let times = response.data.result;
        // console.log(times);
        let unavailable = [];

        for (let i = 0; i < times.length; i++) {
          if (times[i]["date"] >= moment().format("YYYY-MM-DD")) {
            unavailable.push(times[i]);
          }
        }
        // console.log(unavailable);
        unavailable.sort((a, b) =>
          a.date > b.date ? 1 : b.date > a.date ? -1 : 0
        );
        setUnavailabilty(unavailable);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleClose = () => {
    setOpen(false);
    setDateUnavailable("");
    setStartTime("");
    setEndTime("");
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedUnavailable("");
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    getAvailabilty();
    timeDisplayOnline();
  };
  const addUnavailability = () => {
    let info = {
      date: dateUnavailable,
      start_time_notavailable: startTime,
      end_time_notavailable: endTime,
    };
    // console.log(info);
    axios.post(BASE_URL + "updateUnavailability", info).then((response) => {
      //   console.log("added", response.data);
      setOpen(false);
      setDateUnavailable("");
      setStartTime("");
      setEndTime("");
      getUnavailabilty();
    });
  };
  const updateOnlineHours = () => {
    let info = {
      days: [
        sundayFieldsOnline,
        mondayFieldsOnline,
        tuesdayFieldsOnline,
        wednesdayFieldsOnline,
        thursdayFieldsOnline,
        fridayFieldsOnline,
        saturdayFieldsOnline,
      ],
    };
    console.log(info);
    axios.post(BASE_URL + "updateAvailability", info).then((response) => {
      //   console.log("added", response.data);
      handleOpenUpdate();
    });
  };
  const updateOfficeHours = () => {
    let info = {
      days: [
        sundayFieldsOffice,
        mondayFieldsOffice,
        tuesdayFieldsOffice,
        wednesdayFieldsOffice,
        thursdayFieldsOffice,
        fridayFieldsOffice,
        saturdayFieldsOffice,
      ],
    };
    console.log(info);
    axios.post(BASE_URL + "updateAvailability", info).then((response) => {
      //   console.log("added", response.data);
      handleOpenUpdate();
    });
  };

  function handleDelete(id) {
    axios
      .post(
        `https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/deleteUnavailability/${id}`
      )
      .then((response) => {
        console.log("delete", response.data);
        setOpenDelete(!openDelete);
        getUnavailabilty();
      });
  }
  function handleUpdate(time) {
    console.log(time, startTime, endTime);
    let info = {
      id: time.prac_avail_uid,
      date: time.date,
      start_time_notavailable:
        startTime === "" ? time.start_time_notavailable : startTime,
      end_time_notavailable:
        endTime === "" ? time.end_time_notavailable : endTime,
    };
    console.log(info);
    axios.put(BASE_URL + "updateUnavailability", info).then((response) => {
      console.log("updated", response.data);
      getUnavailabilty();
      setEdit(!edit);
      setStartTime("");
      setEndTime("");
    });
  }
  // console.log(dateUnavailable, startTime, endTime);

  const convertTime12to24 = (time12h) => {
    let time = time12h.slice(0, -2);
    let modifier = time12h.slice(-2);

    if (time === "12") {
      time = "00";
    }

    if (modifier === "PM") {
      time = parseInt(time, 10) + 12;
    }

    return `${time}:00`;
  };

  function range(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  }

  function handleSundayUpdateOnline(event, i) {
    console.log(sundayFieldsOnline);
    const fields = [...sundayFieldsOnline];
    console.log(i, event.target.value);
    fields[0][event.target.name] = event.target.value;
    console.log(fields);
    setSundayFieldsOnline(fields);
  }
  function handleMondayUpdateOnline(event, i) {
    console.log(mondayFieldsOnline);
    const fields = [...mondayFieldsOnline];
    console.log(i, event.target.value, fields);
    fields[0][event.target.name] = event.target.value;
    console.log(fields);
    setMondayFieldsOnline(fields);
  }
  function handleTuesdayUpdateOnline(event, i) {
    console.log(tuesdayFieldsOnline);
    const fields = [...tuesdayFieldsOnline];
    console.log(i, event.target.value);
    fields[0][event.target.name] = event.target.value;
    console.log(fields);
    setTuesdayFieldsOnline(fields);
  }
  function handleWednesdayUpdateOnline(event, i) {
    console.log(wednesdayFieldsOnline);
    const fields = [...wednesdayFieldsOnline];
    console.log(i, event.target.value);
    fields[0][event.target.name] = event.target.value;
    console.log(fields);
    setWednesdayFieldsOnline(fields);
  }
  function handleThursdayUpdateOnline(event, i) {
    console.log(thursdayFieldsOnline);
    const fields = [...thursdayFieldsOnline];
    console.log(i, event.target.value);
    fields[0][event.target.name] = event.target.value;
    console.log(fields);
    setThursdayFieldsOnline(fields);
  }
  function handleFridayUpdateOnline(event, i) {
    console.log(fridayFieldsOnline);
    const fields = [...fridayFieldsOnline];
    console.log(i, event.target.value);
    fields[0][event.target.name] = event.target.value;
    console.log(fields);
    setFridayFieldsOnline(fields);
  }
  function handleSaturdayUpdateOnline(event, i) {
    console.log(saturdayFieldsOnline);
    const fields = [...saturdayFieldsOnline];
    console.log(i, event.target.value);
    fields[0][event.target.name] = event.target.value;
    console.log(fields);
    setSaturdayFieldsOnline(fields);
  }

  function handleSundayUpdateOffice(event, i) {
    console.log(sundayFieldsOffice);
    const fields = [...sundayFieldsOffice];
    console.log(i, event.target.value);
    fields[0][event.target.name] = event.target.value;
    console.log(fields);
    setSundayFieldsOffice(fields);
  }
  function handleMondayUpdateOffice(event, i) {
    console.log(mondayFieldsOffice);
    const fields = [...mondayFieldsOffice];
    console.log(i, event.target.value);
    fields[0][event.target.name] = event.target.value;
    console.log(fields);
    setMondayFieldsOffice(fields);
  }
  function handleTuesdayUpdateOffice(event, i) {
    console.log(tuesdayFieldsOffice);
    const fields = [...tuesdayFieldsOffice];
    console.log(i, event.target.value);
    fields[0][event.target.name] = event.target.value;
    console.log(fields);
    setTuesdayFieldsOffice(fields);
  }
  function handleWednesdayUpdateOffice(event, i) {
    console.log(wednesdayFieldsOffice);
    const fields = [...wednesdayFieldsOffice];
    console.log(i, event.target.value);
    fields[0][event.target.name] = event.target.value;
    console.log(fields);
    setWednesdayFieldsOffice(fields);
  }
  function handleThursdayUpdateOffice(event, i) {
    console.log(thursdayFieldsOffice);
    const fields = [...thursdayFieldsOffice];
    console.log(i, event.target.value);
    fields[0][event.target.name] = event.target.value;
    console.log(fields);
    setThursdayFieldsOffice(fields);
  }
  function handleFridayUpdateOffice(event, i) {
    console.log(fridayFieldsOffice);
    const fields = [...fridayFieldsOffice];
    console.log(i, event.target.value);
    fields[0][event.target.name] = event.target.value;
    console.log(fields);
    setFridayFieldsOffice(fields);
  }
  function handleSaturdayUpdateOffice(event, i) {
    console.log(saturdayFieldsOffice);
    const fields = [...saturdayFieldsOffice];
    console.log(i, event.target.value);
    fields[0][event.target.name] = event.target.value;
    console.log(fields);
    setSaturdayFieldsOffice(fields);
  }
  function getBackgroundColorAvailable(i, day) {
    let color;
    let result = [];
    let result1 = [];

    day.morning_start_time.slice(0, -6) === "" ||
    day.morning_end_time.slice(0, -6) === ""
      ? (color = "")
      : Number(day.morning_start_time.slice(0, -6)) <=
          Number(convertTime12to24(i).slice(0, -3)) &&
        Number(convertTime12to24(i).slice(0, -3)) <=
          Number(day.morning_end_time.slice(0, -6))
      ? //(color = `${selectedView.color}`),
        (result = range(
          Number(day.morning_start_time.slice(0, -6)),
          Number(day.morning_end_time.slice(0, -6))
        ))
      : (color = "");

    day.afternoon_start_time.slice(0, -6) === "" ||
    day.afternoon_end_time.slice(0, -6) === ""
      ? (color = "")
      : Number(day.afternoon_start_time.slice(0, -6)) <=
          Number(convertTime12to24(i).slice(0, -3)) &&
        Number(convertTime12to24(i).slice(0, -3)) <=
          Number(day.afternoon_end_time.slice(0, -6))
      ? //(color = `${selectedView.color}`),
        (result1 = range(
          Number(day.afternoon_start_time.slice(0, -6)),
          Number(day.afternoon_end_time.slice(0, -6))
        ))
      : (color = "");
    for (var j = 0; j < result.length - 1; j++)
      if (result[j] === Number(convertTime12to24(i).slice(0, -3)))
        color = "#d3a625";
    for (var j = 0; j < result1.length - 1; j++)
      if (result1[j] === Number(convertTime12to24(i).slice(0, -3)))
        color = "#d3a625";
    return color;
  }
  //   console.log(isLoading);

  const timeDisplayOnline = () => {
    //this essentially creates the time row
    let arr = [];

    for (let i = 6; i < 24; ++i) {
      arr.push(
        i === 0
          ? "12AM"
          : i === 12
          ? i + "PM"
          : i > 11
          ? i - 12 + "PM"
          : i + "AM"
      );
    }
    // console.log(arr);
    // console.log(Object.values(availabilityOnlineHours));
    return (
      <div style={{ width: "80%" }}>
        <table>
          <thead>
            <tr>
              {arr.map((item) => (
                <td
                  style={{
                    padding: "5px",
                    width: "5rem",
                    font: "normal normal normal 12px/14px SF Pro Display",
                  }}
                >
                  {item}
                </td>
              ))}
            </tr>
          </thead>
          <tbody style={{ borderLeft: "1px solid #636366" }}>
            <tr
              style={{
                borderLeft: "1px solid #636366",
                height: "2.9rem",
                marginTop: "5px",
              }}
            >
              {" "}
              {arr.map((item) =>
                availabilityOnlineHours.map((day) =>
                  day.day === "Sunday" ? (
                    <td
                      style={{
                        padding: "5px",
                        width: "5rem",
                        // height: "3rem",
                        borderLeft: "1px solid #636366",
                        backgroundColor: getBackgroundColorAvailable(item, day),
                      }}
                    ></td>
                  ) : (
                    ""
                  )
                )
              )}
            </tr>
            <tr
              style={{
                borderLeft: "1px solid #636366",
                height: "2.9rem",
                marginTop: "5px",
              }}
            >
              {" "}
              {arr.map((item) =>
                availabilityOnlineHours.map((day) =>
                  day.day === "Monday" ? (
                    <td
                      style={{
                        padding: "5px",
                        width: "5rem",
                        // height: "3rem",
                        borderLeft: "1px solid #636366",
                        backgroundColor: getBackgroundColorAvailable(item, day),
                      }}
                    ></td>
                  ) : (
                    ""
                  )
                )
              )}
            </tr>
            <tr
              style={{
                borderLeft: "1px solid #636366",
                height: "2.9rem",
                marginTop: "5px",
              }}
            >
              {" "}
              {arr.map((item) =>
                availabilityOnlineHours.map((day) =>
                  day.day === "Tuesday" ? (
                    <td
                      style={{
                        padding: "5px",
                        width: "5rem",
                        // height: "3rem",
                        borderLeft: "1px solid #636366",
                        backgroundColor: getBackgroundColorAvailable(item, day),
                      }}
                    ></td>
                  ) : (
                    ""
                  )
                )
              )}
            </tr>
            <tr
              style={{
                borderLeft: "1px solid #636366",
                height: "2.9rem",
                marginTop: "5px",
              }}
            >
              {" "}
              {arr.map((item) =>
                availabilityOnlineHours.map((day) =>
                  day.day === "Wednesday" ? (
                    <td
                      style={{
                        padding: "5px",
                        width: "5rem",
                        // height: "3rem",
                        borderLeft: "1px solid #636366",
                        backgroundColor: getBackgroundColorAvailable(item, day),
                      }}
                    ></td>
                  ) : (
                    ""
                  )
                )
              )}
            </tr>
            <tr
              style={{
                borderLeft: "1px solid #636366",
                height: "2.9rem",
                marginTop: "5px",
              }}
            >
              {" "}
              {arr.map((item) =>
                availabilityOnlineHours.map((day) =>
                  day.day === "Wednesday" ? (
                    <td
                      style={{
                        padding: "5px",
                        width: "5rem",
                        // height: "3rem",
                        borderLeft: "1px solid #636366",
                        backgroundColor: getBackgroundColorAvailable(item, day),
                      }}
                    ></td>
                  ) : (
                    ""
                  )
                )
              )}
            </tr>
            <tr
              style={{
                borderLeft: "1px solid #636366",
                height: "2.9rem",
                marginTop: "5px",
              }}
            >
              {" "}
              {arr.map((item) =>
                availabilityOnlineHours.map((day) =>
                  day.day === "Friday" ? (
                    <td
                      style={{
                        padding: "5px",
                        width: "5rem",
                        // height: "3rem",
                        borderLeft: "1px solid #636366",
                        backgroundColor: getBackgroundColorAvailable(item, day),
                      }}
                    ></td>
                  ) : (
                    ""
                  )
                )
              )}
            </tr>
            <tr
              style={{
                borderLeft: "1px solid #636366",
                height: "2.9rem",
                marginTop: "5px",
              }}
            >
              {" "}
              {arr.map((item) =>
                availabilityOnlineHours.map((day) =>
                  day.day === "Saturday" ? (
                    <td
                      style={{
                        padding: "5px",
                        width: "5rem",
                        // height: "3rem",
                        borderLeft: "1px solid #636366",
                        backgroundColor: getBackgroundColorAvailable(item, day),
                      }}
                    ></td>
                  ) : (
                    ""
                  )
                )
              )}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  const timeDisplayOffice = () => {
    //this essentially creates the time row
    let arr = [];

    for (let i = 6; i < 24; ++i) {
      arr.push(
        i === 0
          ? "12AM"
          : i === 12
          ? i + "PM"
          : i > 11
          ? i - 12 + "PM"
          : i + "AM"
      );
    }
    // console.log(arr);
    // console.log(Object.values(availabilityOfficeHours));
    return (
      <div style={{ width: "80%" }}>
        <table>
          <thead>
            <tr>
              {arr.map((item) => (
                <td
                  style={{
                    padding: "5px",
                    width: "5rem",
                    font: "normal normal normal 12px/14px SF Pro Display",
                  }}
                >
                  {item}
                </td>
              ))}
            </tr>
          </thead>
          <tbody style={{ borderLeft: "1px solid #636366" }}>
            <tr
              style={{
                borderLeft: "1px solid #636366",
                height: "2.9rem",
                marginTop: "5px",
              }}
            >
              {" "}
              {arr.map((item) =>
                availabilityOfficeHours.map((day) =>
                  day.day === "Sunday" ? (
                    <td
                      style={{
                        padding: "5px",
                        width: "5rem",
                        // height: "3rem",
                        borderLeft: "1px solid #636366",
                        backgroundColor: getBackgroundColorAvailable(item, day),
                      }}
                    ></td>
                  ) : (
                    ""
                  )
                )
              )}
            </tr>
            <tr
              style={{
                borderLeft: "1px solid #636366",
                height: "2.9rem",
                marginTop: "5px",
              }}
            >
              {" "}
              {arr.map((item) =>
                availabilityOfficeHours.map((day) =>
                  day.day === "Monday" ? (
                    <td
                      style={{
                        padding: "5px",
                        width: "5rem",
                        // height: "3rem",
                        borderLeft: "1px solid #636366",
                        backgroundColor: getBackgroundColorAvailable(item, day),
                      }}
                    ></td>
                  ) : (
                    ""
                  )
                )
              )}
            </tr>
            <tr
              style={{
                borderLeft: "1px solid #636366",
                height: "2.9rem",
                marginTop: "5px",
              }}
            >
              {" "}
              {arr.map((item) =>
                availabilityOfficeHours.map((day) =>
                  day.day === "Tuesday" ? (
                    <td
                      style={{
                        padding: "5px",
                        width: "5rem",
                        // height: "3rem",
                        borderLeft: "1px solid #636366",
                        backgroundColor: getBackgroundColorAvailable(item, day),
                      }}
                    ></td>
                  ) : (
                    ""
                  )
                )
              )}
            </tr>
            <tr
              style={{
                borderLeft: "1px solid #636366",
                height: "2.9rem",
                marginTop: "5px",
              }}
            >
              {" "}
              {arr.map((item) =>
                availabilityOfficeHours.map((day) =>
                  day.day === "Wednesday" ? (
                    <td
                      style={{
                        padding: "5px",
                        width: "5rem",
                        // height: "3rem",
                        borderLeft: "1px solid #636366",
                        backgroundColor: getBackgroundColorAvailable(item, day),
                      }}
                    ></td>
                  ) : (
                    ""
                  )
                )
              )}
            </tr>
            <tr
              style={{
                borderLeft: "1px solid #636366",
                height: "2.9rem",
                marginTop: "5px",
              }}
            >
              {" "}
              {arr.map((item) =>
                availabilityOfficeHours.map((day) =>
                  day.day === "Wednesday" ? (
                    <td
                      style={{
                        padding: "5px",
                        width: "5rem",
                        // height: "3rem",
                        borderLeft: "1px solid #636366",
                        backgroundColor: getBackgroundColorAvailable(item, day),
                      }}
                    ></td>
                  ) : (
                    ""
                  )
                )
              )}
            </tr>
            <tr
              style={{
                borderLeft: "1px solid #636366",
                height: "2.9rem",
                marginTop: "5px",
              }}
            >
              {" "}
              {arr.map((item) =>
                availabilityOfficeHours.map((day) =>
                  day.day === "Friday" ? (
                    <td
                      style={{
                        padding: "5px",
                        width: "5rem",
                        // height: "3rem",
                        borderLeft: "1px solid #636366",
                        backgroundColor: getBackgroundColorAvailable(item, day),
                      }}
                    ></td>
                  ) : (
                    ""
                  )
                )
              )}
            </tr>
            <tr
              style={{
                borderLeft: "1px solid #636366",
                height: "2.9rem",
                marginTop: "5px",
              }}
            >
              {" "}
              {arr.map((item) =>
                availabilityOfficeHours.map((day) =>
                  day.day === "Saturday" ? (
                    <td
                      style={{
                        padding: "5px",
                        width: "5rem",
                        // height: "3rem",
                        borderLeft: "1px solid #636366",
                        backgroundColor: getBackgroundColorAvailable(item, day),
                      }}
                    ></td>
                  ) : (
                    ""
                  )
                )
              )}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  return (
    <div className={classes.container}>
      <ScrollToTop />
      {/* <div className="Card"> */}
      <div className={classes.weekDiv}>
        <Row className={classes.colHeader}>
          <Row className={classes.cardTitle} style={{ margin: "2rem" }}>
            <Col>Online Availability Hours</Col>
          </Row>
          <Row
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Col
              style={{
                display: "flex",
                flexDirection: "row",
                width: "80%",
              }}
            >
              <Col className={classes.colData} style={{ width: "50%" }}>
                Days of the Week
              </Col>
              <Col className={classes.colData} style={{ width: "30%" }}>
                Morning Hours
              </Col>
              <Col className={classes.colData} style={{ width: "30%" }}>
                Afternoon Hours
              </Col>
            </Col>
            <Col
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            ></Col>
          </Row>
          <Row
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                width: "50%",
              }}
            >
              <Row className={classes.colTitle}>
                <Col className={classes.colData} style={{ width: "10%" }}>
                  <label htmlFor="sunday">Sunday</label>
                </Col>
                <Col className={classes.colData}>
                  {availabilityOnlineHours.map((day, idx) =>
                    day.day === "Sunday" ? (
                      <Row className={classes.colData}>
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="sunday"
                            name="morning_start_time"
                            defaultValue={day.morning_start_time}
                            onChange={(e) => handleSundayUpdateOnline(e, idx)}
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="sunday"
                            name="morning_end_time"
                            defaultValue={day.morning_end_time}
                            onChange={(e) => handleSundayUpdateOnline(e, idx)}
                          />
                        </Col>
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="sunday"
                            name="afternoon_start_time"
                            defaultValue={day.afternoon_start_time}
                            onChange={(e) => handleSundayUpdateOnline(e, idx)}
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="sunday"
                            name="afternoon_end_time"
                            defaultValue={day.afternoon_end_time}
                            onChange={(e) => handleSundayUpdateOnline(e, idx)}
                          />
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )
                  )}
                </Col>
              </Row>
              <Row className={classes.colTitle}>
                <Col className={classes.colData} style={{ width: "10%" }}>
                  <label htmlFor="monday">Monday</label>
                </Col>
                <Col className={classes.colData}>
                  {availabilityOnlineHours.map((day, idx) =>
                    day.day === "Monday" ? (
                      <Row className={classes.colData}>
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="monday"
                            name="morning_start_time"
                            defaultValue={day.morning_start_time}
                            onChange={(e) => handleMondayUpdateOnline(e, idx)}
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="monday"
                            name="morning_end_time"
                            defaultValue={day.morning_end_time}
                            onChange={(e) => handleMondayUpdateOnline(e, idx)}
                          />
                        </Col>{" "}
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="monday"
                            name="afternoon_start_time"
                            defaultValue={day.afternoon_start_time}
                            onChange={(e) => handleMondayUpdateOnline(e, idx)}
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="monday"
                            name="afternoon_end_time"
                            defaultValue={day.afternoon_end_time}
                            onChange={(e) => handleMondayUpdateOnline(e, idx)}
                          />
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )
                  )}
                </Col>
              </Row>
              <Row className={classes.colTitle}>
                <Col className={classes.colData} style={{ width: "10%" }}>
                  <label htmlFor="tuesday">Tuesday</label>
                </Col>
                <Col className={classes.colData}>
                  {availabilityOnlineHours.map((day, idx) =>
                    day.day === "Tuesday" ? (
                      <Row className={classes.colData}>
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="tuesday"
                            name="morning_start_time"
                            defaultValue={day.morning_start_time}
                            onChange={(e) => handleTuesdayUpdateOnline(e, idx)}
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="tuesday"
                            name="morning_end_time"
                            defaultValue={day.morning_end_time}
                            onChange={(e) => handleTuesdayUpdateOnline(e, idx)}
                          />
                        </Col>{" "}
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="tuesday"
                            name="afternoon_start_time"
                            defaultValue={day.afternoon_start_time}
                            onChange={(e) => handleTuesdayUpdateOnline(e, idx)}
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="tuesday"
                            name="afternoon_end_time"
                            defaultValue={day.afternoon_end_time}
                            onChange={(e) => handleTuesdayUpdateOnline(e, idx)}
                          />
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )
                  )}
                </Col>
              </Row>
              <Row className={classes.colTitle}>
                <Col className={classes.colData} style={{ width: "10%" }}>
                  <label htmlFor="wednesday">Wednesday</label>
                </Col>
                <Col className={classes.colData}>
                  {availabilityOnlineHours.map((day, idx) =>
                    day.day === "Wednesday" ? (
                      <Row className={classes.colData}>
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="wednesday"
                            name="morning_start_time"
                            defaultValue={day.morning_start_time}
                            onChange={(e) =>
                              handleWednesdayUpdateOnline(e, idx)
                            }
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="wednesday"
                            name="morning_end_time"
                            defaultValue={day.morning_end_time}
                            onChange={(e) =>
                              handleWednesdayUpdateOnline(e, idx)
                            }
                          />
                        </Col>{" "}
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="wednesday"
                            name="afternoon_start_time"
                            defaultValue={day.afternoon_start_time}
                            onChange={(e) =>
                              handleWednesdayUpdateOnline(e, idx)
                            }
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="wednesday"
                            name="afternoon_end_time"
                            defaultValue={day.afternoon_end_time}
                            onChange={(e) =>
                              handleWednesdayUpdateOnline(e, idx)
                            }
                          />
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )
                  )}
                </Col>
              </Row>
              <Row className={classes.colTitle}>
                <Col className={classes.colData} style={{ width: "10%" }}>
                  <label htmlFor="thursday">Thursday</label>
                </Col>
                <Col className={classes.colData}>
                  {availabilityOnlineHours.map((day, idx) =>
                    day.day === "Thursday" ? (
                      <Row className={classes.colData}>
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="thursday"
                            name="morning_start_time"
                            defaultValue={day.morning_start_time}
                            onChange={(e) => handleThursdayUpdateOnline(e, idx)}
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="thursday"
                            name="morning_end_time"
                            defaultValue={day.morning_end_time}
                            onChange={(e) => handleThursdayUpdateOnline(e, idx)}
                          />
                        </Col>{" "}
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="thursday"
                            name="afternoon_start_time"
                            defaultValue={day.afternoon_start_time}
                            onChange={(e) => handleThursdayUpdateOnline(e, idx)}
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="thursday"
                            name="afternoon_end_time"
                            defaultValue={day.afternoon_end_time}
                            onChange={(e) => handleThursdayUpdateOnline(e, idx)}
                          />
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )
                  )}
                </Col>
              </Row>
              <Row className={classes.colTitle}>
                <Col className={classes.colData} style={{ width: "10%" }}>
                  <label htmlFor="friday">Friday</label>
                </Col>
                <Col className={classes.colData}>
                  {availabilityOnlineHours.map((day, idx) =>
                    day.day === "Friday" ? (
                      <Row className={classes.colData}>
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="friday"
                            name="morning_start_time"
                            defaultValue={day.morning_start_time}
                            onChange={(e) => handleFridayUpdateOnline(e, idx)}
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="friday"
                            name="morning_end_time"
                            defaultValue={day.morning_end_time}
                            onChange={(e) => handleFridayUpdateOnline(e, idx)}
                          />
                        </Col>{" "}
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="friday"
                            name="afternoon_start_time"
                            defaultValue={day.afternoon_start_time}
                            onChange={(e) => handleFridayUpdateOnline(e, idx)}
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="friday"
                            name="afternoon_end_time"
                            defaultValue={day.afternoon_end_time}
                            onChange={(e) => handleFridayUpdateOnline(e, idx)}
                          />
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )
                  )}
                </Col>
              </Row>
              <Row className={classes.colTitle}>
                <Col className={classes.colData} style={{ width: "10%" }}>
                  <label htmlFor="saturday">Saturday</label>
                </Col>
                <Col className={classes.colData}>
                  {availabilityOnlineHours.map((day, idx) =>
                    day.day === "Saturday" ? (
                      <Row className={classes.colData}>
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="saturday"
                            name="morning_start_time"
                            defaultValue={day.morning_start_time}
                            onChange={(e) => handleSaturdayUpdateOnline(e, idx)}
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="saturday"
                            name="morning_end_time"
                            defaultValue={day.morning_end_time}
                            onChange={(e) => handleSaturdayUpdateOnline(e, idx)}
                          />
                        </Col>{" "}
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="saturday"
                            name="afternoon_start_time"
                            defaultValue={day.afternoon_start_time}
                            onChange={(e) => handleSaturdayUpdateOnline(e, idx)}
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="saturday"
                            name="afternoon_end_time"
                            defaultValue={day.afternoon_end_time}
                            onChange={(e) => handleSaturdayUpdateOnline(e, idx)}
                          />
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )
                  )}
                </Col>
              </Row>
            </Col>
            {isLoading ? (
              <Col
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "50%",
                }}
              >
                <h1>Loading</h1>
              </Col>
            ) : (
              <Col
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "50%",
                }}
              >
                {timeDisplayOnline()}
              </Col>
            )}
          </Row>
          <Row>
            <Button
              style={{
                backgroundColor: "#d3a625",
                color: "white",
                marginTop: "1rem",
              }}
              onClick={updateOnlineHours}
            >
              Update Online Hours
            </Button>{" "}
          </Row>
        </Row>
      </div>
      <div className={classes.weekDiv}>
        <Row className={classes.colHeader}>
          <Row className={classes.cardTitle} style={{ margin: "2rem" }}>
            Office Availability Hours
          </Row>
          <Row
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Col
              style={{
                display: "flex",
                flexDirection: "row",
                width: "80%",
              }}
            >
              <Col className={classes.colData} style={{ width: "50%" }}>
                Days of the Week
              </Col>
              <Col className={classes.colData} style={{ width: "30%" }}>
                Morning Hours
              </Col>
              <Col className={classes.colData} style={{ width: "30%" }}>
                Afternoon Hours
              </Col>
            </Col>
            <Col
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            ></Col>
          </Row>
          <Row
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                width: "50%",
              }}
            >
              <Row className={classes.colTitle}>
                <Col className={classes.colData} style={{ width: "10%" }}>
                  <label htmlFor="sunday">Sunday</label>
                </Col>

                <Col className={classes.colData}>
                  {availabilityOfficeHours.map((day, idx) =>
                    day.day === "Sunday" ? (
                      <Row className={classes.colData}>
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="sunday"
                            name="morning_start_time"
                            defaultValue={day.morning_start_time}
                            onChange={(e) => handleSundayUpdateOffice(e, idx)}
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="sunday"
                            name="morning_end_time"
                            defaultValue={day.morning_end_time}
                            onChange={(e) => handleSundayUpdateOffice(e, idx)}
                          />
                        </Col>{" "}
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="sunday"
                            name="afternoon_start_time"
                            defaultValue={day.afternoon_start_time}
                            onChange={(e) => handleSundayUpdateOffice(e, idx)}
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="sunday"
                            name="afternoon_end_time"
                            defaultValue={day.afternoon_end_time}
                            onChange={(e) => handleSundayUpdateOffice(e, idx)}
                          />
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )
                  )}
                </Col>
              </Row>
              <Row className={classes.colTitle}>
                <Col className={classes.colData} style={{ width: "10%" }}>
                  <label htmlFor="monday">Monday</label>
                </Col>
                <Col className={classes.colData}>
                  {availabilityOfficeHours.map((day, idx) =>
                    day.day === "Monday" ? (
                      <Row className={classes.colData}>
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="monday"
                            name="morning_start_time"
                            defaultValue={day.morning_start_time}
                            onChange={(e) => handleMondayUpdateOffice(e, idx)}
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="monday"
                            name="morning_end_time"
                            defaultValue={day.morning_end_time}
                            onChange={(e) => handleMondayUpdateOffice(e, idx)}
                          />
                        </Col>{" "}
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="monday"
                            name="afternoon_start_time"
                            defaultValue={day.afternoon_start_time}
                            onChange={(e) => handleMondayUpdateOffice(e, idx)}
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="monday"
                            name="afternoon_end_time"
                            defaultValue={day.afternoon_end_time}
                            onChange={(e) => handleMondayUpdateOffice(e, idx)}
                          />
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )
                  )}
                </Col>
              </Row>
              <Row className={classes.colTitle}>
                <Col className={classes.colData} style={{ width: "10%" }}>
                  <label htmlFor="tuesday">Tuesday</label>
                </Col>
                <Col className={classes.colData}>
                  {availabilityOfficeHours.map((day, idx) =>
                    day.day === "Tuesday" ? (
                      <Row className={classes.colData}>
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="tuesday"
                            name="morning_start_time"
                            defaultValue={day.morning_start_time}
                            onChange={(e) => handleTuesdayUpdateOffice(e, idx)}
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="tuesday"
                            name="morning_end_time"
                            defaultValue={day.morning_end_time}
                            onChange={(e) => handleTuesdayUpdateOffice(e, idx)}
                          />
                        </Col>{" "}
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="tuesday"
                            name="afternoon_start_time"
                            defaultValue={day.afternoon_start_time}
                            onChange={(e) => handleTuesdayUpdateOffice(e, idx)}
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="tuesday"
                            name="afternoon_end_time"
                            defaultValue={day.afternoon_end_time}
                            onChange={(e) => handleTuesdayUpdateOffice(e, idx)}
                          />
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )
                  )}
                </Col>
              </Row>
              <Row className={classes.colTitle}>
                <Col className={classes.colData} style={{ width: "10%" }}>
                  <label htmlFor="wednesday">Wednesday</label>
                </Col>
                <Col className={classes.colData}>
                  {availabilityOfficeHours.map((day, idx) =>
                    day.day === "Wednesday" ? (
                      <Row className={classes.colData}>
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="wednesday"
                            name="morning_start_time"
                            defaultValue={day.morning_start_time}
                            onChange={(e) =>
                              handleWednesdayUpdateOffice(e, idx)
                            }
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="wednesday"
                            name="morning_end_time"
                            defaultValue={day.morning_end_time}
                            onChange={(e) =>
                              handleWednesdayUpdateOffice(e, idx)
                            }
                          />
                        </Col>{" "}
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="wednesday"
                            name="afternoon_start_time"
                            defaultValue={day.afternoon_start_time}
                            onChange={(e) =>
                              handleWednesdayUpdateOffice(e, idx)
                            }
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="wednesday"
                            name="afternoon_end_time"
                            defaultValue={day.afternoon_end_time}
                            onChange={(e) =>
                              handleWednesdayUpdateOffice(e, idx)
                            }
                          />
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )
                  )}
                </Col>
              </Row>
              <Row className={classes.colTitle}>
                <Col className={classes.colData} style={{ width: "10%" }}>
                  <label htmlFor="thursday">Thursday</label>
                </Col>
                <Col className={classes.colData}>
                  {availabilityOfficeHours.map((day, idx) =>
                    day.day === "Thursday" ? (
                      <Row className={classes.colData}>
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="thursday"
                            name="morning_start_time"
                            defaultValue={day.morning_start_time}
                            onChange={(e) => handleThursdayUpdateOffice(e, idx)}
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="thursday"
                            name="morning_end_time"
                            defaultValue={day.morning_end_time}
                            onChange={(e) => handleThursdayUpdateOffice(e, idx)}
                          />
                        </Col>{" "}
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="thursday"
                            name="afternoon_start_time"
                            defaultValue={day.afternoon_start_time}
                            onChange={(e) => handleThursdayUpdateOffice(e, idx)}
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="thursday"
                            name="afternoon_end_time"
                            defaultValue={day.afternoon_end_time}
                            onChange={(e) => handleThursdayUpdateOffice(e, idx)}
                          />
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )
                  )}
                </Col>
              </Row>
              <Row className={classes.colTitle}>
                <Col className={classes.colData} style={{ width: "10%" }}>
                  <label htmlFor="friday">Friday</label>
                </Col>
                <Col className={classes.colData}>
                  {availabilityOfficeHours.map((day, idx) =>
                    day.day === "Friday" ? (
                      <Row className={classes.colData}>
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="friday"
                            name="morning_start_time"
                            defaultValue={day.morning_start_time}
                            onChange={(e) => handleFridayUpdateOffice(e, idx)}
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="friday"
                            name="morning_end_time"
                            defaultValue={day.morning_end_time}
                            onChange={(e) => handleFridayUpdateOffice(e, idx)}
                          />
                        </Col>{" "}
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="friday"
                            name="afternoon_start_time"
                            defaultValue={day.afternoon_start_time}
                            onChange={(e) => handleFridayUpdateOffice(e, idx)}
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="friday"
                            name="afternoon_end_time"
                            defaultValue={day.afternoon_end_time}
                            onChange={(e) => handleFridayUpdateOffice(e, idx)}
                          />
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )
                  )}
                </Col>
              </Row>
              <Row className={classes.colTitle}>
                <Col className={classes.colData} style={{ width: "10%" }}>
                  <label htmlFor="saturday">Saturday</label>
                </Col>
                <Col className={classes.colData}>
                  {availabilityOfficeHours.map((day, idx) =>
                    day.day === "Saturday" ? (
                      <Row className={classes.colData}>
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="saturday"
                            name="morning_start_time"
                            defaultValue={day.morning_start_time}
                            onChange={(e) => handleSaturdayUpdateOffice(e, idx)}
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="saturday"
                            name="morning_end_time"
                            defaultValue={day.morning_end_time}
                            onChange={(e) => handleSaturdayUpdateOffice(e, idx)}
                          />
                        </Col>{" "}
                        <Col className={classes.colData}>
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="saturday"
                            name="afternoon_start_time"
                            defaultValue={day.afternoon_start_time}
                            onChange={(e) => handleSaturdayUpdateOffice(e, idx)}
                          />
                          &nbsp; - &nbsp;
                          <input
                            className={classes.colDataTime}
                            type="time"
                            step="2"
                            id="saturday"
                            name="afternoon_end_time"
                            defaultValue={day.afternoon_end_time}
                            onChange={(e) => handleSaturdayUpdateOffice(e, idx)}
                          />
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )
                  )}
                </Col>
              </Row>
            </Col>
            {isLoading ? (
              <Col
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "50%",
                }}
              >
                <h1>Loading</h1>
              </Col>
            ) : (
              <Col
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "50%",
                }}
              >
                {timeDisplayOffice()}
              </Col>
            )}
          </Row>
          <Row>
            <Button
              style={{
                backgroundColor: "#d3a625",
                color: "white",
                marginTop: "1rem",
              }}
              onClick={updateOfficeHours}
            >
              Update Office Hours
            </Button>
          </Row>
        </Row>
      </div>
      <div className={classes.weekDiv}>
        <Row className={classes.colHeader}>
          <Col
            style={{
              width: "80%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Row className={classes.cardTitle} style={{ margin: "1rem" }}>
              Upcoming Time Off
            </Row>
            <table style={{ width: "90%", border: "1px solid black" }}>
              <thead style={{ border: "1px solid black" }}>
                <tr
                  className={classes.colTitle}
                  style={{ border: "1px solid black" }}
                >
                  <th className={classes.tableCells}>Date</th>
                  <th className={classes.tableCells}>Start Time</th>
                  <th className={classes.tableCells}>End Time</th>
                  <th className={classes.tableCells}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {unavailability.map((time) => (
                  <tr
                    className={classes.colTitle}
                    style={{ border: "1px solid black" }}
                  >
                    <td className={classes.tableCells}>{time.date}</td>
                    <td className={classes.tableCells}>
                      {edit ? (
                        <input
                          type="time"
                          step="2"
                          id="start_time_notavailable"
                          name="start_time_notavailable"
                          defaultValue={time.start_time_notavailable}
                          onChange={(e) => setStartTime(e.target.value)}
                        />
                      ) : (
                        time.start_time_notavailable
                      )}
                    </td>
                    <td className={classes.tableCells}>
                      {edit ? (
                        <input
                          type="time"
                          step="2"
                          id="end_time_notavailable"
                          name="end_time_notavailable"
                          defaultValue={time.end_time_notavailable}
                          onChange={(e) => setEndTime(e.target.value)}
                        />
                      ) : (
                        time.end_time_notavailable
                      )}
                    </td>
                    <td className={classes.tableCells}>
                      <DeleteForeverSharpIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleOpenDelete();
                          setSelectedUnavailable(time);
                        }}
                      />
                      <EditSharpIcon
                        size="lg"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          edit ? handleUpdate(time) : setEdit(!edit);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Row className={classes.cardTitle} style={{ margin: "1rem" }}>
              <button
                onClick={() => {
                  handleOpen();
                }}
              >
                Add Time Off
              </button>
            </Row>
          </Col>
        </Row>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Time Off
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
            }}
          >
            <label for="date" className={classes.formLabels}>
              Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={dateUnavailable}
              onChange={(e) => setDateUnavailable(e.target.value)}
              style={{ width: "50%", margin: "1rem" }}
            />

            <label for="stime" className={classes.formLabels}>
              Start Time:
            </label>
            <input
              type="time"
              id="stime"
              name="stime"
              step="2"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={{ width: "50%", margin: "1rem" }}
            />
            <label for="etime" className={classes.formLabels}>
              End Time:
            </label>
            <input
              type="time"
              id="etime"
              name="etime"
              step="2"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              style={{ width: "50%", margin: "1rem" }}
            />

            <button
              className={classes.formButton}
              onClick={() => addUnavailability()}
            >
              Submit
            </button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete time off for{" "}
            {selectedUnavailable.date} from{" "}
            {selectedUnavailable.start_time_notavailable} to{" "}
            {selectedUnavailable.end_time_notavailable}?
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
            }}
          >
            <button
              className={classes.formButton}
              onClick={() => handleDelete(selectedUnavailable.prac_avail_uid)}
            >
              Submit
            </button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Practioner Availability Hours Updated
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
            }}
          >
            <button
              className={classes.formButton}
              onClick={() => handleCloseUpdate()}
            >
              Close
            </button>
          </div>
        </Box>
      </Modal>
    </div>
    // </div>
  );
}

export default Availability;
