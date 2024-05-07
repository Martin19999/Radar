import React from 'react'

const UserinfoContent = ({req}) => {
  
  if (req === "posts") {
    return (
      <div className='more-userinfo-content-container'>
        <p>Posts</p>
      </div>
    );
  } else if (req === "following") {
    return (
      <div className='more-userinfo-content-container'>
        <p>Following</p>
      </div>
    );
  } else {
    return (
      <div className='more-userinfo-content-container'>
        <p>Followers</p>
      </div>
    );
  }
  
}


export default UserinfoContent;