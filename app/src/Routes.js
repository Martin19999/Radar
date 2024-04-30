import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import React from "react";



const MyRoutes = () => {
  return (
  <Router>
    <Routes>       
      <Route path="/" element={<Home/>} />   
      <Route path="/login" element={<LogIn/>} />   
      <Route path="/signup" element={<SignUp/>} />   
    </Routes>
  </Router>
  );
}

export default MyRoutes;