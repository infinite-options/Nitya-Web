import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Homepage from "./Components/Homepage";
import ServicePage from "./Components/ServicePage";
import AppointmentPage from "./Components/AppointmentPage";

// Nav here will take all the adress from children page to this and give
// it to the switch route

function Nav() {
  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/service" component={ServicePage} />
      <Route exact path="/appt" component={AppointmentPage} />
      <AppointmentPage treatment_uid="330-000006" />
    </Switch>
  );
}

export default Nav;
