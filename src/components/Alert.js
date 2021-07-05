import { finderContext } from "../App";
import { useContext } from "react";

const Alert = () => {

    const { alert } = useContext(finderContext);
    const { message, type } = alert;
    return (
        <div className="conatiner">
            <div className="alert-dark alert">
                {message}
            </div>
        </div>


    );
}

export default Alert;