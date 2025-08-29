import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { useParams } from "react-router";
import { Radio } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import moment from "moment";
import "moment-timezone";
import Grid from "@material-ui/core/Grid";
import Calendar from "react-calendar";
import { MyContext } from "../App";
import ScrollToTop from "../Blog/ScrollToTop";
import "./calendar.css";
import "../Appointment/AppointmentPage.css";

// Timezone utility functions
const getUserTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

const convertToPST = (localTime, localDate) => {
  // Create a moment object in the user's local timezone
  const localDateTime = moment.tz(localDate + "T" + localTime, getUserTimezone());
  // Convert to PST
  const pstDateTime = localDateTime.tz("America/Los_Angeles");
  return pstDateTime.format("HH:mm:ss");
};

const convertFromPST = (pstTime, date) => {
  // Create a moment object in PST
  const pstDateTime = moment.tz(date + "T" + pstTime, "America/Los_Angeles");
  // Convert to user's local timezone
  const localDateTime = pstDateTime.tz(getUserTimezone());
  return localDateTime.format("HH:mm:ss");
};

const getTimezoneAbbreviation = () => {
  const tz = getUserTimezone();
  if (tz.includes("America/New_York")) return "EST";
  if (tz.includes("America/Chicago")) return "CST";
  if (tz.includes("America/Denver")) return "MST";
  if (tz.includes("America/Los_Angeles")) return "PST";
  return tz.replace("America/", "").replace("_", "");
};

const YellowRadio = withStyles({
  root: {
    color: "#D3A625",
    "&$checked": {
      color: "#D3A625",
    },
  },
  checked: {},
})((props) => <Radio color='default' {...props} />);

const useStyles = makeStyles({
  calendarBox: {
    marginLeft: "2rem",
    width: "80%",
    "@media (max-width: 500px)": {
      marginLeft: "0rem",
      width: "100%",
    },
  },

  calDisabled: {
    pointerEvents: "none",
  },

  timeslotButton: {
    width: "10rem",
    height: "3rem",
    maxWidth: "80%",
    backgroundColor: "white",
    border: "2px solid #D3A625",
    color: "#D3A625",
    // padding: "15px 90px",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "20px",
    borderRadius: "50px",
    display: "block",
    margin: "6px auto",

    "&:hover": {
      background: "#D3A625",
      color: "white",
    },
    "&:focus": {
      background: "#D3A625",
      color: "white",
      outline: "none",
      boxShadow: "none",
    },
    "&:active": {
      background: "#D3A625",
      color: "white",
      outline: "none",
      boxShadow: "none",
    },
  },
});
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
// console.log("API_KEY last four: ", API_KEY.substring(API_KEY.length - 4));

