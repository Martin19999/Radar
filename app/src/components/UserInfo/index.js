/**
 * UserInfo component
 * 
 * Displays basic user information: profile picture, display name, date joined, {posts, following, followers}.
 * 
 * "Posts, following, followers" are managed in the form of tabs. This component only manages the state of the tab,
 * for the content in the tab, see component "UserinfoContent" in the same directory.
 * 
 */

import { useAuth } from "../../context/authContext";
import UserinfoContent from "./UserinfoContent";
import React, { useState } from 'react';
import { useParams, useNavigate, useLocation, Link as RouterLink  } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Link, CloseButton, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody } from '@chakra-ui/react'

import "../../styles/common.css";
import "../../styles/userinfo.css";

const UserInfo = () => {
  const { currentUser, userDetails } = useAuth();
  // make sure the user exists (logged in), is it alway true???/

  const { uid } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const tabNames = ['posts', 'following', 'followers'];
  const tabIndex = tabNames.indexOf(location.pathname.split("/").pop()) || 0;
  const handleTabsChange = index => {
    navigate(`/${location.pathname.split("/").slice(1, 3).join('/')}/${tabNames[index]}`);
  };

  const [pfpMagnified, setPfpMagnified] = useState(false);

  if (currentUser) {
    return (
      <div className='userinfo-container'>
        <Link as={RouterLink} to='/'><CloseButton variant='userinfoPageCloseButton' /></Link>
        <div className='basic-userinfo-container'>
          <img src={userDetails.photoURL} alt="pfp" className="userinfo-profile-pic" onClick={()=>{setPfpMagnified(true)}}/>
          <Modal isOpen={pfpMagnified} onClose={()=> setPfpMagnified(false)} variant='displayPfp'>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody >
                <img id='magnified-pfp' src={userDetails.photoURL} alt="profile pic"></img>
              </ModalBody>
            </ModalContent>
          </Modal>
          <div className='basic-nonpic-userinfo-container'>
            <p>{userDetails.displayName}</p>
            <p>Date joined: {userDetails.creationTime}</p>
            <button className={ uid===currentUser.uid ? 'do-not-display' : '' }>Follow</button>
          </div>
        </div>
        <div className='more-userinfo-container'>
          <Tabs index={tabIndex} onChange={handleTabsChange} >
            <TabList>
              <Tab>Posts</Tab>
              <Tab>Following</Tab>
              <Tab>Follwers</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <UserinfoContent req="posts" />  
              </TabPanel>
              <TabPanel>
                <UserinfoContent req="following" />  
              </TabPanel>
              <TabPanel>
                <UserinfoContent req="followers" />  
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>        
      </div>
    )
  }
}

export default UserInfo;