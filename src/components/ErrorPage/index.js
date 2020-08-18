import React from "react";
import batman from "../../images/batman.png"

const centerH2 = {
    textAlign: 'center',
    marginTop: '50px'
}
const resizeImg = {
    display: 'block',
    width: '50%',
    margin: '40px auto'
}
const ErrorPage = (props) => {
    return (
        <div className="quiz-bg">
            <div className="container">
                <h2 style={centerH2}>Oups, cette page n'existe pas</h2>
                <img style={resizeImg} src={batman} alt="batman"/>
            </div>
        </div>
    )
}

export default ErrorPage;