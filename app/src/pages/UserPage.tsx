/**
 * UserPage.tsx
 * 
 * Show a user's display information
 * 
 */

import Page from "../components/page";
import { useAuth } from "../context/authContext";
import React, { useState } from 'react';
import { useParams, useNavigate, useLocation, Link as RouterLink  } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Link, CloseButton, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Tooltip, useMediaQuery } from '@chakra-ui/react'

import "../styles/common.css";
import "../styles/userinfo.css";

const UserPage = () => {
	const { currentUser, userDetails } = useAuth();
  // make sure the user exists (logged in), is it alway true???/

  const { uid } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const tabNames = ['posts', 'following', 'followers'];
  const tabIndex = tabNames.indexOf(location.pathname.split("/").pop()!) || 0;
  const handleTabsChange = (index: number) => {
    navigate(`/${location.pathname.split("/").slice(1, 3).join('/')}/${tabNames[index]}`);
		console.log(currentUser?.uid, currentUser?.displayName, currentUser?.photoURL, currentUser?.metadata.creationTime);
  }; 

  const [pfpMagnified, setPfpMagnified] = useState(false);
  const [isWideEnough] = useMediaQuery("(min-width: 1040px)");


	if (currentUser) {
    return (
			<Page>
				<div className='userinfo-container'>
					<Link as={RouterLink} to='/'><CloseButton variant='userinfoCloseButton'/></Link>
					<div className='basic-userinfo-container'>
						<img src={userDetails.photoURL!} alt="profile picture" className="userinfo-profile-pic" onClick={()=>{setPfpMagnified(true)}}/>
						<Modal isOpen={pfpMagnified} onClose={()=> setPfpMagnified(false)} variant='displayPfp'>
							<ModalOverlay />
							<ModalContent>
								<ModalCloseButton />
								<ModalBody >
									<img id='magnified-pfp' src={userDetails.photoURL!} alt="profile pic"></img>
								</ModalBody>
							</ModalContent>
						</Modal>
						<div className='basic-nonpic-userinfo-container'>   
							<Tooltip label={userDetails.displayName} aria-label="Full displayName" isDisabled={isWideEnough}>
								<p>{userDetails.displayName}</p>
							</Tooltip>
							<p><strong>Member since: </strong> {userDetails.creationTime}</p>
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
									<>
										<p>display user posts in cards</p>
										<p>the same card in the blog content??</p>
									</>
								</TabPanel>
								<TabPanel>
									<>
										<p>display user pfps in grid, same as followers</p>
									</>
								</TabPanel>
								<TabPanel>
									<>
										<p>display user pfps in grid, same as following</p>
									</>
								</TabPanel>
							</TabPanels>
						</Tabs>
					</div>        
				</div>
			</Page>
      
    )
  }
}

export default UserPage;