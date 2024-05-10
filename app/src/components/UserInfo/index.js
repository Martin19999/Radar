import React, { useState } from 'react';
import { useAuth } from "../../context/authContext";
import UserinfoContent from "./UserinfoContent";
import { useParams } from 'react-router-dom';

import "../../styles/common.css";
import "../../styles/userinfo.css";


const UserInfo = () => {
  const { currentUser, userDetails } = useAuth();
  // make sure the user exists (logged in), is it alway true???/

  const [requestPage, setRequestPage] = useState("posts");

  const { uid } = useParams();

  if (currentUser) {
    return (
      <div className='userinfo-container'>
        <div className='basic-userinfo-container'>
          <img src={userDetails.photoURL} alt="pfp" className="profile-pic" />
          <div className='basic-nonpic-userinfo-container'>
            <p>{userDetails.displayName}</p>
            <p>Date joined: {userDetails.creationTime}</p>
            <button className={ uid===currentUser.uid ? 'do-not-display' : '' }>Follow</button>
          </div>
        </div>
        <div className='more-userinfo-container'>
          <div className='more-userinfo-banner-container'>
            <button onClick={(e)=> setRequestPage("posts")}
                    className={requestPage==='posts' ? 'selected-button' : ''}>Posts: [int]</button>
            <button onClick={(e)=> setRequestPage("following")}
                    className={requestPage==='following' ? 'selected-button' : ''}>Following: [int]</button>
            <button onClick={(e)=> setRequestPage("followers")}
                    className={requestPage==='followers' ? 'selected-button' : ''}>Follwers: [int]</button>
          </div>
          
          <UserinfoContent req={ requestPage } />
            
          
          
        </div>
        
        
        
      </div>
    )
  }
  
  
}

export default UserInfo;