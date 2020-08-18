import React, {useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from '../Firebase';


const Login = (props) => {

    const firebase = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btn, setBtn] = useState(false);
    const [error, setError] = useState('')

    useEffect(() => {
        if (password.length > 5 && email !== ''){
            setBtn(true)
        }else if (btn){
            setBtn(false)
        }
    }, [password, email, btn])

    const handleSubmit = e => {
        e.preventDefault();
        firebase.loginUser(email, password)
            .then(user => {
                console.log(user)
                setEmail('');
                setPassword('');
                props.history.push('/welcome')
            })
            .catch(error => {
                setError(error);
            })
    }
    const displayError = error !== '' && (<span>{error.message}</span>)
    const displayBtn = btn ? (<button>Connexion</button>) : (<button disabled>Connexion</button>);
    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftSignUp">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        {displayError}
                        <h2>Inscription</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="inputBox">
                                <input onChange={e =>setPassword(e.target.value)} value={password} type="password" autoComplete="off" required />
                                <label htmlFor="password">Mot de passe</label>
                            </div>
                            { displayBtn }
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/signUp">Nouveau sur Marvel Quiz ? Inscrivez-vous.</Link>
                            <br/>
                            <Link className="simpleLink" to="/forgetPassword">Mot de passe oublié ?</Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;