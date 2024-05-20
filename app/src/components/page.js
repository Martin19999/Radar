/**
 * Content component
 * 
 * Acts like a huge container for everything except the banner on any page.
 * 
 */
import Banner from "./Banner";
// import "../styles/";

const Content = ({ children }) => {
  return (
    <div className='content'>
      <Banner />
      {children}
    </div>
  );
}

export default Content;