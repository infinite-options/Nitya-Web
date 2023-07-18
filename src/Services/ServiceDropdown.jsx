import { Link } from "react-router-dom";
import "../Home/Home.css";
import "./ServiceDropdown.css"

export default function ServiceDropdown(props) {
    const {serviceArr, serviceType} = props.data;

    return(
        <div className="serivce-dropdown-content">
            {serviceArr.length > 0 ? (
            serviceArr
                .filter((service) => (service.category === serviceType && service.availability === "Available"))
                .map((filteredService) => (
                    <div key={filteredService.treatment_uid}>
                        <Link
                            to={{
                                pathname: "/learnMore",
                                state: {
                                apptID: filteredService.treatment_uid,
                                },
                            }}
                        >
                            {filteredService.title}
                        </Link>
                    </div> 
                ))
            ) : (<>loading...</>)}
        </div>
    );
}