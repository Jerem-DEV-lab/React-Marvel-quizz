import React, {useEffect, useState, useContext} from "react";
import { FirebaseContext } from '../Firebase';

const Logout = () => {
    const firebase = useContext(FirebaseContext);
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        return () => {
            if (setChecked){
                firebase.logOutUser();
            }
        };
    }, [checked, firebase]);

    const handleChange = event=> {
        setChecked(event.target.checked);
    }
    return(
        <div className="logoutContainer">
            <label className="switch">
                <input
                    onChange={handleChange}
                    type="checkbox"
                    checked={checked}
                />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default Logout;