/**
 * UserInfo component
 * 
 * Displays part of user information in the tabs including: 
 *      Posts, following, followers
 * 
 */

import React from 'react';

import "../../styles/common.css";
import "../../styles/userinfo.css";

const UserinfoContent = ({req}) => {
  if (req === "posts") {
    return (
      <>
        <p>Posts</p>
      </>
    )
  } else if (req === "following") {
    return (
      <>
        <p>Following</p>
      </>
    );
  } else {
    return (
      <>
        <p>Followers</p>
      </>
    );
  }
  
}


export default UserinfoContent;