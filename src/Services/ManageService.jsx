import { Button } from "@material-ui/core";
import ManageServiceCard from './ManageServiceCard';
import './ManageService.css';
import { useContext, useState } from "react";
import { MyContext } from "../App";
import ScrollToTop from "../Blog/ScrollToTop";
import axios from "axios";

export default function ManageService() {
    const { serviceArr: data } = useContext(MyContext);
    const [, update] = useState();

    function addService() {
        axios.post("https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/addTreatment",
            {
                title: "Service Title",
                category: "Consultation",
                description: "Desciption", 
                cost: "$0",
                display_order: "0",
                duration: "00:00:59",
                image_url: "",
                treatment_notes: "Treatment Note",
                availability: "Available",
            }
        ).then((response) => {
            console.log(response);
        });
        update([]);
    }
    
    return (
        <div className="ManageContainer">
            <ScrollToTop />
            <div className="RowContainer"> 
                <div className="ServiceRow" >
                    <Button fullWidth onClick={()=>addService()}>Add</Button>
                </div> 
                
                {data != "" ? 
                data.map((service, i) => (
                    <ManageServiceCard service={service} key={i}/>
                )) : <>Loading</>}                
            </div>
        </div>
    );
}