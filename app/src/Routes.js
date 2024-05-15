import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/HomePage";
import LogIn from "./pages/LoginPage";
import SignUp from "./pages/SignupPage";
import UserPage from "./pages/UserPage";
import SettingPage from "./pages/SettingPage";
import React from "react";

const MyRoutes = () => {
  return (
  <Router>
    <Routes>       
      <Route path="/" element={<Home/>} />   
      <Route path="/login" element={<LogIn/>} />   
      <Route path="/signup" element={<SignUp/>} />   
      <Route path="/userdetail/:uid/:requestedPage" element={<UserPage/>} /> 
      <Route path="/settings/:settingType" element={<SettingPage/>} />
    </Routes>
  </Router>
  );
}

export default MyRoutes;