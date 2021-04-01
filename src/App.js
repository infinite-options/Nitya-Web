import React from "react";
import "./App.css";
import Service from './Home/Components/ServiceCard';
import { BrowserRouter as Router } from "react-router-dom";
import Homepage from "./Home/Homepage";
import { Navbar } from "reactstrap";
import {Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda} from "@syncfusion/ej2-react-schedule";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function App() {
  return (
    <div className="App">
      {/* <Homepage />
      <Service/> */}


      {/* private localData: EventSettingsModel = {
        dataSource: [{
          EndTime: new Date(2019, 0,11, 6, 30),
          StartTime: new Date(2019, 0, 11. 4. 0),
        }]
        
      }; */}
      <ScheduleComponent currentView ="Month">
        <Inject services = {[Day, Week, WorkWeek, Month, Agenda]}/>
      </ScheduleComponent>

      {/* <Calendar/> */}
    </div>
  );
}

export default App;
