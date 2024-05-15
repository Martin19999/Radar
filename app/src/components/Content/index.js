/**
 * Content component
 * 
 * Acts like a huge container for everything except the banner on any page.
 * 
 */

import "../../styles/common.css";

const Content = ({ children }) => {
  return (
    <div className='content'>
      {children}
    </div>
  );
}

export default Content;