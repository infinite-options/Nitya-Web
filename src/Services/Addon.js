import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import ToggleButton from '@mui/material/ToggleButton';

export default function Addon(props) {
    const title = props.title;
    const addons = props.data;
  
    return(
      <div style={{"margin" : "20px"}}>
        Enhance your Treatment by adding an additional Therapy
        {addons.map((addon) => {
            if(addon.therapy !== title) {
                return <AddonChoice data={addon}/>;
            }
        })}  
      </div>
    );
  }
  
  function AddonChoice(props) {
    const addonContents = props.data;
    const [selected, setSelected] = useState(false);
  
    return(
      <div style={{"margin" : "10px"}}>
        <ToggleButton
              value="check"
              selected={selected}
              onChange={() => {
                setSelected(!selected);
                addonContents.selected = selected;
              }}
              style={{"marginRight" : "20px"}}
            >
              {addonContents.therapy} for {addonContents.cost} : {addonContents.duration}min
        </ToggleButton>
  
        <Link>What is {addonContents.therapy}?</Link>
      </div>
    );
  
  }