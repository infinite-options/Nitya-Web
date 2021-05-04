import React from "react";
import Scheduler from "./Appointment/Scheduler";
import { useParams } from "react-router";
import ScrollToTop from "../Blog/ScrollToTop";


// The following react component is based on the youtube tutorial provided by Syncfusion, Inc. at the url below:

export default function AppointmentPage(props) {
  const { treatmentID } = useParams();
  // const {serviceArr, servicesLoaded} = useContext(MyContext);
  // const [info, setInfo] = useState("");


  // function conditionalPrint(){
  //   if(servicesLoaded){
  //     serviceArr.forEach((element) => {
  //       if (element.treatment_uid === treatmentID) {
  //         console.log("The following element does match with what we are looking for" + element.title);
  //         // setElementToBeRendered(element);
  //         //setInfo(element.title);
  //       }
  //     })
  //   }
  // }
  //   // console.log(servicesLoaded);

  return (
    <>
      <div className="page-container ">
        <ScrollToTop />
       
        <Scheduler treatmentID={treatmentID} />
      </div>
    </>
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
