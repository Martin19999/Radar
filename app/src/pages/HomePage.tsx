/**
 * HomePage.tsx
 * 
 * Home page. 
 * 
 */

import Aside from "../components/aside";
import Page from "../components/page";
import PostsPreview from "../components/postsPreView";
import { useAuth } from "../context/authContext";
import React from "react";
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
      <Modal isOpen={fresh} onClose={() => {}} >
        <ModalOverlay />
        <ModalContent data-testid="welcom-guide">
          <ModalBody>
            <h1>Welcome to our community, </h1>
            <h1>{userDetails.displayName}!</h1>
            <div className="welcome-content-container">
              <p>Before you start, you can set your own profile picture here</p>
              <Link as={RouterLink} to='/settings/profile'><IconButton icon={<FaArrowRight />} aria-label={"set profile picture"} ></IconButton></Link>
            </div>
            
          </ModalBody>

          <ModalFooter>
            <Button onClick={()=>{navigate('/')}} colorScheme='blue' mr={3}>
              Skip for now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      <Page>
        <section className="blog-home">
          
          {/* <p>Explore button (only when logged in)</p> 
          <p>For you button (only when logged in)</p> 
          <p>----------------------</p> 
          <p>display user posts in cards</p> */}

          <PostsPreview searchCondition="all" searchQuery=""/>
        </section>
        <Aside />
      </Page>
      
    </>
  );
};

export default HomePage;
