import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import LogIn from "./pages/LoginPage";
import SignUp from "./pages/SignupPage";
import UserPage from "./pages/UserPage";
import SettingPage from "./pages/SettingPage";
import SearchResultPage from "./pages/SearchResultPage";
import PostingPage from "./pages/PostingPage";
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
        <Route path="/result/:resultType" element={<SearchResultPage />} />
        <Route path="/submit" element={<PostingPage />} />
      </Routes>
    </Router>
  );
}

export default MyRoutes;