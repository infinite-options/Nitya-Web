import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Updated import statement
import ToggleButton from '@mui/material/ToggleButton';

export default function Addon(props) {
  const title = props.title;
  const [, data] = props.addons; // Assuming the second element of the array is data
  const [addons, setAddons] = props.state;
  const [, update] = useState(); // Used for refreshing state if needed

  function updateAddons() {
    update([]); // Resets the update state, could be used to force re-render if needed
  }

  return (
    <div style={{ margin: "20px" }}>
      Enhance your Treatment by adding an additional Therapy
      {addons.map((addon, i) => {
        const therapy_contents = getContents(addon.therapy, data);
        // Ensure the component returns valid JSX elements
        if (title !== therapy_contents?.title) {
          return (
            <AddonChoice
              key={i} // Add a unique key prop for list items
              data={[addon, therapy_contents]}
              state={[addons, setAddons, i]}
              refresh={updateAddons}
            />
          );
        }
        return null; // Return null if condition is not met
      })}
    </div>
  );
}

function AddonChoice(props) {
  const [addon, therapy_contents] = props.data;
  const [addons, setAddons, i] = props.state;
  const updateAddons = props.refresh;

  function selectOne(i, selected) {
    // Create a new array for state update
    const updatedAddons = addons.map((add, index) => {
      return {
        ...add,
        selected: index === i ? selected : false, // Update the selected state
      };
    });
    setAddons(updatedAddons); // Update state with new addons array
  }

  return (
    <div style={{ margin: "10px" }}>
      <ToggleButton
        value="check"
        selected={addons[i]?.selected} // Ensure safe access
        onChange={() => {
          selectOne(i, !addons[i].selected); // Toggle selection
          updateAddons(); // Refresh state if needed
          console.log(addons);
        }}
        style={{ marginRight: "20px" }}
      >
        {therapy_contents?.title} for {therapy_contents?.addon_cost}
      </ToggleButton>
      <Link
        to={{
          pathname: "/learnMore",
          state: {
            apptID: therapy_contents?.treatment_uid,
          },
        }}
      >
        What is {therapy_contents?.title}?
      </Link>
    </div>
  );
}

function getContents(therapy_uid, data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].treatment_uid === therapy_uid) {
      return data[i];
    }
  }
  return null; // Return null if no matching contents found
}


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom/cjs/react-router-dom";
// import ToggleButton from '@mui/material/ToggleButton';

// export default function Addon(props) {
//     const title = props.title;
//     const [, data] = props.addons;
//     const [addons, setAddons] = props.state;
//     const [, update] = useState();

//     function updateAddons() {
//       update([]);
//     }
  
//     return(
//       <div style={{"margin" : "20px"}}>
//         Enhance your Treatment by adding an additional Therapy
//         {addons.map((addon, i) => {
//           const therapy_contents = getContents(addon.therapy, data);
//           if(title !== therapy_contents.title) {
//               return <AddonChoice data={[addon, therapy_contents]} state={[addons, setAddons, i]} refresh={updateAddons}/>;
//           }
//         })}  
//       </div>
//     );
//   }
  
//   function AddonChoice(props) {
//     const [addon, therapy_contents] = props.data;
//     const [addons, setAddons, i] = props.state;
//     const updateAddons = props.refresh;

//     function selectOne(i, selected) {
//       for (let i = 0; i < addons.length; i++) {
//         addons[i].selected = false;
//         if(addons[i].therapy === addon.therapy) {
//           addon.selected = selected;
//         }
//       }
//       setAddons(addons);
//     }

//     return(
//       <div style={{"margin" : "10px"}}>
//         <ToggleButton
//               value="check"
//               selected={addons[i].selected}
//               onChange={() => {
//                 selectOne(i, !addons[i].selected);
//                 updateAddons();
//                 console.log(addons);
//               }}
//               style={{"marginRight" : "20px"}}
//             >
//               {therapy_contents.title} for {therapy_contents.addon_cost}
//         </ToggleButton>
//         <Link 
//             to={{
//                 pathname: "/learnMore",
//                 state: {
//                     apptID: therapy_contents.treatment_uid,
//                 },
//             }}
//         >
//             What is {therapy_contents.title}?
//         </Link>
//       </div>
//     );
  
//   }

//   function getContents(therapy_uid, data) {
//     for (let i = 0; i < data.length; i++) {
//       if(data[i].treatment_uid == therapy_uid) {
//         return data[i];
//       }
//     }
//     return null;
//   }