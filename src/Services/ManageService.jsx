import { Button } from "@material-ui/core";
import ManageServiceCard from './ManageServiceCard';
import './ManageService.css';
import { useContext } from "react";
import { MyContext } from "../App";
import ScrollToTop from "../Blog/ScrollToTop";

export default function ManageService() {
    const { serviceArr: data } = useContext(MyContext);
    
    return (
        <div className="ManageContainer">
            <ScrollToTop />
            <div className="RowContainer"> 
                <div className="ServiceRow" >
                    <Button fullWidth >Add</Button>
                </div> 
                
                {data != "" ? 
                data.map((service, i) => (
                    <ManageServiceCard service={service} key={i}/>
                )) : <>Loading</>}                
            </div>
        </div>
    );
}