import React, {Fragment, useState, useContext, useEffect} from "react";
import { FirebaseContext } from '../Firebase';
import Logout from "../Logout";
import Quiz from "../Quiz";

const Welcome = props => {

    const firebase = useContext(FirebaseContext);

    const [userSession, setUserSession] = useState(null);
    const [userData, setUserData] = useState({});

    useEffect(() => {

        let listener = firebase.auth.onAuthStateChanged(user => { user ? setUserSession(user) : props.history.push('/');
        })

        if (!!userSession) {
            firebase.user(userSession.uid)
                .get()
                .then( doc => {
                    if(doc && doc.exists) {
                        const myData = doc.data();
                        setUserData(myData)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }

        return () => {
            listener()
        };
    },[firebase, props.history, userSession]);
    
    return userSession === null ? (
        <Fragment>
            <div className="loader"></div>
            <p>Loading...</p>
        </Fragment>
    ) : (
        <div className="quiz-bg">
            <div className="container">
                <Logout />
                <Quiz userData={userData}/>
            </div>
        </div>
    )
}


export default Welcome