import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../Header";
import Landing from "../Landing";
import Footer from "../Footer";
import Welcome from "../Welcome";
import Login from "../Login";
import SignUp from "../SignUp";
import ErrorPage from "../ErrorPage";
import ForgetPassword from "../ForgetPassword";
import '../../App.css';
import { IconContext } from "react-icons";


function Index() {
  return (
    <Router>
        <IconContext.Provider value={{style: { verticalAlign: 'middle'}}}>
            <Header />
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/welcome" component={Welcome}/>
                <Route path="/login" component={Login} />
                <Route path="/SignUp" component={SignUp} />
                <Route path="/forgetpassword" component={ForgetPassword}/>
                <Route component={ErrorPage} />
            </ Switch>
            <Footer />
        </IconContext.Provider>
    </Router>
    )
}

export default Index;