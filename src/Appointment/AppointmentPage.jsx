import React, { useState, useEffect, useContext, useRef } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Radio, FormControlLabel } from "@material-ui/core";
import { useHistory, useParams, useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import moment from "moment-timezone";
import axios from "axios";
import { Helmet } from "react-helmet";
import ScrollToTop from "../Blog/ScrollToTop";
import { MyContext } from "../App";
import "../Home/Home.css";
import "./AppointmentPage.css";

// Define YellowRadio component inline with exact styling from image
const YellowRadio = withStyles({
  root: {
    color: "#D3A625",
    "&:hover": {
      backgroundColor: "rgba(211, 166, 37, 0.1)",
    },
  },
  checked: {
    color: "#D3A625",
  },
})(Radio);

const useStyles = makeStyles({
  calendarBox: {
    borderLeft: "1px solid #D3A625",
    paddingLeft: "2rem",
    "@media (max-width: 500px)": {
      borderLeft: "0px solid #D3A625",
      paddingLeft: "0px",
      borderTop: "1px solid #D3A625",
      paddingTop: "2rem",
    },
  },
  timeslotButton: {
    backgroundColor: "white",
    border: "2px solid #D3A625",
    color: "#D3A625",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#D3A625",
      color: "white",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(211, 166, 37, 0.3)",
    },
  },
  calDisabled: {
    opacity: 0.5,
    pointerEvents: "none",
  },
  appointmentTypeTitle: {
    color: "#D3A625",
    fontSize: "20px",
    fontWeight: "bold",
    fontStyle: "italic",
    fontFamily: "serif",
    textAlign: "center",
    marginBottom: "1rem",
  },
  appointmentTimeTitle: {
    color: "#D3A625",
    fontSize: "20px",
    fontWeight: "bold",
    fontStyle: "italic",
    fontFamily: "serif",
    textAlign: "center",
    marginBottom: "0.5rem",
  },
  timezoneSubtitle: {
    fontSize: "14px",
    color: "#666",
    textAlign: "center",
    marginBottom: "2rem",
    fontFamily: "sans-serif",
  },
});

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export default function AppointmentPage(props) {
  console.log("In AppointmentPage.jsx", props);

  // Core state
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCalDisabled, setCalDisabled] = useState(false);

  // Appointment data
  const [date, setDate] = useState(new Date(+new Date() + 86400000));
  const [minDate, setMinDate] = useState(new Date(+new Date() + 86400000));
  const [apiDateString, setApiDateString] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedButton, setSelectedButton] = useState("");
  const [timeSelected, setTimeSelected] = useState(false);
  const [buttonSelect, setButtonSelect] = useState(false);

  // Mode and settings
  const [mode, setMode] = useState({ inPerson: true, online: false });
  const [attendMode, setAttendMode] = useState("In-Person");
  const [bookNowClicked, setBookNowClicked] = useState(true);

  // Time slots
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  // Refs
  const duration = useRef(null);
  const isFirstLoad = useRef(true);

  // Context and routing
  const classes = useStyles();
  const history = useHistory();
  const { treatmentID } = useParams();
  const { serviceArr, servicesLoaded } = useContext(MyContext);
  const [elementToBeRendered, setElementToBeRendered] = useState([]);

  // Location state
  let location = useLocation();
  let addons = location.state || [];

  // Utility functions
  const formatDateForAPI = (date) => {
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
  };

  const getTimezoneOffset = () => {
    const now = new Date();
    const laTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
    const utcTime = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
    const offset = (laTime.getTime() - utcTime.getTime()) / (1000 * 60 * 60);
    return offset === -8 ? "PST" : "PDT";
  };

  const getBusinessHours = () => {
    const timezone = getTimezoneOffset();
    const offset = timezone === "PST" ? "-0800" : "-0700";

    return {
      morning: attendMode === "Online" ? `T08:00:00${offset}` : `T09:00:00${offset}`,
      evening: `T20:00:00${offset}`,
    };
  };

  const convertDurationToSeconds = (durationStr) => {
    const [hours, minutes, seconds] = durationStr.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const generateTimeSlots = (startHour, endHour, durationSeconds) => {
    const slots = [];
    const slotDuration = 30 * 60; // 30 minutes in seconds

    for (let time = startHour * 3600; time <= endHour * 3600 - durationSeconds; time += slotDuration) {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      slots.push(`${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`);
    }

    return slots;
  };

  // Core API functions
  const getAccessToken = async () => {
    console.log("🔑🔑🔑 GETTING ACCESS TOKEN 🔑🔑🔑");

    const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
    const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
    const customer_uid = "100-000093";

    try {
      // Get existing token from server
      const response = await axios.get(`${BASE_URL}customerToken/${customer_uid}`);
      const oldToken = response.data.user_access_token;
      const refreshToken = response.data.user_refresh_token;

      console.log("🔑 Retrieved tokens from server");

      // Validate existing token
      try {
        await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${oldToken}`);
        console.log("✅ Existing token is valid");
        return oldToken;
      } catch (error) {
        console.log("❌ Existing token expired, refreshing...");

        // Refresh token
        const formData = new URLSearchParams({
          refresh_token: refreshToken,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: "refresh_token",
        });

        const tokenResponse = await axios.post("https://accounts.google.com/o/oauth2/token", formData, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        const newToken = tokenResponse.data.access_token;
        console.log("✅ New token obtained");

        // Update token in database
        await axios.post(`${BASE_URL}UpdateAccessToken/${customer_uid}`, {
          user_access_token: newToken,
        });

        return newToken;
      }
    } catch (error) {
      console.error("🚨 Error getting access token:", error);
      throw error;
    }
  };

  const getGoogleCalendarBusyTimes = async (date, accessToken) => {
    console.log("🚀🚀🚀 FETCHING GOOGLE CALENDAR BUSY TIMES 🚀🚀🚀");
    console.log("📅 Date:", date);
    console.log("🔑 Access token available:", !!accessToken);

    if (!accessToken) {
      throw new Error("Access token required for Google Calendar API");
    }

    const businessHours = getBusinessHours();
    const timezone = getTimezoneOffset();

    const requestData = {
      timeMin: date + businessHours.morning,
      timeMax: date + businessHours.evening,
      items: [{ id: "primary" }],
    };

    console.log("🌐 Google Calendar API request:", requestData);
    console.log("⏰ Timezone:", timezone);

    const response = await axios.post(`https://www.googleapis.com/calendar/v3/freeBusy?key=${API_KEY}`, requestData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("📡📡📡 GOOGLE CALENDAR API RESPONSE 📡📡📡");
    console.log("📊 Response data:", response.data);

    const busyTimes = response.data.calendars.primary.busy || [];
    console.log("🔴 Busy times found:", busyTimes.length);

    return busyTimes;
  };

  const getBackendAvailableSlots = async (date, duration, mode) => {
    console.log("🏢🏢🏢 FETCHING BACKEND AVAILABLE SLOTS 🏢🏢🏢");
    console.log("📅 Date:", date);
    console.log("⏱️ Duration:", duration);
    console.log("🏢 Mode:", mode);

    const hoursMode = mode === "Online" ? "Online" : "Office";
    const apiUrl = `https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/availableAppointments/${date}/${duration}/${hoursMode}`;

    console.log("🌐 Backend API URL:", apiUrl);

    const response = await axios.get(apiUrl);
    console.log("🏢 Backend API response:", response.data);

    const availableSlots = response.data.result || [];
    console.log("✅ Backend available slots:", availableSlots.length);

    return availableSlots.map((slot) => slot.begin_time);
  };

  const filterAvailableSlots = (allSlots, busyTimes, durationSeconds) => {
    console.log("🔍🔍🔍 FILTERING AVAILABLE TIME SLOTS 🔍🔍🔍");
    console.log("📊 Total slots to check:", allSlots.length);
    console.log("🔴 Busy times from Google:", busyTimes.length);
    console.log("⏱️ Treatment duration:", durationSeconds, "seconds");

    const availableSlots = [];

    allSlots.forEach((slotTime) => {
      const [hours, minutes] = slotTime.split(":").map(Number);
      const slotStart = hours * 3600 + minutes * 60;
      const slotEnd = slotStart + durationSeconds;

      let isAvailable = true;

      // Check against Google Calendar busy times
      busyTimes.forEach((busyTime) => {
        const busyStart = new Date(busyTime.start).getTime() / 1000;
        const busyEnd = new Date(busyTime.end).getTime() / 1000;

        // Check for overlap
        if (slotStart < busyEnd && slotEnd > busyStart) {
          isAvailable = false;
        }
      });

      if (isAvailable) {
        availableSlots.push(slotTime);
      }
    });

    console.log("✅✅✅ FINAL AVAILABLE TIME SLOTS ✅✅✅");
    console.log("📊 Available slots:", availableSlots);
    console.log("📏 Total available:", availableSlots.length);

    return availableSlots;
  };

  const fetchAvailableTimeSlots = async (selectedDate) => {
    if (!accessToken || !duration.current) {
      console.log("❌ Missing required data for fetching time slots");
      return;
    }

    setLoading(true);
    setCalDisabled(true);

    try {
      const dateString = formatDateForAPI(selectedDate);
      console.log("🔄🔄🔄 FETCHING TIME SLOTS FOR DATE 🔄🔄🔄");
      console.log("📅 Date string:", dateString);
      console.log("⏱️ Duration:", duration.current);
      console.log("🏢 Mode:", attendMode);

      // Get Google Calendar busy times
      const busyTimes = await getGoogleCalendarBusyTimes(dateString, accessToken);

      // Get backend available slots
      const backendSlots = await getBackendAvailableSlots(dateString, duration.current, attendMode);

      // Generate all possible time slots for the day
      const startHour = attendMode === "Online" ? 8 : 9;
      const endHour = 20;
      const allSlots = generateTimeSlots(startHour, endHour, convertDurationToSeconds(duration.current));

      console.log("📊 All possible time slots:", allSlots);

      // Filter to find truly available slots
      const availableSlots = filterAvailableSlots(allSlots, busyTimes, convertDurationToSeconds(duration.current));

      setAvailableTimeSlots(availableSlots);
      setApiDateString(dateString);
    } catch (error) {
      console.error("🚨 Error fetching time slots:", error);
      setAvailableTimeSlots([]);
    } finally {
      setLoading(false);
      setCalDisabled(false);
    }
  };

  // Event handlers
  const handleMode = (event) => {
    const newMode = event.target.name === "inPerson" ? "In-Person" : "Online";
    console.log("🔄 Appointment mode changed to:", newMode);

    setMode({
      inPerson: newMode === "In-Person",
      online: newMode === "Online",
    });
    setAttendMode(newMode);

    // Clear existing selections when mode changes
    setAvailableTimeSlots([]);
    setSelectedTime(null);
    setSelectedButton("");
    setTimeSelected(false);
    setButtonSelect(false);
  };

  const dateChange = (selectedDate) => {
    console.log("📅 Date selected:", selectedDate);
    setDate(selectedDate);
    fetchAvailableTimeSlots(selectedDate);
  };

  const selectApptTime = (timeSlot, index) => {
    console.log("⏰ Time slot selected:", timeSlot);
    setSelectedTime(timeSlot);
    setSelectedButton(index);
    setTimeSelected(true);
    setButtonSelect(true);
  };

  const continueToNextPage = () => {
    if (selectedTime && apiDateString) {
      history.push({
        pathname: `/${treatmentID}/confirm`,
        state: {
          date: apiDateString,
          time: selectedTime,
          mode: attendMode,
          accessToken: accessToken,
          totalCost: getTotalCost(),
          totalDuration: getTotalDuration(),
          durationText: durationToString(getTotalDuration()),
        },
      });
    }
  };

  // Helper functions for cost and duration calculations
  const getTotalCost = () => {
    const baseCost = parseFloat(elementToBeRendered.cost?.replace(/[^0-9.]/g, "") || 0);
    const addonCosts = addons.filter((addon) => addon.selected).reduce((total, addon) => total + parseFloat(addon.addon_cost?.replace(/[^0-9.]/g, "") || 0), 0);
    return baseCost + addonCosts;
  };

  const getTotalDuration = () => {
    const baseDuration = convertDurationToSeconds(elementToBeRendered.duration || "00:00:00");
    const addonDurations = addons.filter((addon) => addon.selected).reduce((total, addon) => total + convertDurationToSeconds(addon.duration || "00:00:00"), 0);
    return baseDuration + addonDurations;
  };

  const durationToString = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const parseDuration = (durationStr) => {
    if (!durationStr) return "";
    const [hours, minutes, seconds] = durationStr.split(":").map(Number);
    let result = "";
    if (hours > 0) result += `${hours} hr `;
    if (minutes > 0 || seconds > 0) {
      const totalMinutes = minutes + Math.ceil(seconds / 60);
      result += `${totalMinutes} min`;
    }
    return result;
  };

  const addons_list = () => {
    return addons.filter((addon) => addon.selected);
  };

  const getTimezoneAbbreviation = () => {
    return getTimezoneOffset();
  };

  // Effects
  useEffect(() => {
    if (servicesLoaded && serviceArr.length > 0) {
      const selectedService = serviceArr.find((s) => s.treatment_uid === treatmentID);
      if (selectedService) {
        setElementToBeRendered(selectedService);
        duration.current = selectedService.duration;
        console.log("✅ Service loaded:", selectedService.title);
        console.log("⏱️ Duration set to:", selectedService.duration);
      }
    }
  }, [servicesLoaded, serviceArr, treatmentID]);

  useEffect(() => {
    if (servicesLoaded && elementToBeRendered && !accessToken) {
      console.log("🔑 Getting access token...");
      getAccessToken()
        .then((token) => {
          setAccessToken(token);
          console.log("✅ Access token set");
        })
        .catch((error) => {
          console.error("🚨 Failed to get access token:", error);
        });
    }
  }, [servicesLoaded, elementToBeRendered, accessToken]);

  useEffect(() => {
    if (accessToken && duration.current && date) {
      fetchAvailableTimeSlots(date);
    }
  }, [accessToken, duration.current]);

  // Render functions
  const renderTimeSlots = () => {
    if (loading) {
      return <div className='loader'></div>;
    }

    if (availableTimeSlots.length === 0) {
      return (
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
      );
    }

    return (
      <>
        {/* Available Time Slots Found section - positioned below the main title */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ color: "#D3A625", fontSize: "18px", fontWeight: "bold", marginBottom: "0.5rem" }}>
            ✅ {availableTimeSlots.length} Available Time Slot{availableTimeSlots.length === 1 ? "" : "s"} Found
          </div>
          <div style={{ fontSize: "14px", color: "#666" }}>These times are available in both Google Calendar and your appointment system</div>
        </div>

        {/* Grid layout for time slots - 5 per row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "1rem",
            maxWidth: "800px",
            margin: "0 auto",
            padding: "0 1rem",
          }}
        >
          {availableTimeSlots.map((timeSlot, index) => (
            <button
              key={index}
              className={classes.timeslotButton}
              style={{
                backgroundColor: index === selectedButton ? "#D3A625" : "white",
                color: index === selectedButton ? "white" : "#D3A625",
                width: "100%",
                minHeight: "3rem",
                margin: "0",
                fontSize: "16px",
                fontWeight: "500",
              }}
              onClick={() => selectApptTime(timeSlot, index)}
            >
              {timeSlot}
            </button>
          ))}
        </div>
      </>
    );
  };

  // Main render
  if (!bookNowClicked) {
    return null;
  }

  return (
    <div className='HomeContainer'>
      <ScrollToTop />
      <Helmet>
        <title>Book an Appointment</title>
        <meta name='description' content="Book an Appointment that's convenient to you" />
        <link rel='canonical' href='/appointmentpage' />
      </Helmet>

      <br />

      <div>
        <div className='Card'>
          <div className='CardGrid'>
            {/* Left side - Service details */}
            <div>
              <div className='ApptPageTitle'>{elementToBeRendered.title}</div>
              <div className='ApptPageText'>
                {elementToBeRendered.description} <br />
              </div>
              <div className='ApptPageHeader'>
                {parseDuration(elementToBeRendered.duration)} | {elementToBeRendered.cost}
              </div>
              <div className='ApptPageText'>
                {addons_list().map((addon, index) => (
                  <div key={index}>
                    {"+ "} {addon.title} | {durationToString(convertDurationToSeconds(addon.duration))} | {addon.addon_cost}
                  </div>
                ))}
              </div>
              <div className='ApptPageHeader'>
                Total: ${getTotalCost()} | {durationToString(getTotalDuration())}
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

            {/* Right side - Calendar and mode selection */}
            <div className={classes.calendarBox}>
              <div className={classes.appointmentTypeTitle}>Pick an Appointment Type</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "1rem",
                  marginBottom: "2rem",
                  padding: "0 1rem",
                }}
              >
                <FormControlLabel control={<YellowRadio checked={mode.inPerson} onChange={handleMode} name='inPerson' />} label='In-person' style={{ color: "black", fontFamily: "sans-serif" }} />
                <FormControlLabel control={<YellowRadio checked={mode.online} onChange={handleMode} name='online' />} label='Online' style={{ color: "black", fontFamily: "sans-serif" }} />
              </div>

              <div className='TitleFontAppt'>Pick an Appointment Date</div>
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

          {/* Time slot selection */}
          <div style={{ width: "100%", height: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "2rem",
              }}
            >
              <div className={classes.appointmentTimeTitle}>Pick an Appointment Time</div>
              <div className={classes.timezoneSubtitle}>Times shown in your timezone ({getTimezoneAbbreviation()})</div>
            </div>

            {/* Available Time Slots Found section - positioned below the main title */}
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ color: "#D3A625", fontSize: "18px", fontWeight: "bold", marginBottom: "0.5rem" }}>
                ✅ {availableTimeSlots.length} Available Time Slot{availableTimeSlots.length === 1 ? "" : "s"} Found
              </div>
              <div style={{ fontSize: "14px", color: "#666" }}>These times are available in both Google Calendar and your appointment system</div>
            </div>

            {/* Grid layout for time slots - 5 per row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "1rem",
                maxWidth: "800px",
                margin: "0 auto",
                padding: "0 1rem",
                marginBottom: "2rem",
              }}
            >
              {availableTimeSlots.map((timeSlot, index) => (
                <button
                  key={index}
                  className={classes.timeslotButton}
                  style={{
                    backgroundColor: index === selectedButton ? "#D3A625" : "white",
                    color: index === selectedButton ? "white" : "#D3A625",
                    width: "100%",
                    minHeight: "3rem",
                    margin: "0",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                  onClick={() => selectApptTime(timeSlot, index)}
                >
                  {timeSlot}
                </button>
              ))}
            </div>

            <div style={{ padding: "3%" }} hidden={!buttonSelect || !selectedTime}>
              <button
                onClick={continueToNextPage}
                className={classes.timeslotButton}
                style={{
                  backgroundColor: "#D3A625",
                  color: "white",
                  width: "auto",
                  padding: "0 2rem",
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
    </div>
  );
}