export default function AppointmentPage(props) {
  console.log("In AppointmentPage.jsx", props);
  const [accessToken, setAccessToken] = useState("");
  // console.log("(AppointmentPage) accessToken: ", accessToken);
  const classes = useStyles();
  const history = useHistory();
  const { treatmentID } = useParams();
  // form use states, Axios.Post
  const [selectedTime, setSelectedTime] = useState(null);
  const [mode, setMode] = useState({
    inPerson: true,
    online: false,
  });
  const [attendMode, setAttendMode] = useState("In-Person");
  // const [bookNowClicked, setBookNowClicked] = useState(false);
  const [bookNowClicked, setBookNowClicked] = useState(true);
  const [timeSelected, setTimeSelected] = useState(false);
  //import context
  const { serviceArr, servicesLoaded } = useContext(MyContext);
  const [elementToBeRendered, setElementToBeRendered] = useState([]);
  const treatment_uid = treatmentID;

  // useEffect to set the duration for the selected service
  useEffect(() => {
    console.log("Effect ran with:", { servicesLoaded, serviceArr, treatmentID });
    if (servicesLoaded && serviceArr.length > 0) {
      const selectedService = serviceArr.find((s) => s.treatment_uid === treatmentID);
      if (selectedService) {
        setElementToBeRendered(selectedService);
        duration.current = selectedService.duration;
        console.log("Selected service:", selectedService);
        console.log("Duration set to:", duration.current);
      } else {
        console.log("No service found for treatmentID:", treatmentID);
      }
    }
  }, [servicesLoaded, serviceArr, treatmentID]);

  useEffect(() => {
    if (servicesLoaded && elementToBeRendered) {
      console.log("Effect triggered. Fetching access token...");

      getAccessToken()
        .then((at) => {
          console.log("Access token received:", at);
          setAccessToken(at);
        })
        .catch((err) => {
          console.error("Failed to get access token:", err);
        });
    }
  }, [servicesLoaded, elementToBeRendered]);

  // console.log("(AppointmentPage) accessToken2: ", accessToken);
  var currentDate = new Date(+new Date() + 86400000);
  const [date, setDate] = useState(currentDate);
  const [minDate, setMinDate] = useState(currentDate);
  const [dateString, setDateString] = useState(null);
  const [dateHasBeenChanged, setDateHasBeenChanged] = useState(false);
  const [dateString1, setDateString1] = useState(null);
  const doubleDigitMonth = (date) => {
    let str = "00" + (date.getMonth() + 1);
    return str.substring(str.length - 2);
  };

  const doubleDigitDay = (date) => {
    let str = "00" + date.getDate();
    return str.substring(str.length - 2);
  };

  // This one is for
  const dateFormat1 = (date) => {
    return doubleDigitMonth(date) + "/" + doubleDigitDay(date) + "/" + date.getFullYear();
  };

  // This one is for the timeslotAPI call
  const dateFormat2 = (date) => {
    var months = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
      "": "",
    };
    console.log("dateformat2", date);
    console.log("dateformat2", months[doubleDigitMonth(date)] + " " + doubleDigitDay(date) + ", " + date.getFullYear() + " ");
    return months[doubleDigitMonth(date)] + " " + doubleDigitDay(date) + ", " + date.getFullYear() + " ";
  };

  const dateStringChange = (date) => {
    setDateString(dateFormat1(date));
    setApiDateString(dateFormat3(date));
    setDateString1(dateFormat2(date));
    setDateHasBeenChanged(!dateHasBeenChanged);
  };
  // This one is for doing the sendToDatabase Post Call
  const dateFormat3 = (date) => {
    // console.log("dateformat3", date);
    // console.log("dateformat3", date.getFullYear() + "-" + doubleDigitMonth(date) + "-" + doubleDigitDay(date));
    return date.getFullYear() + "-" + doubleDigitMonth(date) + "-" + doubleDigitDay(date);
  };
  const [apiDateString, setApiDateString] = useState(dateFormat3(currentDate));
  const [timeSlots, setTimeSlots] = useState([]);
  const [timeAASlots, setTimeAASlots] = useState([]);
  const duration = useRef(null);
  const [buttonSelect, setButtonSelect] = useState(false);
  const [selectedButton, setSelectedButton] = useState("");
  const isFirstLoad = useRef(true);
  const [isCalDisabled, setCalDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  let location = useLocation();
  let addons = [];
  if (location.state !== undefined) {
    addons = location.state;
  }
  const addons_list = () => {
    const addon_list = [];
    for (let i = 0; i < addons.length; i++) {
      if (addons[i].selected) {
        const addon_uid = addons[i].therapy;
        for (let j = 0; j < serviceArr.length; j++) {
          const service = serviceArr[j];
          if (addon_uid === service.treatment_uid) {
            addon_list.push(service);
          }
        }
      }
    }
    return addon_list;
  };

  const getTotalCost = () => {
    let total = 0;
    serviceArr.forEach((service) => {
      if (service.treatment_uid === treatment_uid) {
        total += costToInt(service.cost);
      }
    });
    addons_list().forEach((addon) => {
      total += costToInt(addon.addon_cost);
    });
    return total;
  };
  const getTotalDuration = () => {
    let total = 0;
    serviceArr.forEach((service) => {
      if (service.treatment_uid === treatment_uid) {
        total += hoursToSeconds(service.duration);
      }
    });
    addons_list().forEach((addon) => {
      total += hoursToSeconds(addon.duration);
    });
    return secondsToHours(total);
  };
  console.log("Addons list: ", addons_list());

  const totalCost = getTotalCost();
  const totalDuration = getTotalDuration();

  function hoursToSeconds(value) {
    const splitedValue = value.split(":");
    return parseInt(splitedValue[0]) * (60 * 60) + parseInt(splitedValue[1]) * 60 + parseInt(splitedValue[2]) + 1;
  }
  function secondsToHours(value) {
    const hour = Math.floor(value / (60 * 60));
    const min = Math.floor((value % (60 * 60)) / 60);
    const sec = (value % (60 * 60)) % 60;
    return hour + ":" + min + ":" + sec;
  }
  function costToInt(cost_str) {
    return parseInt(cost_str.slice(1));
  }
  function durationToString(duration) {
    const splitedValue = duration.split(":");
    const hour = parseInt(splitedValue[0]);
    const min = parseInt(splitedValue[1]);
    const sec = parseInt(splitedValue[2]);
    let output = "";
    output += hour !== 0 ? hour + "hr " : "";
    output += min !== 0 ? min + "min " : "";
    output += sec !== 0 ? sec + "sec " : "";
    return output;
  }

  function convert(value) {
    var a = value.split(":"); // split it at the colons

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];

    return seconds + 1;
  }

  // parse duration
  const parseDuration = (rawDuration) => {
    if (rawDuration === undefined) {
      return "";
    }
    console.log("rawDuration: ", rawDuration);
    let parsedDuration = "";

    let durationTokens = rawDuration.split(":");
    console.log("durationTokens: ", durationTokens);

    if (Number(durationTokens[0]) > 0) {
      parsedDuration = parsedDuration + durationTokens[0] + " hr ";
    }

    let minsNum = Number(durationTokens[1]);
    let secsNum = Number(durationTokens[2]);

    if (secsNum >= 31) {
      minsNum++;
    }

    parsedDuration = parsedDuration + minsNum + " min";

    return parsedDuration;
  };

  // for appt
  //String formatting functions for the date variable

  const dateChange = (date) => {
    setDate(date);
    setLoading(true);
    setTimeSelected(false); // Reset time selection
    setButtonSelect(false); // Hide the Continue button
    setSelectedButton(null); // Clear selected button
    setSelectedTime(null); // Clear selected time
    dateStringChange(date);
    // setTimeSelected(true);
    // if (timeSelected === true) {
    //   setTimeSelected(false);
    // }
    setTimeout(() => {
      setLoading(false); // End loading after 1 second
    }, 1000);
  };
  function formatTime(date, time) {
    if (time == null) {
      return "?";
    } else {
      var newDate = new Date((date + "T" + time).replace(/\s/, "T"));
      var hours = newDate.getHours();
      var minutes = newDate.getMinutes();

      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    }
  }

  // Enhanced formatTime function that shows only the user's time in their timezone
  function formatTimeWithTimezone(date, time) {
    if (time == null) {
      return "?";
    } else {
      // Convert PST time to user's local timezone
      const localTime = convertFromPST(time, date);
      const localFormatted = formatTime(date, localTime);

      // Show only the user's time in their timezone
      return `${localFormatted} ${getTimezoneAbbreviation()}`;
    }
  }

  // get the non-booked time slots from the backend
  const getTimeAASlots = async () => {
    try {
      console.log("🏢🏢🏢 GETTING BACKEND AVAILABLE APPOINTMENTS 🏢🏢🏢");
      setLoading(true);
      setTimeAASlots([]);

      let hoursMode = attendMode === "Online" ? "Online" : "Office";
      let date = apiDateString > moment(new Date(+new Date() + 86400000)).format("YYYY-MM-DD") ? apiDateString : moment(new Date(+new Date() + 86400000)).format("YYYY-MM-DD");
      setApiDateString(date);

      const apiUrl = `https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/availableAppointments/${date}/${duration.current}/${hoursMode}`;
      console.log("🏢 Backend API URL:", apiUrl);
      console.log("🏢 Date being checked:", date);
      console.log("🏢 Duration:", duration.current);
      console.log("🏢 Hours mode:", hoursMode);

      const res = await axios.get(apiUrl);
      console.log("🏢 Backend API response:", res.data);

      let timeSlotsAA = [];
      if (res.data.result && res.data.result.length > 0) {
        console.log("🏢 Non-Booked Time Slots", res.data.result.length, "available slots from backend");
        res.data.result.forEach((r, index) => {
          console.log(`  🏢 Slot ${index + 1}:`, r);
          timeSlotsAA.push(r["begin_time"]);
        });
      } else {
        console.log("🏢 No available slots returned from backend API");
      }

      console.log("🏢 Final backend time slots:", timeSlotsAA);
      setTimeAASlots(timeSlotsAA);
    } catch (error) {
      console.error("🚨🚨🚨 ERROR IN GET TIME AA SLOTS 🚨🚨🚨");
      console.error("Error details:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
      }
    } finally {
      setLoading(false);
    }
  };

  const getTimeSlots = async () => {
    try {
      console.log("=== GET TIME SLOTS FUNCTION STARTED ===");
      console.log("Access token available:", !!accessToken);
      console.log("Access token length:", accessToken ? accessToken.length : "N/A");
      console.log("API key available:", !!API_KEY);
      console.log("API key length:", API_KEY ? API_KEY.length : "N/A");

      setLoading(true);
      setTimeSlots([]);
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + accessToken,
      };

      let date = apiDateString > moment(new Date(+new Date() + 86400000)).format("YYYY-MM-DD") ? apiDateString : moment(new Date(+new Date() + 86400000)).format("YYYY-MM-DD");
      setApiDateString(date);

      // const morningTime = attendMode === "Online" ? "T08:00:00-0800" : "T09:00:00-0800";
      // const eveningTime = attendMode === "Online" ? "T20:00:00-0800" : "T20:00:00-0800";

      // Compute LA UTC offset automatically
      const laOffset = new Date()
        .toLocaleTimeString("en-US", {
          timeZone: "America/Los_Angeles",
          timeZoneName: "short",
        })
        .split(" ")[2]
        .replace("GMT", "")
        .replace(":", "");

      console.log("laOffset:", laOffset);

      let morningTime;
      let eveningTime;

      if (laOffset === "PST") {
        morningTime = attendMode === "Online" ? "T08:00:00-0800" : "T09:00:00-0800";
        eveningTime = attendMode === "Online" ? "T20:00:00-0800" : "T20:00:00-0800";
      } else {
        morningTime = attendMode === "Online" ? "T08:00:00-0700" : "T09:00:00-0700";
        eveningTime = attendMode === "Online" ? "T20:00:00-0700" : "T20:00:00-0700";
      }

      const data = {
        timeMin: date + morningTime,
        timeMax: date + eveningTime,
        items: [{ id: "primary" }],
      };

      console.log("🚀🚀🚀 GOOGLE CALENDAR API REQUEST 🚀🚀🚀");
      // console.log("🌐 Request URL:", `https://www.googleapis.com/calendar/v3/freeBusy?key=${API_KEY}`);
      // console.log("🔑 Request headers:", headers);
      // console.log("🔑 Access token being used:", accessToken ? accessToken.substring(0, 20) + "..." : "UNDEFINED");
      // console.log("🔑 Access token length:", accessToken ? accessToken.length : "N/A");
      // console.log("📅 Request data:", data);
      // console.log("📆 Date being checked:", date);
      // console.log("🌅 Morning time:", morningTime);
      // console.log("🌆 Evening time:", eveningTime);
      // console.log("⏰ Full timeMin:", data.timeMin);
      // console.log("⏰ Full timeMax:", data.timeMax);

      if (!accessToken) {
        console.error("🚨🚨🚨 NO ACCESS TOKEN AVAILABLE - CANNOT CALL GOOGLE CALENDAR API 🚨🚨🚨");
        throw new Error("Access token is required but not available");
      }

      // console.log("🔑 Making Google Calendar API call with access token...");
      const response = await axios.post(`https://www.googleapis.com/calendar/v3/freeBusy?key=${API_KEY}`, data, { headers: headers });

      console.log("📡📡📡 GOOGLE CALENDAR API RESPONSE 📡📡📡");
      // console.log("📊 Full GOOGLE CALENDAR API response:", response);
      // console.log("✅ GOOGLE CALENDAR API Response status:", response.status);
      // console.log("📋 GOOGLE CALENDAR API Response data:", response.data);
      // console.log("📋 GOOGLE CALENDAR API Response data:", response.data.calendars);
      // console.log("📋 GOOGLE CALENDAR API Response data:", response.data.calendars.primary);
      console.log(`📋 GOOGLE CALENDAR API Response data for ${date}:`, response.data.calendars.primary);

      // console.log("📋 Response headers:", response.headers);

      let busy = response.data.calendars.primary.busy;
      let start_time = Date.parse(date + morningTime) / 1000;
      let end_time = Date.parse(date + eveningTime) / 1000;
      let free = [];
      let appt_start_time = start_time;
      let seconds = convert(duration.current);

      console.log("🔍🔍🔍 GOOGLE CALENDAR DATA PROCESSING 🔍🔍🔍");
      console.log("📊 Raw busy data:", busy);
      console.log("🔤 Busy data type:", typeof busy);
      console.log("📏 Busy data length:", busy ? busy.length : "undefined");
      console.log("⏰ Start time (Unix timestamp):", start_time);
      console.log("⏰ End time (Unix timestamp):", end_time);
      console.log("⏱️ Duration in seconds:", seconds);
      console.log("📅 Date parsing check - date + morningTime:", date + morningTime);
      console.log("📅 Date parsing check - date + eveningTime:", date + eveningTime);

      // List of single-booking-per-day therapy types
      const therapyTypes = [
        "Abhyanga",
        "Abhyanga + Full-Body Steam",
        "Shirodhara",
        "Kati Basti",
        "Hrud Basti",
        "Janu Basti",
        "Pindaswedan - Specific Area",
        "Abhyanga + Shirodhara",
        "Abhyanga + Kati Basti",
        "Abhyanga + Hrud Basti",
        "Abhyanga + Janu Basti (single knee)",
        "Abhyanga + Full-Body Steam + Kati Basti",
        "Abhyanga + Full-Body Steam + Hrud Basti",
        "Abhyanga + Full-Body Steam + Janu Basti (single knee)",
      ];

      // appointments v2
      const appointmentsResponse = await axios.get(`https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/appointments`);
      const allAppointments = appointmentsResponse.data.result || [];

      // checking if any therapy type from the list is already booked on this date
      const existingTherapyBookings = allAppointments.filter((appointment) => appointment.appt_date === date && therapyTypes.includes(appointment.title));
      console.log("therapies booked", existingTherapyBookings);
      // Main loop to check each available slot
      console.log("⏰⏰⏰ SLOT AVAILABILITY CHECKING ⏰⏰⏰");
      console.log("🚀 Starting slot availability check...");
      console.log("⏰ Initial appt_start_time:", appt_start_time);
      console.log("⏰ End time limit:", end_time);
      console.log("⏱️ Slot increment (30 minutes):", 60 * 30, "seconds");

      while (appt_start_time < end_time) {
        let appt_end_time = appt_start_time + seconds;
        let slot_available = true;

        console.log(`\n🕐🕐🕐 CHECKING SLOT ${moment(new Date(appt_start_time * 1000)).format("HH:mm:ss")} to ${moment(new Date(appt_end_time * 1000)).format("HH:mm:ss")} 🕐🕐🕐`);
        console.log("⏰ Slot start (Unix):", appt_start_time);
        console.log("⏰ Slot end (Unix):", appt_end_time);

        // Checking if the slot overlaps with any existing busy times
        if (busy && busy.length > 0) {
          console.log(`🔴 Checking against ${busy.length} busy time slots from Google Calendar:`);
          busy.forEach((times, index) => {
            let this_start = Date.parse(times["start"]) / 1000;
            let this_end = Date.parse(times["end"]) / 1000;
            console.log(`  🔴 Busy slot ${index + 1}: ${moment(new Date(this_start * 1000)).format("HH:mm:ss")} to ${moment(new Date(this_end * 1000)).format("HH:mm:ss")}`);
            console.log(`  🔴 Busy start (Unix): ${this_start}, Busy end (Unix): ${this_end}`);

            if ((appt_start_time >= this_start && appt_start_time < this_end) || (appt_end_time > this_start && appt_end_time <= this_end)) {
              console.log("  ❌ SLOT CONFLICT DETECTED - marking as unavailable");
              slot_available = false;
              return;
            } else {
              console.log("  ✅ No conflict with this busy slot");
            }
          });
        } else {
          console.log("🟢🟢🟢 NO BUSY TIMES FOUND IN GOOGLE CALENDAR - ALL SLOTS SHOULD BE AVAILABLE 🟢🟢🟢");
        }

        // the selected therapy type from the UI or booking context (clientside)
        const selectedTherapyType = elementToBeRendered.title;
        console.log("selectedTherapy:", selectedTherapyType);
        // checking an existing booking for the selected therapy type
        const isTherapyAlreadyBooked = existingTherapyBookings.some((appointment) => appointment.category === "Therapy");
        console.log("isTherapyAlreadyBooked:", isTherapyAlreadyBooked);
        console.log("existingTherapyBookings:", existingTherapyBookings);

        // Final slot availability decision
        console.log(`Slot availability decision: ${slot_available ? "AVAILABLE" : "UNAVAILABLE"}`);

        //  no existing booking of the selected therapy type, add it
        if (slot_available) {
          if (isTherapyAlreadyBooked && therapyTypes.includes(selectedTherapyType)) {
            console.log("❌ Therapy already booked for the day, skipping:", selectedTherapyType);
          } else {
            const timeSlot = moment(new Date(appt_start_time * 1000)).format("HH:mm:ss");
            console.log(`✅ Adding available time slot: ${timeSlot}`);
            free.push(timeSlot);
          }
        } else {
          console.log("❌ Slot not available due to Google Calendar conflicts");
        }

        //  next slot in 30-minute
        appt_start_time += 60 * 30;
      }

      console.log("🎯🎯🎯 FINAL RESULTS - AVAILABLE TIME SLOTS 🎯🎯🎯");
      console.log("📊 Total available time slots found:", free.length);
      console.log("⏰ Available time slots:", free);
      console.log("💾 Setting timeSlots state with:", free);
      setTimeSlots(free);
    } catch (error) {
      console.log("❌❌❌ ERROR IN GET TIME SLOTS ❌❌❌");
      console.error("🚨 Error details:", error);
      if (error.response) {
        console.error("🚨 Error response:", error.response);
        console.error("🚨 Error status:", error.response.status);
        console.error("🚨 Error data:", error.response.data);
      }
      if (error.request) {
        console.error("🚨 Error request:", error.request);
      }
      console.error("🚨 Error message:", error.message);
    } finally {
      setLoading(false);
    }
  };

  function renderAvailableApptsVertical() {
    console.log("🔄🔄🔄 TIME SLOT MERGING LOGIC 🔄🔄🔄");
    console.log("📊 Google Calendar available slots (timeSlots):", timeSlots);
    console.log("📊 Backend API available slots (timeAASlots):", timeAASlots);
    console.log("📏 Google Calendar slots count:", timeSlots.length);
    console.log("📏 Backend API slots count:", timeAASlots.length);

    // Find common available times (must be available in BOTH Google Calendar AND backend)
    let result = timeSlots.filter((googleSlot) => timeAASlots.some((backendSlot) => googleSlot === backendSlot));

    console.log("🔗 Merged result (common available slots):", result);
    console.log("📊 Merged result count:", result.length);

    // IMPORTANT: Don't fall back to just AA slots if no common times exist
    // This would show times that are blocked on Google Calendar
    if (result.length === 0) {
      console.log("❌❌❌ NO COMMON AVAILABLE TIME SLOTS FOUND ❌❌❌");
      console.log("❌ This means either:");
      console.log("   - All times are blocked on Google Calendar");
      console.log("   - All times are already booked as appointments");
      console.log("   - No times are available for the selected date/duration");
    } else {
      console.log("✅✅✅ COMMON AVAILABLE TIME SLOTS FOUND ✅✅✅");
      console.log("✅ Available times:", result);
    }

    // if (!isTimeslotsLoaded) {
    //   return <div>Loading timeslots...</div>;
    // }
    // else
    // {
    console.log("🎯🎯🎯 FINAL RENDERING DECISION 🎯🎯🎯");
    console.log("🎯 Result array:", result);
    console.log("🎯 Result length:", result.length);
    console.log("🎯 Will render buttons:", result.length > 0);

    return (
      <Grid container>
        <Grid item xs={11}>
          {result.length > 0 ? (
            <>
              <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                <div style={{ color: "#D3A625", fontSize: "18px", fontWeight: "bold" }}>
                  ✅ {result.length} Available Time Slot{result.length === 1 ? "" : "s"} Found
                </div>
                <div style={{ fontSize: "14px", color: "#666" }}>These times are available in both Google Calendar and your appointment system</div>
              </div>
              {result.map(function (element, i) {
                return (
                  <button
                    key={i}
                    className={classes.timeslotButton}
                    style={{
                      width: "10rem",
                      height: "3rem",
                      maxWidth: "80%",
                      backgroundColor: i === selectedButton ? "#D3A625" : "white",
                      border: "2px solid #D3A625",
                      color: i === selectedButton ? "white" : "#D3A625",
                      // padding: "15px 90px",
                      textAlign: "center",
                      textDecoration: "none",
                      fontSize: "20px",
                      borderRadius: "50px",
                      display: "block",
                      margin: "6px auto",
                    }}
                    onClick={() => selectApptTime(element, i)}
                  >
                    {formatTimeWithTimezone(apiDateString, element)}
                  </button>
                );
              })}
            </>
          ) : (
            <div className='ApptPageHeader'>
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <div style={{ color: "#D3A625", fontSize: "20px", fontWeight: "bold", marginBottom: "1rem" }}>❌ No Available Appointments</div>
                <div style={{ fontSize: "16px", color: "#666", marginBottom: "1rem" }}>No time slots are available for the selected date and appointment type.</div>
                <div style={{ fontSize: "14px", color: "#888" }}>This could be because:</div>
                <ul style={{ textAlign: "left", display: "inline-block", fontSize: "14px", color: "#888" }}>
                  <li>All times are blocked on Google Calendar</li>
                  <li>All times are already booked as appointments</li>
                  <li>The selected date is outside business hours</li>
                  <li>The treatment duration doesn't fit in available slots</li>
                </ul>
                <div style={{ fontSize: "14px", color: "#666", marginTop: "1rem" }}>Please try selecting a different date or contact us for assistance.</div>
              </div>
            </div>
          )}
        </Grid>
      </Grid>
    );
  }
  const handleMode = (event) => {
    setTimeSlots([]);
    setTimeAASlots([]);
    var optionPick = event.target.name;
    console.log(optionPick);
    var newModeObj = {};
    var newMode = "";
    if (optionPick === "inPerson") {
      newModeObj = {
        inPerson: true,
        online: false,
      };
      newMode = "In-Person";
    } else {
      newModeObj = {
        inPerson: false,
        online: true,
      };
      newMode = "Online";
    }
    console.log(newModeObj);
    setMode(newModeObj);
    setAttendMode(newMode);
  };
  function selectApptTime(element, i) {
    console.log("selected time", element);
    if (element) {
      setSelectedButton(i);
      setSelectedTime(element);
      setTimeSelected(true);
      setButtonSelect(true);
    } else {
      setButtonSelect(false); // Ensure no button is selected if element is null
      setSelectedTime(null);
    }
  }

  const getAccessToken = async () => {
    console.log("🔑🔑🔑 GET ACCESS TOKEN FUNCTION STARTED 🔑🔑🔑");

    const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
    const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
    const url = BASE_URL + "customerToken/";
    const customer_uid = "100-000093";

    console.log("🔑 Environment variables:");
    console.log("  BASE_URL:", BASE_URL);
    console.log("  CLIENT_ID available:", !!CLIENT_ID);
    console.log("  CLIENT_ID Last 4:", CLIENT_ID.substring(CLIENT_ID.length - 32));
    console.log("  CLIENT_SECRET available:", !!CLIENT_SECRET);
    console.log("  CLIENT_SECRET Last 4:", CLIENT_SECRET.substring(CLIENT_SECRET.length - 4));
    console.log("  Customer UID:", customer_uid);
    console.log("  Full URL:", url + customer_uid);

    try {
      console.log("🔑 Fetching customer token from server...");
      const response = await axios.get(url + customer_uid);
      console.log("🔑 Server response:", response.data);

      const old_at = response["data"]["user_access_token"];
      const refreshToken = response["data"]["user_refresh_token"];

      console.log("🔑 Retrieved tokens:");
      console.log("  Old access token available:", !!old_at);
      console.log("  Old access token length:", old_at ? old_at.length : "N/A");
      console.log("  Refresh token available:", !!refreshToken);
      console.log("  Refresh token length:", refreshToken ? refreshToken.length : "N/A");

      try {
        console.log("🔑 Validating old access token with Google...");
        console.log("🔑 Token validation URL:", `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${old_at ? old_at.substring(0, 20) + "..." : "undefined"}`);

        await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${old_at}`);
        console.log("✅ Old access token is still valid!");
        setAccessToken(old_at);
        console.log("🔑 Access token set successfully");
      } catch (error) {
        console.log("❌ Old access token is invalid or expired");
        console.log("🔑 Error details:", error.response ? error.response.data : error.message);

        if (!refreshToken) {
          console.error("🚨 No refresh token available - cannot get new access token");
          return;
        }

        if (!CLIENT_ID || !CLIENT_SECRET) {
          console.error("🚨 Missing CLIENT_ID or CLIENT_SECRET environment variables");
          return;
        }

        console.log("🔑 Attempting to refresh access token...");
        var properties = {
          refresh_token: refreshToken,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: "refresh_token",
        };

        console.log("🔑 Refresh token request properties:", properties);

        var formBody = [];
        for (let property in properties) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(properties[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        console.log("🔑 Form body for refresh request:", formBody);

        const tokenResponse = await axios.post("https://accounts.google.com/o/oauth2/token", formBody, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
        });

        console.log("🔑 Google refresh token response:", tokenResponse.data);
        const at = tokenResponse["data"]["access_token"];

        if (at) {
          console.log("✅ New access token obtained successfully!");
          console.log("🔑 New token length:", at.length);
          setAccessToken(at);

          console.log("🔑 Updating access token in database...");
          const updateUrl = BASE_URL + "UpdateAccessToken/";
          await axios.post(updateUrl + customer_uid, {
            user_access_token: at,
          });
          console.log("✅ Access token updated in database");
        } else {
          console.error("🚨 No access token in refresh response");
        }
      }
    } catch (error) {
      console.error("🚨🚨🚨 CRITICAL ERROR IN GET ACCESS TOKEN 🚨🚨🚨");
      console.error("Error details:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
      }
      if (error.request) {
        console.error("Error request:", error.request);
      }
      console.error("Error message:", error.message);
    }
  };

  const onChange = async () => {
    if (servicesLoaded) {
      console.log("here 803");
      console.log(servicesLoaded, apiDateString, duration.current);
      setCalDisabled(true); // Disable calendar interactions while loading
      try {
        if (isFirstLoad.current) {
          serviceArr.forEach((service) => {
            if (service.treatment_uid === treatment_uid) {
              setElementToBeRendered(service);
              duration.current = service.duration;
            }
          });
          isFirstLoad.current = false;
          await getAccessToken(); // Fetch access token
        }

        await getTimeSlots(); // Fetch main time slots
        await getTimeAASlots(); // Fetch additional availability slots
      } catch (error) {
        console.error("Error in onChange:", error);
      } finally {
        setCalDisabled(false); // Re-enable calendar interactions
      }
    }
  };

  useEffect(() => {
    if (servicesLoaded && elementToBeRendered && accessToken && duration.current && apiDateString) {
      onChange();
    }
  }, [servicesLoaded, elementToBeRendered, accessToken, duration, apiDateString, attendMode]);

  return (
    <div className='HomeContainer'>
      <ScrollToTop />
      <Helmet>
        <title>Book an Appointment</title>
        <meta name='description' content="Book an Appointment that's convenient to you" />
        <link rel='canonical' href='/appointmentpage' />
      </Helmet>
      <br />
      {bookNowClicked ? (
        <div>
          <div className='Card'>
            <div className='CardGrid'>
              <div>
                <div className='ApptPageTitle'>{elementToBeRendered.title}</div>
                <div className='ApptPageText'>
                  {elementToBeRendered.description} <br />
                </div>
                <div className='ApptPageHeader'>
                  {parseDuration(elementToBeRendered.duration)} | {elementToBeRendered.cost}
                </div>
                <div className='ApptPageText'>
                  {addons_list().map((addon) => (
                    <div>
                      {"+ "} {addon.title} | {durationToString(secondsToHours(hoursToSeconds(addon.duration)))} | {addon.addon_cost}
                    </div>
                  ))}
                </div>
                <div className='ApptPageHeader'>
                  Total: ${totalCost} | {durationToString(totalDuration)}
                </div>

                <div style={{ margin: "2rem" }}>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    variant='top'
                    src={elementToBeRendered.image_url}
                    alt={"An image of" + elementToBeRendered.title}
                  />
                </div>
              </div>

              {/* Right hand side of the Container */}
              <div className={classes.calendarBox}>
                <div className='TitleFontAppt'>Pick an Appointment Type</div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "1rem",
                    marginBottom: "2rem",
                  }}
                >
                  <FormControlLabel control={<YellowRadio checked={mode.inPerson} onChange={(e) => handleMode(e)} name='inPerson' />} label='In-person' />
                  <FormControlLabel control={<YellowRadio checked={mode.online} onChange={(e) => handleMode(e)} name='online' />} label='Online' />
                </div>
                <div className='TitleFontAppt'>Pick an Appointment Date</div>
                {/* {console.log("Current date: ", minDate)} */}
                <Calendar
                  calendarType='US'
                  onClickDay={dateChange}
                  value={date}
                  minDate={minDate}
                  next2Label={null}
                  prev2Label={null}
                  tileDisabled={() => isCalDisabled}
                  className={isCalDisabled ? classes.calDisabled : ""}
                />
              </div>
            </div>

            <div style={{ width: "100%", height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "2rem",
                }}
              >
                <div className='TitleFontAppt'>Pick an Appointment Time</div>
                <div className='BodyFontAppt'>Times shown in your timezone ({getTimezoneAbbreviation()})</div>
              </div>

              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "2rem" }}>
                {loading ? (
                  <div className='loader'></div> // The loading spinner
                ) : (
                  renderAvailableApptsVertical() // Render available appointments if not loading
                )}
              </div>

              <div style={{ padding: "3%" }} hidden={!buttonSelect || !selectedTime}>
                <button
                  onClick={() =>
                    history.push({
                      pathname: `/${treatmentID}/confirm`,
                      state: {
                        date: apiDateString,
                        time: selectedTime, // This is already in PST from the backend
                        mode: attendMode,
                        accessToken: accessToken,
                        totalCost: totalCost,
                        totalDuration: totalDuration,
                        durationText: durationToString(totalDuration),
                      },
                    })
                  }
                  className={classes.timeslotButton}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <br />
      <br />
    </div>
  );
}

/**
 * Things to work on
 *
 * 1. The axios call happens everytime a new date is clicked on the calendar. That's overkill.
 * Instead figure out a way to load the information retrieved from the endpoint into an array.
 *
 * 2.Figure out how to ensure that when the apptPage is loaded up, that the current date is initialy selected.
 * As of the momment, when the page loads, it holds "00/00/0000" as the selected date.
 *
 * 3.Prior to rendering the appointment page
 */
