/**
 * Content component
 * 
 * Acts like a huge container for everything except the banner on any page.
 * 
 */
import Banner from "./Banner/index";
import React from "react";
import "../styles/common.css";

interface ContentProps {
  children?: React.ReactNode; 
}

const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <div className='content'>
      <Banner />
      {children}
    </div>
  );
}

export default Content;