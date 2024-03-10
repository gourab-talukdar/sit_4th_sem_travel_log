import React from "react";
import Home from "./pages/Home";
import UserLogin from "./pages/admin_panel/UserLogin";
import { Route, Routes } from 'react-router-dom';
import PageNotFound from "./pages/PageNotFound";
import UserSignUp from "./pages/admin_panel/UserSignUp";
import OtpVerify from "./pages/admin_panel/OtpVerify";
import UserPanelIndex from "./pages/admin_panel/UserPanelIndex";
import './App.css';
import Discover from "./pages/Discover";

function App() {
  const hostName = 'http://localhost/travel_api';
  // const hostName = 'https://www.soumitasteel.in/travel_api';

  const setTitle = (title="Travel Log") => document.title = title;

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home setTitle={setTitle} />} />
        <Route path='/discover' element={<Discover hostName={hostName} setTitle={setTitle} />} />
        <Route path='/user_panel/login' element={<UserLogin hostName={hostName} setTitle={setTitle} />} />
        <Route path='/user_panel/sign-up' element={<UserSignUp hostName={hostName} setTitle={setTitle} />} />
        <Route path='/user_panel/otp-validate/:email' element={<OtpVerify hostName={hostName} setTitle={setTitle} />} />
        <Route path='/user_panel/verify/*' element={<UserPanelIndex hostName={hostName} setTitle={setTitle} />} />
        <Route path='/*' element={<PageNotFound  setTitle={setTitle} />} />
      </Routes> 
    </div>
  );
};

export default App;