import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import ToggleButton from '@mui/material/ToggleButton';

export const JANU_BASTI_TITLE = "Janu Basti";
export const JANU_SECOND_KNEE_COST = "$135";
const JANU_BASTI_EXCLUDED_ADDONS = ["Pindaswedan - Specific Area"];

export default function Addon(props) {
    const title = props.title;
    const [, data] = props.addons;
    const [addons, setAddons] = props.state;
    const [, update] = useState();

    function updateAddons() {
      update([]);
    }

    const isJanuBasti = title === JANU_BASTI_TITLE;

    return(
      <div style={{"margin" : "20px"}}>
        Enhance your Treatment by adding an additional Therapy
        {addons.map((addon, i) => {
          const therapy_contents = getContents(addon.therapy, data);
          if (!therapy_contents) {
            return null;
          }

          if (isJanuBasti) {
            // Second knee: same therapy, custom cost, help text instead of What is link
            if (therapy_contents.title === JANU_BASTI_TITLE) {
              return (
                <AddonChoice
                  key={`${addon.therapy}-${i}`}
                  data={[addon, therapy_contents]}
                  state={[addons, setAddons, i]}
                  refresh={updateAddons}
                  cost={JANU_SECOND_KNEE_COST}
                  showWhatIs={false}
                  helpText="Add a Second Knee"
                />
              );
            }

            // Keep prior add-ons except Pindaswedan
            if (JANU_BASTI_EXCLUDED_ADDONS.includes(therapy_contents.title)) {
              return null;
            }

            return (
              <AddonChoice
                key={`${addon.therapy}-${i}`}
                data={[addon, therapy_contents]}
                state={[addons, setAddons, i]}
                refresh={updateAddons}
              />
            );
          }

          // Other therapies: show other available add-ons (exclude current therapy)
          if (title !== therapy_contents.title) {
              return (
                <AddonChoice
                  key={`${addon.therapy}-${i}`}
                  data={[addon, therapy_contents]}
                  state={[addons, setAddons, i]}
                  refresh={updateAddons}
                />
              );
          }
          return null;
        })}  
      </div>
    );
  }
  
  function AddonChoice(props) {
    const [addon, therapy_contents] = props.data;
    const [addons, setAddons, i] = props.state;
    const updateAddons = props.refresh;
    const label = props.label || therapy_contents.title;
    const cost = props.cost || therapy_contents.addon_cost;
    const showWhatIs = props.showWhatIs !== false;
    const helpText = props.helpText;

    function selectOne(i, selected) {
      for (let i = 0; i < addons.length; i++) {
        addons[i].selected = false;
        if(addons[i].therapy === addon.therapy) {
          addon.selected = selected;
        }
      }
      setAddons(addons);
    }

    return(
      <div style={{"margin" : "10px"}}>
        <ToggleButton
              value="check"
              selected={addons[i].selected}
              onChange={() => {
                selectOne(i, !addons[i].selected);
                updateAddons();
                console.log(addons);
              }}
              style={{"marginRight" : "20px"}}
            >
              {label} for {cost}
        </ToggleButton>
        {helpText && (
          <span>{helpText}</span>
        )}
        {showWhatIs && (
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
        )}
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

