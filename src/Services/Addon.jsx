import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import ToggleButton from '@mui/material/ToggleButton';

export default function Addon(props) {
    const title = props.title;
    const [addons, data] = props.addons;
    const [, setAddons] = props.state;
    console.log(addons);
  
    return(
      <div style={{"margin" : "20px"}}>
        Enhance your Treatment by adding an additional Therapy
        {addons.map((addon, i) => {
          const therapy_contents = getContents(addon.therapy, data);
          if(title !== therapy_contents.title) {
              return <AddonChoice data={[addon, therapy_contents]} state={[addons, setAddons, i]}/>;
          }
        })}  
      </div>
    );
  }
  
  function AddonChoice(props) {
    const [addon, therapy_contents] = props.data;
    const [addons, setAddons, i] = props.state;
    const [selected, setSelected] = useState(false);
  
    return(
      <div style={{"margin" : "10px"}}>
        <ToggleButton
              value="check"
              selected={selected}
              onChange={() => {
                addons[i].selected = !selected;
                setAddons(addons);
                setSelected(!selected);
              }}
              style={{"marginRight" : "20px"}}
            >
              {therapy_contents.title} for {therapy_contents.addon_cost}
        </ToggleButton>
        <Link 
            to={{
                pathname: "/learnMore",
                state: {
                    apptID: therapy_contents.treatment_uid,
                },
            }}
        >
            What is {therapy_contents.title}?
        </Link>
      </div>
    );
  
  }

  function getContents(therapy_uid, data) {
    for (let i = 0; i < data.length; i++) {
      if(data[i].treatment_uid == therapy_uid) {
        return data[i];
      }
    }
    return null;
  }