import React, { Component } from "react";

import ServiceCard from "./Services/ServiceCard.jsx";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

class ServicePage extends Component {
  render() {
    return (
      <>
        <div className="page-container ">
          <Navbar />
          <ServiceCard />
          <Footer />
        </div>
      </>
    );
  }
}

export default ServicePage;
