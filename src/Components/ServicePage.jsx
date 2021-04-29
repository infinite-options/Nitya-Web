import React, { useContext } from "react";

import ServiceCard from "./Services/ServiceCard.jsx";

import MyContext from "../App";

const temp = "zooweemama";

export const otherContext = React.createContext();

export default function ServicePage() {
  return (
    <>
      <otherContext.Provider value={temp}>
        <div className="page-container ">
          hello
          <ServiceCard />
        </div>
      </otherContext.Provider>
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
