import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import LogIn from "./pages/LoginPage";
import SignUp from "./pages/SignupPage";
import UserPage from "./pages/UserPage";
import SettingPage from "./pages/SettingPage";
import { RequireAuth } from "./utils/requireAuth";
import React from "react";

const MyRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userdetail/:uid/:requestedPage" element={<UserPage />} />
        <Route path="/settings/:settingType" element={<RequireAuth><SettingPage /></RequireAuth>} />
      </Routes>
    </Router>
  );
}

export default MyRoutes;