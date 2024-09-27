/**
 * Content component
 * 
 * Acts like a huge container for everything except the banner on any page.
 * 
 */
import Banner from "./Banner/index";
import React, { useEffect } from "react";
import "../styles/common.css";

interface ContentProps {
  children?: React.ReactNode; 
}

const Page: React.FC<ContentProps> = ({ children }) => {
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);
    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, []);
  
  return (
    <div className='content'>
      <Banner />
      {children}
    </div>
  );
}

export default Page;