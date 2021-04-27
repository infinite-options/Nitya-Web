import React, { Component, useContext } from "react";

import ServiceCard from "./Services/ServiceCard.jsx";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import MyContext from "../App";

export default function ServicePage() {
  const darkTheme = useContext(MyContext);

  return (
    <>
      <div className="page-container ">
        hello {darkTheme}
        <ServiceCard />
      </div>
    </>
  );
}

// class ServicePage extends Component {
//   render() {
//     return (
//       <>
//         <MyContext.Consumer>{string}</MyContext.Consumer>
//         <div className="page-container ">
//           <ServiceCard />
//         </div>
//       </>
//     );
//   }
// }
// export default ServicePage;
