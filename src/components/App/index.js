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


function Index() {
  return (
    <Router>
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
    </Router>
    )
}

export default Index;