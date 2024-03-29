import React, {useState, useContext} from "react";
import { FirebaseContext } from "../Firebase";
import {Link} from "react-router-dom";

const styleSuccess = {
    border: "1px solid green",
    background: "green",
    color: "#FFFFFF"
};

const styleError = {
    border: "1px solid green",
    background: "red",
    color: "#FFFFFF"
}

const ForgetPassword = props => {

    const firebase = useContext(FirebaseContext);
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const handleSubmit = e =>{
        e.preventDefault();
        firebase.passwordReset(email)
            .then(success => {
                setError(null);
                setSuccess(`Consultez votre email ${email} pour réinitialisé votre mot de passe`);
                setEmail("");
                setTimeout(() => (
                    props.history.push('/login')
                ), 5000)
            })
            .catch(error => {
                setError(error);
                setEmail("");
            })
    }

    const successInfo = success && <span style={styleSuccess}>{success}</span>;
    const errorInfo = error && <span style={styleError}>{error.message}</span>;
    const disabled = email === "";

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftForget">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        {successInfo}
                        {errorInfo}

                        <h2>Mot de passe oublié ?</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <button disabled={disabled}>Récupérer</button>
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login">Déjà inscrit ? Connectez-vous</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword;