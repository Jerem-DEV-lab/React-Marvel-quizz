import React from 'react';
import Header from "../Header";
import Landing from "../Landing";
import Footer from "../Footer";
import Welcome from "../Welcome";
import Login from "../Login";
import SignUp from "../SignUp";
import ErrorPage from "../ErrorPage";
import '../../App.css';


function Index() {
  return (
    <div>
      <Header />

        <Welcome/>
        <Landing />
        <Login />
        <SignUp />
        <ErrorPage />
      <Footer/>
    </div>
  );
}

export default Index;
