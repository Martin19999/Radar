/**
 * Home.js
 * 
 * Home page. 
 * 
 */

import "../styles/home.css";
import "../styles/common.css";
import Banner from "../components/Banner/index.js";
import Content from "../components/Content/index.js"
import Blog from "../components/Blog/index.js";
import Aside from "../components/Aside/index.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/authContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";



const HomePage = () => {

  window.addEventListener("beforeunload", () => {
    // clear text in the box when refreshed
    localStorage.clear();
  });

  const location = useLocation();
  const fresh = location.state?.fresh;
  const {userDetails} = useAuth();
  const navigate = useNavigate();



  return (
    <>
      <div className={ fresh ? "fresh-user-popup": "do-not-display"}>
        <h2>Welcome to our community, {userDetails.displayName}!</h2>
        <div className="card-container">
          <p>Set your own profile picture </p>
          <a href="/settings/profile" ><FontAwesomeIcon icon={faArrowRight} /></a>
        </div>
        <button onClick={()=>navigate('/')}>Skip for now</button>
      </div>     
      <Banner />
      <Content>
        <Blog />
        <Aside />
      </Content>
    </>
  );
};

export default HomePage;
