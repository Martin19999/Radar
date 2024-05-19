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
        <p>display user posts in cards</p>
        <p>the same card in the blog content??</p>
      </>
    )
  } else if (req === "following") {
    return (
      <>
        <p>display user pfps in grid, same as followers</p>
      </>
    )
  } else {
    return (
      <>
        <p>display user pfps in grid, same as following</p>
      </>
    )
  }
  
};


export default UserinfoContent;