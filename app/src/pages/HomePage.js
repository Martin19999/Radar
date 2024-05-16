/**
 * HomePage.js
 * 
 * Home page. 
 * 
 */

import Banner from "../components/Banner/index.js";
import Content from "../components/Content/index.js"
import Blog from "../components/Blog/index.js";
import Aside from "../components/Aside/index.js";
import { useAuth } from "../context/authContext.js";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import { Modal, ModalOverlay, ModalContent, ModalFooter, ModalBody, Link, IconButton, Button } from '@chakra-ui/react'
import { FaArrowRight } from "react-icons/fa";

import "../styles/common.css";
import "../styles/home.css";



const HomePage = () => {

  window.addEventListener("beforeunload", () => {
    // clear text in the box when refreshed
    localStorage.clear();
  });

  const location = useLocation();
  const fresh = location.state?.fresh;
  const {userDetails} = useAuth();
  const navigate = useNavigate();



  return (
    <>
      <Modal isOpen={fresh}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <h1>Welcome to our community, </h1>
            <h1>{userDetails.displayName}!</h1>
            <div className="welcome-content-container">
              <p>Before you start, you can set your own profile picture here</p>
              <Link as={RouterLink} to='/settings/profile'><IconButton icon={<FaArrowRight />} ></IconButton></Link>
            </div>
            
          </ModalBody>

          <ModalFooter>
            <Button onClick={()=>{navigate('/')}} colorScheme='blue' mr={3}>
              Skip for now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      <Banner />
      <Content>
        <Blog />
        <Aside />
      </Content>
    </>
  );
};

export default HomePage;
