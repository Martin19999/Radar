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


const Home = () => {

  window.addEventListener("beforeunload", () => {
    // clear text in the box when refreshed
    localStorage.clear();
  });

  return (
    <>     
      <Banner />
      <Content>
        <Blog />
        <Aside />
      </Content>
    </>
  );
};

export default Home;
