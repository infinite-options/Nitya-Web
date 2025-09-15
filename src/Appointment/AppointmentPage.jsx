import React, { useState, useEffect, useContext, useRef } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Radio, FormControlLabel } from "@material-ui/core";
import { useHistory, useParams, useLocation } from "react-router-dom";
import Calendar from "react-calendar";
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
  const [isCalDisabled, setCalDisabled] = useState(false);

  // Appointment data
  const [date, setDate] = useState(new Date(+new Date() + 86400000));
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedButton, setSelectedButton] = useState("");
  const [buttonSelect, setButtonSelect] = useState(false);

  // Mode and settings
  const [mode, setMode] = useState({ inPerson: true, online: false });
  const [attendMode, setAttendMode] = useState("In-Person");

  // Time slots - separate arrays for each mode
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [inPersonTimeSlots, setInPersonTimeSlots] = useState([]);
  const [onlineTimeSlots, setOnlineTimeSlots] = useState([]);
  const [allAvailableSlots, setAllAvailableSlots] = useState([]);

  // Refs
  const duration = useRef(null);

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

  const convertDurationToSeconds = (durationStr) => {
    if (!durationStr) return 0;
    const [hours, minutes, seconds] = durationStr.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  // Convert Pacific Time to user's timezone
  const convertToUserTimezone = (pacificTime) => {
    // Create a date object for today with the Pacific time
    const today = new Date();
    const [time, period] = pacificTime.split(' ');
    const [hours, minutes] = time.split(':');
    
    let hour24 = parseInt(hours);
    if (period === 'PM' && hour24 !== 12) {
      hour24 += 12;
    } else if (period === 'AM' && hour24 === 12) {
      hour24 = 0;
    }
    
    // Create date in Pacific timezone
    const pacificDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour24, parseInt(minutes));
    
    // Convert to user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const userTime = new Date(pacificDate.toLocaleString("en-US", {timeZone: userTimezone}));
    
    // Format back to 12-hour format
    let hours12 = userTime.getHours();
    const ampm = hours12 >= 12 ? 'PM' : 'AM';
    hours12 = hours12 % 12;
    hours12 = hours12 ? hours12 : 12; // 0 should be 12
    const mins = userTime.getMinutes().toString().padStart(2, '0');
    
    return `${hours12}:${mins} ${ampm}`;
  };

  // Filter slots by appointment mode and availability status
  const filterSlotsByMode = (slots) => {
    const targetMode = attendMode === "Online" ? "Online" : "Office";
    const filteredSlots = slots.filter(slot => 
      slot.hoursMode === targetMode && 
      slot.availability_status === "OK"
    );
    
    // Convert times to user timezone and extract just the time
    const timeSlotsAA = filteredSlots.map(slot => {
      const convertedTime = convertToUserTimezone(slot.available_time);
      return {
        ...slot,
        convertedTime: convertedTime
      };
    });
    
    return timeSlotsAA;
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

    // const businessHours = getBusinessHours();
    const timezone = getTimezoneOffset();
    console.log("🔴 Timezone:", timezone);
    const offset = timezone === "PST" ? "-0800" : "-0700";
    console.log("🔴 Offset:", offset);
    const morning = `T01:00:00${offset}`;
    const evening = `T23:00:00${offset}`;

    const requestData = {
      timeMin: date + morning,
      timeMax: date + evening,
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

    console.log("📡📡📡 GOOGLE CALENDAR API RESPONSE 📡📡📡:", response.data);

    const busyTimes = response.data.calendars.primary.busy || [];
    console.log("🔴 Busy times found:", busyTimes);

    return busyTimes;
  };

  const getBackendAvailableSlots = async (date, duration) => {
    console.log("🏢🏢🏢 FETCHING BACKEND AVAILABLE SLOTS 🏢🏢🏢");
    console.log("📅 Date:", date);
    console.log("⏱️ Duration:", duration);

    const apiUrl = `https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/availableAppointments/${date}/${duration}`;

    console.log("🌐 Backend API URL:", apiUrl);

    const response = await axios.get(apiUrl);
    console.log("🏢 Backend API response:", response.data);

    // Return all slots from the new format
    const allSlots = response.data.result || [];
    console.log(`✅ Backend available slots:`, allSlots.length);
    console.log("📋 Available slots data:", allSlots);

    return allSlots;
  };

  const filterAvailableSlots = (backendSlots, busyTimes, durationSeconds) => {
    console.log("🔍🔍🔍 FILTERING AVAILABLE TIME SLOTS 🔍🔍🔍");
    console.log("📊 Total backend slots to check:", backendSlots.length);
    console.log("🔴 Busy times from Google:", busyTimes);
    console.log("⏱️ Treatment duration:", durationSeconds, "seconds");

    const availableSlots = [];

    backendSlots.forEach((slot, slotIndex) => {
      const slotTime = slot.begin_time;
      const [hours, minutes] = slotTime.split(":").map(Number);
      const slotStart = hours * 3600 + minutes * 60;
      const slotEnd = slotStart + durationSeconds;

      console.log(`\n🕐 Checking slot ${slotIndex + 1}: ${slotTime} (${slotStart}s to ${slotEnd}s)`);

      let isAvailable = true;
      let conflictReason = "";

      // Check against Google Calendar busy times
      if (busyTimes && busyTimes.length > 0) {
        busyTimes.forEach((busyTime, busyIndex) => {
          const busyStart = new Date(busyTime.start).getTime() / 1000;
          const busyEnd = new Date(busyTime.end).getTime() / 1000;

          // Extract just the time portion from the busy times (remove date part)
          const busyStartDate = new Date(busyStart * 1000);
          const busyEndDate = new Date(busyEnd * 1000);
          const busyStartTimeOnly = busyStartDate.getHours() * 3600 + busyStartDate.getMinutes() * 60;
          const busyEndTimeOnly = busyEndDate.getHours() * 3600 + busyEndDate.getMinutes() * 60;

          console.log(`  🔴 Busy time ${busyIndex + 1}: ${busyStartDate.toLocaleTimeString()} to ${busyEndDate.toLocaleTimeString()}`);
          console.log(`    Busy time only: ${busyStartTimeOnly}s to ${busyEndTimeOnly}s`);

          // Check for overlap - slot overlaps with busy time if:
          // slotStart < busyEndTimeOnly AND slotEnd > busyStartTimeOnly
          if (slotStart < busyEndTimeOnly && slotEnd > busyStartTimeOnly) {
            isAvailable = false;
            conflictReason = `Conflicts with busy time ${busyIndex + 1}`;
            console.log(`    ❌ CONFLICT DETECTED: Slot overlaps with busy time`);
          } else {
            console.log(`    ✅ No conflict with this busy time`);
          }
        });
      } else {
        console.log("  🟢 No busy times found - all slots should be available");
      }

      if (isAvailable) {
        availableSlots.push(slotTime);
        console.log(`  ✅ Slot ${slotTime} is AVAILABLE`);
      } else {
        console.log(`  ❌ Slot ${slotTime} is UNAVAILABLE: ${conflictReason}`);
      }
    });

    console.log("\n🎯🎯🎯 FILTERING SUMMARY 🎯🎯🎯");
    console.log("📊 Original backend slots:", backendSlots.length);
    console.log("🔴 Busy times found:", busyTimes ? busyTimes.length : 0);
    console.log("✅ Available slots after Google Calendar filtering:", availableSlots.length);
    console.log("📋 Available times:", availableSlots);

    return availableSlots;
  };

  const fetchAvailableTimeSlots = async (selectedDate) => {
    if (!accessToken || !duration.current) {
      console.log("❌ Missing required data for fetching time slots");
      return;
    }

    setCalDisabled(true);

    try {
      const dateString = formatDateForAPI(selectedDate);
      console.log("🔄🔄🔄 FETCHING TIME SLOTS FOR DATE 🔄🔄🔄");
      console.log("📅 Date string:", dateString);
      console.log("⏱️ Duration:", duration.current);

      // Get Google Calendar busy times (same for both modes)
      const busyTimes = await getGoogleCalendarBusyTimes(dateString, accessToken);
      console.log("🔴 Raw busy times data:", busyTimes);

      // Get all available slots from backend (new format)
      console.log("🏢🏢🏢 FETCHING BACKEND SLOTS 🏢🏢🏢");
      const allSlots = await getBackendAvailableSlots(dateString, duration.current);
      console.log("📋 All slots from backend:", allSlots);

      // Store all slots for mode switching
      setAllAvailableSlots(allSlots);

      // Filter slots by mode and availability status
      const inPersonSlots = filterSlotsByMode(allSlots.filter(slot => slot.hoursMode === "Office"));
      const onlineSlots = filterSlotsByMode(allSlots.filter(slot => slot.hoursMode === "Online"));

      console.log("✅ In-Person available slots:", inPersonSlots);
      console.log("✅ Online available slots:", onlineSlots);

      // Store both sets of slots
      setInPersonTimeSlots(inPersonSlots);
      setOnlineTimeSlots(onlineSlots);

      // Set the current mode's slots as active
      setAvailableTimeSlots(attendMode === "Online" ? onlineSlots : inPersonSlots);
    } catch (error) {
      console.error("🚨 Error fetching time slots:", error);
      setAvailableTimeSlots([]);
      setInPersonTimeSlots([]);
      setOnlineTimeSlots([]);
    } finally {
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

    // Filter existing slots by new mode instead of making new API call
    if (allAvailableSlots.length > 0) {
      const filteredSlots = filterSlotsByMode(allAvailableSlots);
      setAvailableTimeSlots(filteredSlots);
      console.log("📊 Filtered slots for", newMode, ":", filteredSlots.length);
    } else {
      // Switch to the appropriate pre-calculated time slots
      if (newMode === "Online") {
        console.log("💻 Switching to Online mode - using pre-calculated online slots");
        console.log("📊 Online slots available:", onlineTimeSlots);
        console.log("📊 Online slots count:", onlineTimeSlots.length);
        setAvailableTimeSlots(onlineTimeSlots);
      } else {
        console.log("👥 Switching to In-Person mode - using pre-calculated in-person slots");
        console.log("📊 In-Person slots available:", inPersonTimeSlots);
        console.log("📊 In-Person slots count:", inPersonTimeSlots.length);
        setAvailableTimeSlots(inPersonTimeSlots);
      }
    }

    // Clear existing selections when mode changes
    setSelectedTime(null);
    setSelectedButton("");
    setButtonSelect(false);
  };

  const dateChange = (selectedDate) => {
    console.log("📅 Date selected:", selectedDate);
    setDate(selectedDate);
    fetchAvailableTimeSlots(selectedDate);
  };

  const selectApptTime = (timeSlot, index) => {
    console.log("⏰ Time slot selected:", timeSlot);
    // Store original Pacific time for API calls
    setSelectedTime(timeSlot.available_time || timeSlot);
    setSelectedButton(index);
    setButtonSelect(true);
  };

  const continueToNextPage = () => {
    if (selectedTime) {
      // Convert duration from seconds back to HH:MM:SS format for the Scheduler component
      const totalDurationSeconds = getTotalDuration();
      const hours = Math.floor(totalDurationSeconds / 3600);
      const minutes = Math.floor((totalDurationSeconds % 3600) / 60);
      const seconds = totalDurationSeconds % 60;
      const durationString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

      history.push({
        pathname: `/${treatmentID}/confirm`,
        state: {
          date: formatDateForAPI(date),
          time: selectedTime,
          mode: attendMode,
          accessToken: accessToken,
          totalCost: getTotalCost(),
          totalDuration: durationString, // Pass as HH:MM:SS string, not seconds
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
    // Get the user's actual local timezone abbreviation
    const now = new Date();
    const timezoneAbbr = now
      .toLocaleTimeString("en-US", {
        timeZoneName: "short",
        hour12: false,
      })
      .split(" ")
      .pop();

    return timezoneAbbr || "Local";
  };

  // Helper function to format time from 24-hour format to 12-hour format with timezone
  const formatTimeDisplay = (timeString) => {
    if (!timeString) return "";

    try {
      // Get the selected date (or today if no date selected)
      const selectedDate = date || new Date();

      // Parse the time string (e.g., "18:00:00")
      const [hours, minutes, seconds] = timeString.split(":").map(Number);

      // Create a date object representing the business time in PST/PDT
      // We'll create it in the business's timezone and then convert to user's local time
      const businessDate = new Date(selectedDate);
      businessDate.setHours(hours, minutes, seconds, 0);

      // Use Intl.DateTimeFormat to format the time in the user's local timezone
      // This automatically handles the conversion from business time to user time
      const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "America/Los_Angeles", // Business timezone (PST/PDT)
      });

      // Format the business time, which will be displayed in user's local timezone
      const formattedTime = formatter.format(businessDate);

      // Get user's local timezone abbreviation
      const timezone = getTimezoneAbbreviation();

      return `${formattedTime} ${timezone}`;
    } catch (error) {
      console.error("Error formatting time display:", error);
      // Fallback to original format if conversion fails
      return timeString;
    }
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

  // Main render
  if (!elementToBeRendered || !duration.current) {
    return null; // Wait for service and duration to be loaded
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
                minDate={new Date()} // Set minDate to today
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
              <div style={{ fontSize: "14px", color: "#666" }}>Pick an Appointment Time that's convenient for you</div>
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
                  {timeSlot.convertedTime || formatTimeDisplay(timeSlot)}
                </button>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem 0",
                marginTop: "2rem",
              }}
              hidden={!buttonSelect || !selectedTime}
            >
              <button
                onClick={continueToNextPage}
                className={classes.timeslotButton}
                style={{
                  backgroundColor: "#D3A625",
                  color: "white",
                  width: "200px",
                  height: "50px",
                  fontSize: "18px",
                  fontWeight: "600",
                  borderRadius: "30px",
                  border: "2px solid #D3A625",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 8px rgba(211, 166, 37, 0.3)",
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
