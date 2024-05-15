/**
 * WebDescription component
 * 
 * Shows promotional content about this app, when people are on the sign up page, convinces them to sign up.
 * 
 */

import React from 'react';

import "../../styles/common.css";
import "../../styles/authpages.css";

const WebDescription = () => {
  return (
    <div className='description-container'>
      <h1>Join Our Website</h1>
      <ol>
        <li>Reason 1</li>
        <li>Reason 2</li>
        <li>Reason 3</li>
        <li>Reason 4</li>
      </ol>
    </div>
  )
}

export default WebDescription;