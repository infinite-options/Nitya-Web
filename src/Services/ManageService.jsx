import { Button } from "@material-ui/core";
import ManageServiceCard from './ManageServiceCard';
import './ManageService.css';
import { useContext } from "react";
import { MyContext } from "../App";
import ScrollToTop from "../Blog/ScrollToTop";
import axios from "axios";

export default function ManageService() {
    const { serviceArr: data, setServiceArr } = useContext(MyContext);
    function addService() {
        axios.post("https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/addTreatment",
            {
                title: "Service Title",
                category: "Consultation",
                description: "Description", 
                cost: "$0",
                addon_cost: "$0",
                display_order: "0",
                duration: "00:00:00",
                image_url: "",
                treatment_notes: "Treatment Note",
                availability: "Available",
                addon_allowed: "FALSE",
            }
        ).then((response) => {
            console.log(response);
            window.location.reload();
        });
    }
    
    return (
        <div className="ManageContainer">
            <ScrollToTop />
            <div className="RowContainer"> 
                <div className="ServiceRow" >
                    <Button fullWidth onClick={()=>addService()}>Add</Button>
                </div> 
                
                {data !== "" ? 
                data.map((service, i) => (
                    <ManageServiceCard service={[service, setServiceArr]} key={i}/>
                )) : <>Loading</>}                
            </div>
        </div>
    );
}